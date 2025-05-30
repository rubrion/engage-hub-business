import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { resolveTranslationKey } from '../../utils/translationUtils';

interface PageHelmetProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  translationKey?: string;
  translationNamespace?: string;
  routeMetadata?: {
    labelKey?: string | { namespace: string; key: string };
    descriptionKey?: string | { namespace: string; key: string };
  };
}

const PageHelmet: React.FC<PageHelmetProps> = ({
  title,
  description,
  children,
  translationKey,
  translationNamespace = 'common',
  routeMetadata,
}) => {
  const { t, i18n } = useTranslation(translationNamespace);

  useEffect(() => {
    const resolveTranslation = (
      value: string | undefined,
      keyInfo: string | { namespace: string; key: string } | undefined,
      defaultValue: string = ''
    ): string => {
      if (!value && !keyInfo) return defaultValue;

      if (keyInfo && typeof keyInfo === 'object') {
        try {
          const translated = i18n.t(keyInfo.key, {
            ns: keyInfo.namespace,
            defaultValue: value || defaultValue,
          });
          return translated;
        } catch (error) {
          console.warn(
            `Translation error for key ${JSON.stringify(keyInfo)}:`,
            error
          );
          return value || defaultValue;
        }
      }

      if (keyInfo && typeof keyInfo === 'string') {
        return resolveTranslationKey(keyInfo, i18n, value || defaultValue);
      }

      return value || defaultValue;
    };

    let finalTitle = title;

    if (translationKey) {
      finalTitle = t(`${translationKey}.title`, { defaultValue: title });
    } else if (routeMetadata?.labelKey) {
      finalTitle = resolveTranslation(title, routeMetadata.labelKey, title);
    } else if (title.includes(':') || title.includes('.')) {
      finalTitle = resolveTranslationKey(title, i18n, title);
    }

    document.title = finalTitle;

    if (description) {
      let finalDescription = description;

      if (translationKey) {
        finalDescription = t(`${translationKey}.description`, {
          defaultValue: description,
        });
      } else if (routeMetadata?.descriptionKey) {
        finalDescription = resolveTranslation(
          description,
          routeMetadata.descriptionKey,
          description
        );
      } else if (description.includes(':') || description.includes('.')) {
        finalDescription = resolveTranslationKey(
          description,
          i18n,
          description
        );
      }

      let metaDescription = document.querySelector(
        'meta[name="description"]'
      ) as HTMLMetaElement | null;

      if (!metaDescription) {
        metaDescription = document.createElement('meta') as HTMLMetaElement;
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }

      metaDescription.setAttribute('content', finalDescription);
    }
  }, [
    title,
    description,
    t,
    i18n,
    i18n.language,
    translationKey,
    translationNamespace,
    routeMetadata,
  ]);

  return <>{children}</>;
};

export default PageHelmet;
