import React, { Suspense, useEffect, useRef } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import PageHelmet from '../components/translation/PageHelmet';
import LoadingIndicator from '../components/ui/LoadingIndicator';
import DataSourceTest from '../pages/DataSourceTest';
import { debugLog } from '../utils/debugControl';
import {
  getLandingPageSlug,
  shouldShowLanding,
} from '../utils/shouldShowLanding';
import ROUTES from '.';
import { importers } from './importRegistry';

const componentCache = new Map();

type LazyComponentModule = {
  default: React.ComponentType<Record<string, unknown>>;
};

const cachedLazy = (importFunc: () => Promise<LazyComponentModule>) => {
  const cachedImport = () => {
    const cacheKey = importFunc.toString();

    if (!componentCache.has(cacheKey)) {
      componentCache.set(cacheKey, importFunc());
    }

    return componentCache.get(cacheKey);
  };

  return React.lazy(cachedImport);
};

const Home = cachedLazy(importers.home);
const About = cachedLazy(importers.about);
const Blog = cachedLazy(importers.blog);
const PostDetail = cachedLazy(importers.postDetail);
const Contact = cachedLazy(importers.contact);
const NotFound = cachedLazy(importers.notFound);
const Projects = cachedLazy(importers.projects);
const ProjectDetails = cachedLazy(importers.projectDetails);
const Services = cachedLazy(importers.services);
const TeamDetails = cachedLazy(importers.teamDetails);
const PartnerDetails = cachedLazy(importers.partnerDetails);
const TeamJoin = cachedLazy(importers.teamJoin);
const LandingSeasonal = cachedLazy(importers.landingSeasonal);

const PersistentSuspense: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Suspense
      fallback={<LoadingIndicator message="Loading page..." fullHeight />}
    >
      {children}
    </Suspense>
  );
};

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialLoadRef = useRef(true);

  const showLanding = shouldShowLanding();
  const campaignSlug = getLandingPageSlug();

  // Redirect to landing page ONLY on initial page load
  useEffect(() => {
    // Only redirect when:
    // 1. It's the initial load of the application
    // 2. User is at exactly the root path
    // 3. Landing should be shown based on date criteria
    if (initialLoadRef.current && location.pathname === '/' && showLanding) {
      debugLog('Initial load redirect to landing page');
      // Use replace to avoid creating a history entry
      navigate(`/${campaignSlug}`, { replace: true });
    }

    // Mark initial load as complete after first render
    initialLoadRef.current = false;
  }, [showLanding, location.pathname, navigate, campaignSlug]);

  return (
    <PersistentSuspense>
      <Routes>
        {/* Landing page at the dynamic campaign slug path */}
        <Route
          path={`/${campaignSlug}`}
          element={
            showLanding ? (
              <PageHelmet
                title="Seasonal Campaign"
                description="Special seasonal campaign featuring our latest offerings and opportunities"
                translationNamespace="navigation"
                translationKey="menu.seasonal"
              >
                <LandingSeasonal />
              </PageHelmet>
            ) : (
              // If someone tries to access the campaign page when it's not active, redirect to home
              <Navigate to="/" replace />
            )
          }
        />

        {/* Home always at root - never redirects once user explicitly navigates here */}
        <Route
          path="/"
          element={
            <PageHelmet
              title="Home"
              description="Welcome to Start - Empowering your digital journey"
              translationNamespace={ROUTES.PUBLIC.HOME.translationNamespace}
              translationKey="menu.home"
              routeMetadata={{
                labelKey: ROUTES.PUBLIC.HOME.labelKey,
                descriptionKey: ROUTES.PUBLIC.HOME.descriptionKey,
              }}
            >
              <Home />
            </PageHelmet>
          }
        />

        {/* All other routes remain unchanged */}
        <Route
          path="/about"
          element={
            <PageHelmet
              title="About"
              description="Learn more about our company, mission, and values"
              translationNamespace={ROUTES.PUBLIC.ABOUT.translationNamespace}
              translationKey="menu.about"
              routeMetadata={{
                labelKey: ROUTES.PUBLIC.ABOUT.labelKey,
                descriptionKey: ROUTES.PUBLIC.ABOUT.descriptionKey,
              }}
            >
              <About />
            </PageHelmet>
          }
        />

        {/* Blog routes with consistent structure */}
        <Route path="/blog">
          {/* Root redirects to page 1 */}
          <Route index element={<Navigate to="/blog/page/1" replace />} />

          {/* Paginated list */}
          <Route
            path="page/:page"
            element={
              <PageHelmet
                title="Blog"
                description="Read the latest updates and insights"
                translationNamespace={
                  ROUTES.BLOG.LIST.translationNamespace || 'navigation'
                }
                translationKey="menu.blog"
                routeMetadata={{
                  labelKey: ROUTES.BLOG.LIST.labelKey,
                  descriptionKey: ROUTES.BLOG.LIST.descriptionKey,
                }}
              >
                <Blog />
              </PageHelmet>
            }
          />

          <Route
            path="post/:id"
            element={
              <PageHelmet
                title="Blog Post"
                description="Detailed blog post"
                translationNamespace="screens"
                translationKey="postDetail"
              >
                <PostDetail />
              </PageHelmet>
            }
          />
        </Route>

        <Route
          path="/contact"
          element={
            <PageHelmet
              title="Contact Us"
              description="Get in touch with our team"
              translationNamespace={ROUTES.PUBLIC.CONTACT.translationNamespace}
              translationKey="menu.contact"
              routeMetadata={{
                labelKey: ROUTES.PUBLIC.CONTACT.labelKey,
                descriptionKey: ROUTES.PUBLIC.CONTACT.descriptionKey,
              }}
            >
              <Contact />
            </PageHelmet>
          }
        />

        <Route path="/projects">
          <Route index element={<Navigate to="/projects/page/1" replace />} />

          <Route
            path="page/:page"
            element={
              <PageHelmet
                title="Projects"
                description="Explore our projects"
                translationNamespace={
                  ROUTES.PROJECTS.LIST.translationNamespace || 'navigation'
                }
                translationKey="menu.projects"
                routeMetadata={{
                  labelKey: ROUTES.PROJECTS.LIST.labelKey,
                  descriptionKey: ROUTES.PROJECTS.LIST.descriptionKey,
                }}
              >
                <Projects />
              </PageHelmet>
            }
          />

          <Route
            path="project/:id"
            element={
              <PageHelmet
                title="Project Details"
                description="Detailed project information"
                translationNamespace="screens"
                translationKey="projectDetail"
              >
                <ProjectDetails />
              </PageHelmet>
            }
          />
        </Route>

        <Route
          path="/services"
          element={
            <PageHelmet
              title="Services"
              description="Our services"
              translationNamespace={ROUTES.PUBLIC.SERVICES.translationNamespace}
              translationKey="menu.services"
              routeMetadata={{
                labelKey: ROUTES.PUBLIC.SERVICES.labelKey,
                descriptionKey: ROUTES.PUBLIC.SERVICES.descriptionKey,
              }}
            >
              <Services />
            </PageHelmet>
          }
        />
        <Route
          path="/team"
          element={
            <PageHelmet
              title="Our Team"
              description="Meet our team"
              translationNamespace={
                ROUTES.PUBLIC.TEAMDETAILS.translationNamespace
              }
              translationKey="menu.team"
              routeMetadata={{
                labelKey: ROUTES.PUBLIC.TEAMDETAILS.labelKey,
                descriptionKey: ROUTES.PUBLIC.TEAMDETAILS.descriptionKey,
              }}
            >
              <TeamDetails />
            </PageHelmet>
          }
        />
        <Route
          path="/partners"
          element={
            <PageHelmet
              title="Partners"
              description="Our partners"
              translationNamespace={
                ROUTES.PUBLIC.PARTNERDETAILS.translationNamespace
              }
              translationKey="menu.partners"
              routeMetadata={{
                labelKey: ROUTES.PUBLIC.PARTNERDETAILS.labelKey,
                descriptionKey: ROUTES.PUBLIC.PARTNERDETAILS.descriptionKey,
              }}
            >
              <PartnerDetails />
            </PageHelmet>
          }
        />
        <Route
          path="/join-team"
          element={
            <PageHelmet
              title="Join Our Team"
              description="Career opportunities"
              translationNamespace={ROUTES.PUBLIC.TEAMJOIN.translationNamespace}
              translationKey="teamJoin"
              routeMetadata={{
                labelKey: ROUTES.PUBLIC.TEAMJOIN.labelKey,
                descriptionKey: ROUTES.PUBLIC.TEAMJOIN.descriptionKey,
              }}
            >
              <TeamJoin />
            </PageHelmet>
          }
        />

        <Route path="/test-data-source" element={<DataSourceTest />} />

        {/* Catch-all for unknown routes */}
        <Route
          path="*"
          element={
            <PageHelmet
              title="404 - Not Found"
              description="Page not found"
              translationNamespace="screens"
              translationKey="notFound"
            >
              <NotFound />
            </PageHelmet>
          }
        />
      </Routes>
    </PersistentSuspense>
  );
};

export default AppRoutes;
