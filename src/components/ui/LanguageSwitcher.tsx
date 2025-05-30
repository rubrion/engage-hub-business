import { Box, Button, Menu, MenuItem, SxProps } from '@mui/material';
import React, { MouseEvent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  AVAILABLE_LANGUAGES,
  SupportedLanguage,
} from '../../context/languageContextUtils';
import { useLanguage } from '../../hooks/useLanguageContext';

interface LanguageSwitcherProps {
  variant?: 'icon' | 'text' | 'full';
  sx?: SxProps;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'full',
  sx,
}) => {
  const { language, changeLanguage } = useLanguage();
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Force component to update when i18n.language changes
  const [currentI18nLang, setCurrentI18nLang] = useState(i18n.language);

  useEffect(() => {
    // Subscribe to language changes from i18next
    const handleLanguageChanged = (lang: string) => {
      setCurrentI18nLang(lang);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  // Language labels mapping
  const languageLabels: Record<SupportedLanguage, string> = {
    en: 'English',
    es: 'Español',
    pt: 'Português',
  };

  // Get the current language label - now using currentI18nLang to ensure it's up-to-date
  const activeLanguage = AVAILABLE_LANGUAGES.includes(
    currentI18nLang as SupportedLanguage
  )
    ? (currentI18nLang as SupportedLanguage)
    : language;
  const currentLanguageLabel = languageLabels[activeLanguage];

  // Handle menu opening
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu closing and language selection - simplified to not modify URL
  const handleMenuItemClick = (lang: SupportedLanguage) => {
    setAnchorEl(null);

    if (lang === language) return;

    // Change the language in context which updates localStorage
    changeLanguage(lang);

    // No URL manipulation - language persists via localStorage only
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Determine what to display based on variant
  const buttonContent = useMemo(() => {
    switch (variant) {
      case 'icon':
        return activeLanguage.toUpperCase();
      case 'text':
        return activeLanguage.toUpperCase();
      case 'full':
      default:
        return currentLanguageLabel;
    }
  }, [variant, activeLanguage, currentLanguageLabel]);

  return (
    <Box>
      <Button
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ minWidth: variant === 'icon' ? 'auto' : undefined, ...sx }}
      >
        {buttonContent}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
      >
        {AVAILABLE_LANGUAGES.map((lang) => (
          <MenuItem
            key={lang}
            onClick={() => handleMenuItemClick(lang)}
            selected={lang === activeLanguage}
          >
            {languageLabels[lang]}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
