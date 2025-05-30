import { debugLog, isDebugEnabled } from '../utils/debugControl';
import { recordFormSubmission } from '../utils/formDebug';
import axiosInstance from './axiosInstance';

interface TeamJoinFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  githubLink: string;
  linkedinLink: string;
  message: string;
  [key: string]: unknown; // Add index signature to make it assignable to Record<string, unknown>
}

export const submitTeamJoinApplication = async (
  formData: TeamJoinFormData,
  file: File | null
) => {
  try {
    if (isDebugEnabled()) {
      debugLog(
        `[Form] Team Join application from ${formData.name} <${formData.email}>`
      );
      debugLog(`[Form] Position: ${formData.position}`);

      if (file) {
        debugLog(
          `[Form] CV attached: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`
        );
      } else {
        debugLog(`[Form] No CV attached`);
      }
    }

    const formPayload = new FormData();
    if (file) {
      formPayload.append('cv', file);
    }

    Object.entries(formData).forEach(([key, value]) => {
      formPayload.append(key, String(value));
    });

    if (isDebugEnabled()) {
      debugLog(`[Form] Sending Team Join application to API...`);
    }

    const response = await axiosInstance.post('/team/join', formPayload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (isDebugEnabled()) {
      debugLog(
        `[Form] Team Join submission successful - Status: ${response.status}`
      );
    }

    // Record the successful submission
    recordFormSubmission(
      'teamJoin',
      formData,
      '/team/join',
      true,
      'Application submitted successfully',
      file ? { name: file.name, size: file.size } : undefined,
      response.data
    );

    return response.data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (isDebugEnabled()) {
      debugLog(
        `[Form] Error submitting Team Join application: ${errorMessage}`
      );
    }

    // Record the failed submission
    recordFormSubmission(
      'teamJoin',
      formData,
      '/team/join',
      false,
      errorMessage,
      file ? { name: file.name, size: file.size } : undefined
    );

    console.error('Error submitting team join application:', error);
    throw error;
  }
};
