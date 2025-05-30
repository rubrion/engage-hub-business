import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { TEAM_EMAIL } from '../config/emails';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import { animations } from '../theme/themeUtils';
import { getFormEndpointEmail, sendForm } from '../utils/formSubmit';

const TeamJoin: React.FC = () => {
  const { getContent } = useLocalizedContent('screens', 'teamJoin');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    githubLink: '',
    linkedinLink: '',
    message: '',
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const translations = {
    title: getContent<string>('title'),
    description: getContent<string>('description'),
    whyWorkWithUs: {
      title: getContent<string>('whyWorkWithUs.title'),
      reasons: getContent<string[]>('whyWorkWithUs.reasons'),
    },
    currentOpenings: {
      title: getContent<string>('currentOpenings.title'),
      positions: getContent<string[]>('currentOpenings.positions'),
    },
    form: {
      title: getContent<string>('form.title'),
      fullName: getContent<string>('form.fullName'),
      email: getContent<string>('form.email'),
      phone: getContent<string>('form.phone'),
      position: getContent<string>('form.position'),
      github: getContent<string>('form.github'),
      linkedin: getContent<string>('form.linkedin'),
      uploadCV: getContent<string>('form.uploadCV'),
      changeCV: getContent<string>('form.changeCV'),
      selectedFile: getContent<string>('form.selectedFile'),
      fileHelp: getContent<string>('form.fileHelp'),
      message: getContent<string>('form.message'),
      submit: getContent<string>('form.submit'),
      submitting: getContent<string>('form.submitting'),
      success: getContent<string>('form.success'),
      error: getContent<string>('form.error'),
    },
    positions: getContent<string[]>('positions'),
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const targetEmail = getFormEndpointEmail('teamJoin');

      await sendForm(formData, targetEmail, {
        formType: 'teamJoin',
      });

      setSubmitStatus({
        success: true,
        message: translations.form.success,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        githubLink: '',
        linkedinLink: '',
        message: '',
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : translations.form.error;
      setSubmitStatus({
        success: false,
        message: errorMessage,
      });
    } finally {
      setSubmitLoading(false);
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
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={animations.fadeInLeft}
                animate={animations.fadeInLeft.animate}
                transition={animations.fadeInLeft.transition}
              >
                <Typography variant="h3" gutterBottom>
                  {translations.title}
                </Typography>
                <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                  {translations.description}
                </Typography>

                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    {translations.whyWorkWithUs.title}
                  </Typography>
                  {translations.whyWorkWithUs.reasons.map(
                    (reason: string, index: number) => (
                      <Typography
                        key={index}
                        variant="body2"
                        component="p"
                        sx={{ mb: 2 }}
                      >
                        • {reason}
                      </Typography>
                    )
                  )}
                </Box>

                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    {translations.currentOpenings.title}
                  </Typography>
                  {translations.currentOpenings.positions.map(
                    (position: string, index: number) => (
                      <Typography
                        key={index}
                        variant="body2"
                        component="p"
                        sx={{ mb: 2 }}
                      >
                        • {position}
                      </Typography>
                    )
                  )}
                </Box>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
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
                    {translations.form.title}
                  </Typography>

                  {submitStatus.message && (
                    <Box
                      sx={{
                        p: 2,
                        mb: 3,
                        backgroundColor: submitStatus.success
                          ? 'rgba(116, 198, 157, 0.1)'
                          : 'rgba(255, 99, 71, 0.1)',
                        borderRadius: 1,
                        border: `1px solid ${submitStatus.success ? 'rgba(116, 198, 157, 0.5)' : 'rgba(255, 99, 71, 0.5)'}`,
                      }}
                    >
                      <Typography
                        variant="body2"
                        color={submitStatus.success ? 'primary' : 'error'}
                      >
                        {submitStatus.message}
                      </Typography>
                    </Box>
                  )}

                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          fullWidth
                          label={translations.form.fullName}
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          fullWidth
                          label={translations.form.email}
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          fullWidth
                          label={translations.form.phone}
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl fullWidth required>
                          <InputLabel id="position-label">
                            {translations.form.position}
                          </InputLabel>
                          <Select
                            labelId="position-label"
                            name="position"
                            value={formData.position}
                            label={translations.form.position}
                            onChange={handleSelectChange}
                          >
                            {translations.positions.map((pos) => (
                              <MenuItem key={pos} value={pos}>
                                {pos}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          fullWidth
                          label={translations.form.github}
                          name="githubLink"
                          value={formData.githubLink}
                          onChange={handleChange}
                          placeholder="https://github.com/username"
                        />
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          fullWidth
                          label={translations.form.linkedin}
                          name="linkedinLink"
                          value={formData.linkedinLink}
                          onChange={handleChange}
                          placeholder="https://linkedin.com/in/username"
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="body2" color="textSecondary">
                            * {translations.form.fileHelp} - Please send your CV
                            directly to {TEAM_EMAIL}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          label={translations.form.message}
                          name="message"
                          multiline
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          fullWidth
                          disabled={submitLoading}
                        >
                          {submitLoading
                            ? translations.form.submitting
                            : translations.form.submit}
                        </Button>
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

export default TeamJoin;
