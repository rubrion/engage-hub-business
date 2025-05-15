import { Helmet } from 'react-helmet';

import { getRouteMetadata, RouteMetadata } from '../../routes/routes.config';

interface PageHelmetProps {
  routeKey?: string;
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  canonicalUrl?: string;
}

function PageHelmet({
  routeKey,
  title,
  description,
  image,
  keywords,
  canonicalUrl,
}: PageHelmetProps) {
  let metadata: RouteMetadata | undefined;

  if (routeKey) {
    metadata = getRouteMetadata(routeKey);
  }

  const metaTitle = title || metadata?.title || 'Rubrion Web Client';
  const metaDescription =
    description || metadata?.description || 'A modern web application template';
  const metaImage = image || metadata?.image || '/logo.png';
  const metaKeywords = keywords ||
    metadata?.keywords || ['react', 'application'];
  const metaCanonical =
    canonicalUrl || metadata?.canonicalUrl || window.location.href;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="title" content={metaTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords.join(', ')} />

      <link rel="canonical" href={metaCanonical} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={metaCanonical} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={metaCanonical} />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={metaImage} />
    </Helmet>
  );
}

export default PageHelmet;
