import { NavLink, Outlet, useLocation } from 'react-router-dom';

import Breadcrumbs from '../components/Breadcrumbs';
import PageHelmet from '../components/PageHelmet';
import ThemeToggle from '../components/ThemeToggle';
import { getAllRoutes } from '../routes/routes.config';

function Layout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const routes = getAllRoutes();
  const currentRoute = routes.find((route) => {
    const pathPattern = route.path.replace(/:\w+/g, '[^/]+');
    const pathRegex = new RegExp(`^${pathPattern}$`);
    return pathRegex.test(currentPath);
  });

  return (
    <div className="app-container">
      <PageHelmet routeKey={currentRoute?.routeKey} />

      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <NavLink to="/">Rubrion Template</NavLink>
          </div>
          <nav className="main-nav">
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main className="app-main">
        {currentPath !== '/' && <Breadcrumbs currentPath={currentPath} />}

        <div className="page-content">
          <Outlet />
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-info">
            <p>&copy; {new Date().getFullYear()} Rubrion Web Client Template</p>
          </div>
          <div className="footer-links">
            <ul>
              <li>
                <NavLink to="/privacy">Privacy Policy</NavLink>
              </li>
              <li>
                <NavLink to="/terms">Terms of Service</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
