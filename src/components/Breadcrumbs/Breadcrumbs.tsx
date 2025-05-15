import { Link } from 'react-router-dom';

import { getAllRoutes } from '../../routes/routes.config';

interface BreadcrumbsProps {
  currentPath: string;
}

function Breadcrumbs({ currentPath }: BreadcrumbsProps) {
  const routes = getAllRoutes();
  const pathSegments = currentPath.split('/').filter((segment) => segment);

  const breadcrumbs = [{ name: 'Home', path: '/' }];

  let currentBuiltPath = '';
  pathSegments.forEach((segment) => {
    currentBuiltPath += `/${segment}`;

    const matchingRoute = routes.find((route) => {
      if (route.path === currentBuiltPath) {
        return true;
      }

      // For dynamic routes like /blog/:slug
      if (route.path.includes(':')) {
        const routePattern = route.path.split('/');
        const currentPattern = currentBuiltPath.split('/');

        if (routePattern.length !== currentPattern.length) {
          return false;
        }

        // Compare each segment, allowing dynamic segments to match
        return routePattern.every((routeSegment, i) => {
          if (routeSegment.startsWith(':')) {
            return true; // Dynamic segment matches anything
          }
          return routeSegment === currentPattern[i];
        });
      }

      return false;
    });

    if (matchingRoute) {
      // Use route metadata for the breadcrumb name
      const name = matchingRoute.metadata.title.split('|')[0].trim();
      breadcrumbs.push({ name, path: currentBuiltPath });
    } else {
      // For segments without matching routes, use capitalized segment name
      breadcrumbs.push({
        name: segment.charAt(0).toUpperCase() + segment.slice(1),
        path: currentBuiltPath,
      });
    }
  });

  return (
    <nav aria-label="breadcrumb" className="breadcrumb-container">
      <ol className="breadcrumb">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li
              key={crumb.path}
              className={`breadcrumb-item ${isLast ? 'active' : ''}`}
              aria-current={isLast ? 'page' : undefined}
            >
              {isLast ? crumb.name : <Link to={crumb.path}>{crumb.name}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
