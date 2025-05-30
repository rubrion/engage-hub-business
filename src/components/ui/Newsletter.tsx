import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';

import { useLocalizedContent } from '../../hooks/useLocalizedContent';
import { subscribeToNewsletter } from '../../services/newsLetter';
import { spacing } from '../../theme/themeUtils';
import MissingTranslation from '../translation/MissingTranslation';

interface NewsletterProps {
  open?: boolean;
  onClose?: () => void;
}

const NewsletterPopup: React.FC<NewsletterProps> = ({
  open = false,
  onClose,
}) => {
  const theme = useTheme();
  const { getContent } = useLocalizedContent('common', 'newsletter');

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const translations = {
    title: getContent<string>('title'),
    description: getContent<string>('description'),
    emailLabel: getContent<string>('emailLabel'),
    submitText: getContent<string>('subscribeButton'),
    successText: getContent<string>('successMessage'),
    errorText: getContent<string>('emailRequired'),
    fieldRequired: getContent<string>('emailRequired'),
    invalidEmail: getContent<string>('invalidEmail'),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatus('error');
      setErrorMessage(translations.fieldRequired);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setStatus('error');
      setErrorMessage(translations.invalidEmail);
      return;
    }

    setStatus('submitting');

    try {
      await subscribeToNewsletter(email);
      setStatus('success');
      setEmail('');
      setErrorMessage('');
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : translations.errorText
      );
    }
  };

  const renderContent = (content: string | null, key: string) => {
    return (
      content ?? <MissingTranslation translationKey={key} showTooltip={true} />
    );
  };

  const content = (
    <Box>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {renderContent(
          translations.description,
          'common.newsletter.description'
        )}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            fullWidth
            variant="outlined"
            type="email"
            label={translations.emailLabel}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={status === 'error'}
            helperText={status === 'error' ? errorMessage : ''}
            disabled={status === 'submitting' || status === 'success'}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment:
                status === 'success' ? (
                  <InputAdornment position="end">
                    <CheckIcon color="success" />
                  </InputAdornment>
                ) : null,
            }}
          />

          {status === 'success' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {translations.successText}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={status === 'submitting' || status === 'success'}
            endIcon={<SendIcon />}
          >
            {status === 'submitting' ? '...' : translations.submitText}
          </Button>
        </Box>
      </form>
    </Box>
  );

  if (open && onClose) {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: theme.shape.borderRadius,
          },
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: theme.spacing(2),
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {renderContent(translations.title, 'common.newsletter.title')}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>{content}</DialogContent>
      </Dialog>
    );
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: spacing.lg,
        borderRadius: theme.shape.borderRadius,
        mt: spacing.xl,
      }}
    >
      {content}
    </Paper>
  );
};

export default NewsletterPopup;
