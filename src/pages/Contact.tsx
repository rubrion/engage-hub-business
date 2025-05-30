import { GitHub, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CONTACT_EMAIL } from '../config/emails';
import useLocalizedContent from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import { animations, gridSizes } from '../theme/themeUtils';
import { getFormEndpointEmail, sendForm } from '../utils/formSubmit';

interface ContactInfo {
  title: string;
  email: string;
  phone: string;
  address: string;
}

interface BusinessHours {
  title: string;
  weekdays: string;
  weekends: string;
}

interface FormTranslations {
  title: string;
  name: string;
  email: string;
  subject: string;
  customSubject: string;
  message: string;
  attachFile?: string;
  fileSize?: string;
  fileSizeError?: string;
  submit: string;
  success: string;
  note?: string;
}

interface SubjectOptions {
  partner: string;
  services: string;
  other: string;
}

const Contact: React.FC = () => {
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getContent } = useLocalizedContent('screens', 'contact');
  const { getContent: getCommonContent } = useLocalizedContent('common');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const contactData = {
    pageTitle: getContent<string>('pageTitle'),
    pageDescription: getContent<string>('pageDescription'),
    contactInfo: getContent<ContactInfo>('contactInfo'),
    businessHours: getContent<BusinessHours>('businessHours'),
    form: getContent<FormTranslations>('form'),
    subjects: getContent<SubjectOptions>('subjects'),
    social: {
      twitter: getCommonContent<string>('social.twitter'),
      linkedin: getCommonContent<string>('social.linkedin'),
      instagram: getCommonContent<string>('social.instagram'),
      github: getCommonContent<string>('social.github'),
      links: {
        twitter: getCommonContent<string>('social.links.twitter'),
        linkedin: getCommonContent<string>('social.links.linkedin'),
        instagram: getCommonContent<string>('social.links.instagram'),
        github: getCommonContent<string>('social.links.github'),
      },
    },
  };

  const SUBJECT_OPTIONS = {
    PARTNER: contactData.subjects.partner,
    SERVICES: contactData.subjects.services,
    OTHER: contactData.subjects.other,
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    customSubject: '',
    message: '',
  });

  // const [_selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [_fileError, _setFileError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const preselectedSubject = params.get('subject');

    if (preselectedSubject === 'partner') {
      setFormData((prev) => ({
        ...prev,
        subject: SUBJECT_OPTIONS.PARTNER,
        customSubject: '',
      }));
    } else if (preselectedSubject === 'services') {
      setFormData((prev) => ({
        ...prev,
        subject: SUBJECT_OPTIONS.SERVICES,
        customSubject: '',
      }));
    }
  }, [location.search, SUBJECT_OPTIONS.PARTNER, SUBJECT_OPTIONS.SERVICES]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      subject: value,
      customSubject: value === SUBJECT_OPTIONS.OTHER ? prev.customSubject : '',
    }));
  };

  // Kept for future implementation but not currently used
  // Function commented out to avoid TypeScript warnings
  /*
  const _handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const errorMessage = contactData.form.fileSizeError || 'File size too large';
      if (file.size > 5 * 1024 * 1024) {
        setFileError(errorMessage);
        setSelectedFile(null);
        e.target.value = '';
      } else {
        setSelectedFile(file);
        setFileError(null);
      }
    }
  };
  */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalSubject =
      formData.subject === SUBJECT_OPTIONS.OTHER
        ? formData.customSubject
        : formData.subject;

    const formPayload = {
      ...formData,
      finalSubject,
    };

    try {
      // Get email endpoint from environment variables
      const targetEmail = getFormEndpointEmail('contact');

      await sendForm(formPayload, targetEmail, {
        formType: 'contact',
        // File attachment removed as it's not working properly
      });

      setSubmitStatus({
        success: true,
        message: contactData.form.success,
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        customSubject: '',
        message: '',
      });

      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseLayout>
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Grid container spacing={6}>
            <Grid size={gridSizes.halfWidth}>
              <motion.div
                initial={animations.fadeInLeft}
                animate={animations.fadeInLeft.animate}
                transition={animations.fadeInLeft.transition}
              >
                <Typography variant="h3" gutterBottom>
                  {contactData.pageTitle}
                </Typography>
                <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                  {contactData.pageDescription}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  {contactData.contactInfo.title}
                </Typography>
                <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                  {CONTACT_EMAIL || contactData.contactInfo.email}
                </Typography>
                <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                  {contactData.contactInfo.phone}
                </Typography>
                <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                  {contactData.contactInfo.address}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {contactData.social.links.instagram && (
                    <IconButton
                      component="a"
                      href={contactData.social.links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={contactData.social.instagram}
                      sx={{ color: 'primary.main' }}
                      size="medium"
                    >
                      <Instagram />
                    </IconButton>
                  )}
                  {contactData.social.links.linkedin && (
                    <IconButton
                      component="a"
                      href={contactData.social.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={contactData.social.linkedin}
                      sx={{ color: 'primary.main' }}
                      size="medium"
                    >
                      <LinkedIn />
                    </IconButton>
                  )}
                  {contactData.social.links.twitter && (
                    <IconButton
                      component="a"
                      href={contactData.social.links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={contactData.social.twitter}
                      sx={{ color: 'primary.main' }}
                      size="medium"
                    >
                      <Twitter />
                    </IconButton>
                  )}
                  {contactData.social.links.github && (
                    <IconButton
                      component="a"
                      href={contactData.social.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={contactData.social.github}
                      sx={{ color: 'primary.main' }}
                      size="medium"
                    >
                      <GitHub />
                    </IconButton>
                  )}
                </Box>

                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    {contactData.businessHours.title}
                  </Typography>
                  <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                    {contactData.businessHours.weekdays}
                  </Typography>
                  <Typography variant="body2" component="p" sx={{ mb: 2 }}>
                    {contactData.businessHours.weekends}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>

            <Grid size={gridSizes.halfWidth}>
              <motion.div
                initial={animations.fadeInRight}
                animate={animations.fadeInRight.animate}
                transition={{
                  ...animations.fadeInRight.transition,
                  delay: 0.2,
                }}
              >
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                  <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                    {contactData.form.title}
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid size={gridSizes.halfWidth}>
                        <TextField
                          fullWidth
                          label={contactData.form.name}
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid size={gridSizes.halfWidth}>
                        <TextField
                          fullWidth
                          label={contactData.form.email}
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid size={gridSizes.fullWidth}>
                        <FormControl fullWidth required>
                          <InputLabel id="subject-label">
                            {contactData.form.subject}
                          </InputLabel>
                          <Select
                            labelId="subject-label"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            label={contactData.form.subject}
                            onChange={handleSubjectChange}
                          >
                            <MenuItem value={SUBJECT_OPTIONS.PARTNER}>
                              {SUBJECT_OPTIONS.PARTNER}
                            </MenuItem>
                            <MenuItem value={SUBJECT_OPTIONS.SERVICES}>
                              {SUBJECT_OPTIONS.SERVICES}
                            </MenuItem>
                            <MenuItem value={SUBJECT_OPTIONS.OTHER}>
                              {SUBJECT_OPTIONS.OTHER}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      {formData.subject === SUBJECT_OPTIONS.OTHER && (
                        <Grid size={gridSizes.fullWidth}>
                          <TextField
                            fullWidth
                            label={contactData.form.customSubject}
                            name="customSubject"
                            value={formData.customSubject}
                            onChange={handleChange}
                            required={
                              formData.subject === SUBJECT_OPTIONS.OTHER
                            }
                          />
                        </Grid>
                      )}

                      <Grid size={gridSizes.fullWidth}>
                        <TextField
                          fullWidth
                          label={contactData.form.message}
                          name="message"
                          multiline
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </Grid>

                      {/* File attachment section - commented out as it's not working properly yet
                      <Grid size={gridSizes.fullWidth}>
                        <Box sx={{ mb: 2 }}>
                          <Button variant="outlined" component="label" fullWidth>
                            {selectedFile
                              ? selectedFile.name
                              : contactData.form.attachFile}
                            <input
                              ref={fileInputRef}
                              type="file"
                              hidden
                              onChange={handleFileChange}
                            />
                          </Button>
                          {fileError && (
                            <Typography
                              color="error"
                              variant="caption"
                              sx={{ mt: 1 }}
                            >
                              {fileError}
                            </Typography>
                          )}
                          {selectedFile && (
                            <Typography
                              variant="caption"
                              sx={{ display: 'block', mt: 1 }}
                            >
                              {contactData.form.fileSize.replace(
                                '{{size}}',
                                (selectedFile.size / (1024 * 1024)).toFixed(2)
                              )}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                      */}

                      <Grid size={gridSizes.fullWidth}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          fullWidth
                          disabled={isSubmitting}
                        >
                          {isSubmitting
                            ? 'Submitting...'
                            : contactData.form.submit}
                        </Button>
                        {submitStatus.message && (
                          <Typography
                            color={
                              submitStatus.success ? 'success.main' : 'error'
                            }
                            variant="body2"
                            sx={{ mt: 2 }}
                          >
                            {submitStatus.message}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </BaseLayout>
  );
};

export default Contact;
