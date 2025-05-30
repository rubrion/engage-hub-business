/**
 * Utility for submitting forms using formsubmit.co API
 */
import { getEnvVariable } from '../config';
import { DEFAULT_EMAIL, getFormEmail } from '../config/emails';
import { debugLog, isDebugEnabled } from './debugControl';
import { recordFormSubmission } from './formDebug';

interface FormSubmitOptions {
  file?: File | null;
  fileFieldName?: string;
  formType?: string;
}

/**
 * Gets the appropriate endpoint email for a form type
 * Falls back to default email if not configured in environment
 *
 * @param formType The type of form ('contact', 'teamJoin', etc.)
 * @returns Email address to use for form submission
 */
export const getFormEndpointEmail = (formType: string): string => {
  if (formType === 'contact' || formType === 'teamJoin') {
    return getFormEmail(formType);
  }

  const envKey = `VITE_FORM_${formType.toUpperCase()}_EMAIL`;
  const defaultEmail = DEFAULT_EMAIL;
  const targetEmail = getEnvVariable(envKey, defaultEmail);

  if (isDebugEnabled()) {
    debugLog(`[Form] Endpoint for ${formType}: ${targetEmail}`);
  }

  return targetEmail;
};

/**
 * Generates a subject tag for form emails based on form type
 *
 * @param formType The type of form ('contact', 'teamJoin', etc.)
 * @returns Formatted subject tag to prepend to email subject
 */
const getSubjectTag = (formType?: string): string => {
  if (!formType) return '[EngageHub]';

  switch (formType.toLowerCase()) {
    case 'contact':
      return '[Engage Hub Contact]';
    case 'teamjoin':
      return '[Engage Hub Team Join]';
    default:
      return `[Engage Hub ${formType}]`;
  }
};

/**
 * Creates a standard HTML form that exactly follows FormSubmit.co requirements
 */
const createStandardFormSubmission = (
  endpointEmail: string,
  data: Record<string, unknown>,
  options: {
    file?: File | null;
    fileFieldName?: string;
    formType?: string;
  }
): Promise<{ ok: boolean; message: string }> => {
  return new Promise((resolve, reject) => {
    try {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = `https://formsubmit.co/${endpointEmail}`;
      form.enctype = 'multipart/form-data';
      form.style.display = 'none';

      const iframeName = `form-iframe-${Date.now()}`;
      const iframe = document.createElement('iframe');
      iframe.name = iframeName;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      form.target = iframeName;

      const captchaField = document.createElement('input');
      captchaField.type = 'hidden';
      captchaField.name = '_captcha';
      captchaField.value = 'false';
      form.appendChild(captchaField);

      const nextField = document.createElement('input');
      nextField.type = 'hidden';
      nextField.name = '_next';
      nextField.value = window.location.href;
      form.appendChild(nextField);

      const honeyField = document.createElement('input');
      honeyField.type = 'hidden';
      honeyField.name = '_honey';
      honeyField.value = '';
      form.appendChild(honeyField);

      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = String(value);
          form.appendChild(input);
        }
      });

      iframe.onload = () => {
        if (isDebugEnabled()) {
          debugLog('[Form] Form submission completed');
        }

        setTimeout(() => {
          if (document.body.contains(form)) document.body.removeChild(form);
          if (document.body.contains(iframe)) document.body.removeChild(iframe);
        }, 1000);

        recordFormSubmission(
          options.formType || 'unknown',
          data,
          endpointEmail,
          true,
          'Form submitted successfully',
          options.file
            ? { name: options.file.name, size: options.file.size }
            : undefined
        );

        resolve({ ok: true, message: 'Form submitted successfully' });
      };

      iframe.onerror = () => {
        if (isDebugEnabled()) {
          debugLog('[Form] Error submitting form (iframe error)');
        }

        if (document.body.contains(form)) document.body.removeChild(form);
        if (document.body.contains(iframe)) document.body.removeChild(iframe);

        recordFormSubmission(
          options.formType || 'unknown',
          data,
          endpointEmail,
          false,
          'Form submission failed (iframe error)',
          options.file
            ? { name: options.file.name, size: options.file.size }
            : undefined
        );

        reject(new Error('Form submission failed (iframe error)'));
      };

      if (options.file) {
        // TODO(samuel): Implement file upload handling logic, current api doesn't work because of CORS
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Sends form data to formsubmit.co service
 * @param data - Form data as key-value pairs
 * @param endpointEmail - Target email for the form submission
 * @param options - Additional options (file upload, etc.)
 * @returns Promise with response status and message
 */
export const sendForm = async (
  data: Record<string, unknown>,
  endpointEmail: string,
  options: FormSubmitOptions = {}
): Promise<{ ok: boolean; message: string }> => {
  try {
    if (isDebugEnabled()) {
      debugLog(
        `[Form] Preparing to submit ${options.formType || 'unknown'} form`
      );
      if (options.file) {
        debugLog(
          `[Form] Including file: ${options.file.name} (${(options.file.size / 1024).toFixed(2)} KB)`
        );
      }
    }

    const subjectTag = getSubjectTag(options.formType);
    const subject = `${subjectTag} ${data._subject || data.finalSubject || data.subject || ''}`;

    const formData = {
      ...data,
      _subject: subject,
    };

    if (options.file) {
      if (isDebugEnabled()) {
        debugLog(`[Form] Using standard HTML form for file upload`);
      }

      return createStandardFormSubmission(endpointEmail, formData, {
        file: options.file,
        fileFieldName: options.fileFieldName,
        formType: options.formType,
      });
    } else {
      if (isDebugEnabled()) {
        debugLog(`[Form] Sending JSON form data to ${endpointEmail}...`);
      }

      const jsonData = {
        ...formData,
        _captcha: 'false',
        _honey: '',
      };

      const response = await fetch(
        `https://formsubmit.co/ajax/${endpointEmail}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(jsonData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        if (isDebugEnabled()) {
          debugLog(`[Form] HTTP error: ${response.status} - ${errorText}`);
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      const responseData = {
        ok: result.success || false,
        message: result.message || 'Form submitted successfully',
      };

      recordFormSubmission(
        options.formType || 'unknown',
        data,
        endpointEmail,
        responseData.ok,
        responseData.message,
        undefined,
        result
      );

      return responseData;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (isDebugEnabled()) {
      debugLog(`[Form] Error submitting form: ${errorMessage}`);
    }

    recordFormSubmission(
      options.formType || 'unknown',
      data,
      endpointEmail,
      false,
      errorMessage,
      options.file
        ? { name: options.file.name, size: options.file.size }
        : undefined
    );

    console.error('Error submitting form:', error);
    throw error;
  }
};
