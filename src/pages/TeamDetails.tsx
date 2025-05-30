import { Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CTASection } from '../components/ui';
import EntityCard from '../components/ui/Card/EntityCard';
import { useTeamMembers } from '../data/teamData';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { useScrollTo } from '../hooks/useScrollTo';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';

const TeamDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollToElement } = useScrollTo();
  const { getContent } = useLocalizedContent('screens', 'team');

  const pageDetails = {
    overline: getContent<string>('details.overline'),
    title: getContent<string>('details.title'),
    buttonText: getContent<string>('details.buttonText'),
    footer: getContent<string>('details.footer'),
  };

  const teamMembers = useTeamMembers();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollToId = params.get('scrollTo');

    if (scrollToId) {
      scrollToElement(scrollToId);
    }
  }, [location.search, scrollToElement]);

  // Normalize members to ensure consistency
  const normalizedMembers = teamMembers.map((member) => ({
    ...member,
    // Set undefined for missing images to use placeholder
    image: member.image || undefined,
  }));

  return (
    <BaseLayout>
      <CTASection
        id="team-details-section"
        overline={pageDetails.overline}
        title={pageDetails.title}
        buttonText={pageDetails.buttonText}
        onButtonClick={() => navigate(ROUTES.PUBLIC.TEAMJOIN.path)}
      >
        <Grid container spacing={4}>
          {normalizedMembers.map((member) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={member.id || member.name}
            >
              <EntityCard
                avatar={member.image || ''}
                name={member.name}
                subtitle={member.role}
                description={member.bio}
                links={{
                  linkedin: member.linkedin,
                  github: member.github,
                  website: member.website || member.contact,
                }}
                variant="member"
                size="default"
                forceAvatarLayout={true} // Force avatar layout to avoid image distortion
                avatarSize={96} // Larger avatar size for team details page
              />
            </Grid>
          ))}
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 6 }}
        >
          {pageDetails.footer}
        </Typography>
      </CTASection>
    </BaseLayout>
  );
};

export default TeamDetails;
