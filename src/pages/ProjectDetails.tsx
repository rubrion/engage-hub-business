import ArticleIcon from '@mui/icons-material/Article';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import LinkIcon from '@mui/icons-material/Link';
import { Paper, Typography, useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import ContentDetailPage, {
  MetaDisplay,
  SidebarConfig,
} from '../components/content/ContentDetailPage';
import PageHelmet from '../components/translation/PageHelmet';
import { TeamMemberType, useTeamMembers } from '../data/teamData';
import { useContentById } from '../hooks/useContent';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { MockProject } from '../services/projects';
import { CATEGORY_ICONS } from '../utils/iconMappings';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();

  const { getContent: getProjectText } = useLocalizedContent(
    'screens',
    'projectDetail'
  );
  const { getContent: getNavText } = useLocalizedContent('navigation', 'menu');

  const { document: project } = useContentById<MockProject>('projects', id);

  const allTeamMembers = useTeamMembers();
  const categoryIconMap = useMemo(() => CATEGORY_ICONS, []);

  const participants = useMemo(() => {
    if (!project?.meta?.team && allTeamMembers.length > 0) {
      const randomCount = 2 + Math.floor(Math.random() * 2);
      return allTeamMembers
        .slice()
        .sort(() => 0.5 - Math.random())
        .slice(0, randomCount);
    }

    if (project?.meta?.team) {
      return project.meta.team.map((member: TeamMemberType) => ({
        id: typeof member.id === 'string' ? parseInt(member.id, 10) : member.id,
        name: member.name || '',
        role: member.role || '',
        image: member.image || '',
        bio: member.bio || '',
        linkedin: member.linkedin,
        github: member.github,
        website: member.website || member.contact,
      }));
    }

    return [];
  }, [project, allTeamMembers]);

  // Create breadcrumbs
  const breadcrumbs = useMemo(
    () => [
      {
        label: getNavText<string>('home'),
        href: ROUTES.PUBLIC.HOME.path,
      },
      {
        label: getNavText<string>('projects'),
        href: ROUTES.PROJECTS.ROOT.path,
      },
      {
        label: project?.title || id || '',
      },
    ],
    [getNavText, project, id]
  );

  if (!id) {
    return (
      <BaseLayout>
        <Paper sx={{ p: 3, m: 3, borderRadius: theme.shape.borderRadius }}>
          <Typography variant="h5" color="error">
            Invalid project ID
          </Typography>
        </Paper>
      </BaseLayout>
    );
  }

  const metaSections: MetaDisplay[] = [];

  if (project) {
    const basicInfoItems = [];

    if (project.category) {
      basicInfoItems.push({
        label: getProjectText<string>('details.category'),
        value: project.category,
      });
    }

    if (project.date) {
      basicInfoItems.push({
        label: getProjectText<string>('details.date'),
        value: project.date,
      });
    }

    if (basicInfoItems.length > 0) {
      metaSections.push({
        title: getProjectText<string>('sections.basicInfo'),
        values: basicInfoItems,
      });
    }

    if (project?.meta?.technologies && project.meta.technologies.length > 0) {
      metaSections.push({
        title: getProjectText<string>('details.technologies'),
        values: [
          {
            label: '',
            value: (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '4px',
                }}
              >
                {project.meta.technologies.map((tech: string, idx: number) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor:
                        theme.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.08)'
                          : 'rgba(0,0,0,0.06)',
                      padding: '2px 8px',
                      borderRadius: theme.shape.borderRadius,
                      marginRight: '4px',
                      marginBottom: '4px',
                      fontSize: '0.85rem',
                      color: theme.palette.text.primary,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ),
          },
        ],
      });
    }
  }
  const links = [];

  if (project?.github) {
    links.push({
      label: getProjectText<string>('details.github'),
      url: project.github as string,
      icon: <GitHubIcon fontSize="small" />,
    });
  }

  if (project?.website) {
    links.push({
      label: getProjectText<string>('details.website'),
      url: project.website as string,
      icon: <LanguageIcon fontSize="small" />,
    });
  }

  if (project?.references && project.references.length > 0) {
    const articlesGroup = project.references
      .filter((ref) => ref.type === 'article')
      .map((reference) => ({
        label: reference.title,
        url: reference.url,
        icon: <ArticleIcon fontSize="small" />,
      }));

    const linksGroup = project.references
      .filter((ref) => ref.type === 'link')
      .map((reference) => ({
        label: reference.title,
        url: reference.url,
        icon: <LinkIcon fontSize="small" />,
      }));

    if (articlesGroup.length > 0) {
      links.push(...articlesGroup);
    }

    if (linksGroup.length > 0) {
      links.push(...linksGroup);
    }
  }

  const sidebar: SidebarConfig = {
    metaSections,
    links: links.length > 0 ? links : undefined,
  };

  const cta = {
    overline: getProjectText<string>('cta.overline'),
    title: getProjectText<string>('cta.title'),
    buttons: [
      {
        text: getProjectText<string>('cta.button'),
        href: ROUTES.PUBLIC.CONTACT.path,
        variant: 'outlined' as const,
      },
      {
        text: getProjectText<string>('navigation.back'),
        href: ROUTES.PROJECTS.ROOT.path,
        variant: 'outlined' as const,
      },
    ],
  };

  const pageTitle = project?.title
    ? `${project.title} | ${getNavText<string>('projects')}`
    : getProjectText<string>('meta.title');

  const pageDescription =
    project?.excerpt ?? getProjectText<string>('meta.description');

  return (
    <BaseLayout>
      <PageHelmet
        title={pageTitle}
        description={pageDescription}
        translationNamespace="screens"
        translationKey="projectDetail"
      >
        <ContentDetailPage
          resource="projects"
          i18nBase="screens.projectDetail"
          translationNamespace="projectDetail"
          id={id}
          breadcrumbs={breadcrumbs}
          linkToList={ROUTES.PROJECTS.ROOT.path}
          sidebar={sidebar}
          cta={cta}
          participants={participants}
          categoryIconMap={categoryIconMap}
        />
      </PageHelmet>
    </BaseLayout>
  );
};

export default ProjectDetails;
