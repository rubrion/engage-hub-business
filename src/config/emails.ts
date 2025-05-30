/**
 * Email configuration centralized exports
 * All email addresses used in the application should be sourced from here
 */

export const CONTACT_EMAIL = import.meta.env.VITE_FORM_CONTACT_EMAIL;
export const TEAM_EMAIL = import.meta.env.VITE_FORM_TEAMJOIN_EMAIL;
export const DEFAULT_EMAIL = import.meta.env.VITE_FORM_DEFAULT_EMAIL;

/**
 * Get appropriate email for form submissions
 * @param formType The type of form (contact, teamJoin)
 * @returns The appropriate email based on form type
 */
export const getFormEmail = (formType: 'contact' | 'teamJoin'): string => {
  switch (formType) {
    case 'contact':
      return CONTACT_EMAIL || DEFAULT_EMAIL;
    case 'teamJoin':
      return TEAM_EMAIL || DEFAULT_EMAIL;
    default:
      return DEFAULT_EMAIL;
  }
};
