import { Link } from 'react-router-dom';

import PageHelmet from '../components/PageHelmet';

function NotFound() {
  return (
    <div
      className="not-found-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <PageHelmet
        title="Page Not Found | Rubrion Web Client"
        description="The page you're looking for doesn't exist."
      />

      <div className="not-found-content" style={{ textAlign: 'center' }}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>

        <Link to="/" className="back-home-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
