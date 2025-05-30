import { i18n } from 'i18next';
import React from 'react';

/**
 * Helper function to safely handle potentially undefined or null translation content
 * with standardized fallback to MissingTranslation component
 *
 */
export function getTranslatableContent(
  content: string | null,
  fallbackKey: string
): string | React.ReactNode {
  return content ?? `[Missing: ${fallbackKey}]`;
}

/**
 * Parses a translation key string in format "namespace:key" or just "key"
 * @param keyString The translation key string to parse
 * @returns An object with namespace and key
 */
export const parseTranslationKey = (
  keyString: string
): { namespace: string; key: string } => {
  if (keyString.includes(':')) {
    const [namespace, key] = keyString.split(':');
    return { namespace, key };
  }

  return { namespace: 'common', key: keyString };
};

/**
 * Gets string content that can be used in attributes like title, alt, etc.
 * @param content The content to use (may be null)
 * @param fallbackKey Fallback translation key if content is null
 * @returns The string content or a fallback message
 */
export function getStringContent(
  content: string | null,
  fallbackKey: string
): string {
  return content ?? `Missing: ${fallbackKey}`;
}

/**
 * Resolves a translation key to its value using i18n directly
 * @param keyString Translation key string (can be "namespace:key" format)
 * @param i18nInstance The i18n instance to use
 * @param defaultValue Optional default value if translation is missing
 * @returns Translated string or default value
 */
export const resolveTranslationKey = (
  keyString: string,
  i18nInstance: i18n,
  defaultValue?: string
): string => {
  const { namespace, key } = parseTranslationKey(keyString);
  try {
    const result = i18nInstance.t(key, { ns: namespace });
    return result !== key ? result : defaultValue || keyString;
  } catch (error) {
    console.warn(`Translation error for key ${keyString}:`, error);
    return defaultValue || keyString;
  }
};
