import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { debugLog } from '../../utils/debugControl';

/**
 * Component to ensure language changes are properly propagated
 * to all components that need it
 */
const LanguageUpdater = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleLanguageChange = () => {
      debugLog('Language changed event detected, refreshing content');

      Object.keys(i18n.options.resources || {}).forEach((lng) => {
        Object.keys(i18n.options.resources?.[lng] || {}).forEach((ns) => {
          i18n.reloadResources([lng], [ns]);
        });
      });

      const event = new CustomEvent('i18n-language-changed', {
        detail: { language: i18n.language },
      });
      document.dispatchEvent(event);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return null;
};

export default LanguageUpdater;
