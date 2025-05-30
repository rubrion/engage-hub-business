import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { useLocalizedContent } from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';

const NotFound: React.FC = () => {
  const { getContent } = useLocalizedContent('screens', 'notFound');

  const translations = {
    title: getContent<string>('title'),
    message: getContent<string>('message'),
    returnHome: getContent<string>('returnHome'),
  };

  return (
    <BaseLayout>
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          {translations.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {translations.message}
        </Typography>
        <Button
          component={Link}
          to={ROUTES.PUBLIC.HOME.path}
          variant="contained"
          color="primary"
        >
          {translations.returnHome}
        </Button>
      </Container>
    </BaseLayout>
  );
};

export default NotFound;
