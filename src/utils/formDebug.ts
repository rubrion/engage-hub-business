/**
 * Form submission debugging utilities
 *
 * This file provides utilities for tracking form submission delivery status
 * and logs details about form submissions. These logs only appear in debug mode.
 */

import { debugLog, isDebugEnabled } from './debugControl';

// Store form submission history for debugging
const formSubmissionHistory: FormSubmissionRecord[] = [];

export interface FormSubmissionRecord {
  id: string;
  timestamp: Date;
  formType: string;
  submitter: {
    name?: string;
    email?: string;
  };
  endpoint: string;
  subject?: string;
  success: boolean;
  message: string;
  fileAttached?: boolean;
  fileName?: string;
  fileSize?: number;
  responseData?: unknown;
}

/**
 * Generate a unique ID for tracking form submissions
 */
const generateSubmissionId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

/**
 * Record a form submission for debugging and tracking
 */
export const recordFormSubmission = (
  formType: string = 'unknown',
  data: Record<string, unknown>,
  endpoint: string,
  success: boolean,
  message: string,
  fileInfo?: { name: string; size: number },
  responseData?: unknown
): string => {
  const submissionId = generateSubmissionId();
  const record: FormSubmissionRecord = {
    id: submissionId,
    timestamp: new Date(),
    formType,
    submitter: {
      name: (data.name as string) || (data.fullName as string) || 'Unknown',
      email: (data.email as string) || 'no-email',
    },
    endpoint,
    subject:
      (data._subject as string) ||
      (data.finalSubject as string) ||
      (data.subject as string) ||
      'No Subject',
    success,
    message,
    fileAttached: !!fileInfo,
    fileName: fileInfo?.name,
    fileSize: fileInfo?.size,
    responseData,
  };

  formSubmissionHistory.push(record);

  // Log the submission
  if (isDebugEnabled()) {
    const submissionType = formType.toUpperCase();
    const status = success ? 'SUCCESS' : 'FAILED';
    const userName = record.submitter.name;
    const userEmail = record.submitter.email;

    debugLog(
      `[Form] Submission #${submissionId.slice(0, 7)} | ${submissionType} | ${status} | ${userName} <${userEmail}>`
    );

    if (fileInfo) {
      debugLog(
        `[Form] Attachment: ${fileInfo.name} (${(fileInfo.size / 1024).toFixed(2)} KB)`
      );
    }

    debugLog(`[Form] Destination: ${endpoint}`);
    debugLog(`[Form] Response: ${message}`);

    if (responseData) {
      debugLog('[Form] Response data:', responseData);
    }
  }

  return submissionId;
};

/**
 * Get all recorded form submissions for debugging
 */
export const getFormSubmissionHistory = (): FormSubmissionRecord[] => {
  return [...formSubmissionHistory];
};

/**
 * Clear the form submission history
 */
export const clearFormSubmissionHistory = (): void => {
  formSubmissionHistory.length = 0;
  debugLog('[Form] Submission history cleared');
};

/**
 * Print a summary of form submissions to the console
 */
export const printFormSubmissionSummary = (): void => {
  if (!isDebugEnabled()) return;

  if (formSubmissionHistory.length === 0) {
    debugLog('[Form] No form submissions recorded');
    return;
  }

  const successCount = formSubmissionHistory.filter((r) => r.success).length;
  const failCount = formSubmissionHistory.length - successCount;

  debugLog('===== FORM SUBMISSION SUMMARY =====');
  debugLog(`Total submissions: ${formSubmissionHistory.length}`);
  debugLog(`Successful: ${successCount}`);
  debugLog(`Failed: ${failCount}`);

  // Group by form type
  const byFormType = formSubmissionHistory.reduce(
    (acc, record) => {
      acc[record.formType] = acc[record.formType] || {
        total: 0,
        success: 0,
        failed: 0,
      };
      acc[record.formType].total += 1;
      acc[record.formType].success += record.success ? 1 : 0;
      acc[record.formType].failed += record.success ? 0 : 1;
      return acc;
    },
    {} as Record<string, { total: number; success: number; failed: number }>
  );

  debugLog('By Form Type:');
  Object.entries(byFormType).forEach(([type, stats]) => {
    debugLog(
      `  ${type}: ${stats.total} total, ${stats.success} success, ${stats.failed} failed`
    );
  });

  debugLog('===================================');
};

/**
 * Register this utility to the window object for easy access in browser console
 */
if (typeof window !== 'undefined') {
  // @ts-expect-error - Attaching to window for debug purposes
  window.FormDebug = {
    getHistory: getFormSubmissionHistory,
    clearHistory: clearFormSubmissionHistory,
    printSummary: printFormSubmissionSummary,
  };

  if (isDebugEnabled()) {
    debugLog(
      '[Form] Form debugging utilities available in console as window.FormDebug'
    );
  }
}
