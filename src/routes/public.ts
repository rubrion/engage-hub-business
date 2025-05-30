import { RouteObject } from './types';

const PUBLIC_ROUTES: Record<string, RouteObject> = {
  HOME: {
    path: '/',
    label: 'Home',
    labelKey: { namespace: 'navigation', key: 'menu.home' },
    description: 'Welcome to Start - Empowering your digital journey',
    descriptionKey: { namespace: 'common', key: 'meta.home' },
    translationNamespace: 'navigation',
  },
  ABOUT: {
    path: '/about',
    label: 'About',
    labelKey: { namespace: 'navigation', key: 'menu.about' },
    description: 'Learn more about our company, mission, and values',
    descriptionKey: { namespace: 'common', key: 'meta.about' },
    translationNamespace: 'navigation',
  },
  CONTACT: {
    path: '/contact',
    label: 'Contact',
    labelKey: { namespace: 'navigation', key: 'menu.contact' },
    description: 'Get in touch with our team',
    descriptionKey: { namespace: 'common', key: 'meta.contact' },
    translationNamespace: 'navigation',
  },
  SERVICES: {
    path: '/services',
    label: 'Services',
    labelKey: { namespace: 'navigation', key: 'menu.services' },
    description: 'Our services',
    descriptionKey: { namespace: 'common', key: 'meta.services' },
    translationNamespace: 'navigation',
  },
  TEAMDETAILS: {
    path: '/team',
    label: 'Team',
    labelKey: { namespace: 'navigation', key: 'menu.team' },
    description: 'Meet our team',
    descriptionKey: { namespace: 'common', key: 'meta.team' },
    translationNamespace: 'navigation',
  },
  PARTNERDETAILS: {
    path: '/partners',
    label: 'Partners',
    labelKey: { namespace: 'navigation', key: 'menu.partners' },
    description: 'Our partners',
    descriptionKey: { namespace: 'common', key: 'meta.partners' },
    translationNamespace: 'navigation',
  },
  TEAMJOIN: {
    path: '/join-team',
    label: 'Join Our Team',
    labelKey: { namespace: 'screens', key: 'teamJoin.title' },
    description: 'Career opportunities',
    descriptionKey: { namespace: 'screens', key: 'teamJoin.description' },
    translationNamespace: 'screens',
  },
};

export default PUBLIC_ROUTES;
