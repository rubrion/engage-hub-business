/// <reference types="vite/client" />

import i18n from 'i18next';

// Extend the Window interface to include i18next
declare global {
  interface Window {
    i18next: typeof i18n;
    __IS_MSW_ACTIVE__?: boolean;
    env?: Record<string, string>;
  }
}

interface ImportMetaEnv {
  readonly VITE_FORM_CONTACT_EMAIL: string;
  readonly VITE_FORM_TEAMJOIN_EMAIL: string;
  readonly VITE_FORM_DEFAULT_EMAIL: string;
  readonly VITE_API_URL: string;
  readonly VITE_USE_MOCK_DATA: string;
  readonly VITE_USE_FIRESTORE: string;
  readonly VITE_MULTI_TENANT: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_NEWSLETTER: string;
  readonly VITE_MAINTENANCE_MODE: string;
  readonly VITE_FORCE_DEBUG: string;
  readonly VITE_FEATURE_SHOW_LANDING: string;
  readonly VITE_LANDING_CAMPAIGN_SLUG: string;
  readonly VITE_LANDING_START_DATE: string;
  readonly VITE_LANDING_END_DATE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
