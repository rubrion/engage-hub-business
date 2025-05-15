import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import PageHelmet from '../../components/PageHelmet';
import { fetchBlogPosts } from '../../services/blogService';

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
}

function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBlogPosts();
        setPosts(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch blog posts', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="blog-list-page">
      <PageHelmet routeKey="BLOG_LIST" />

      <h1>Our Blog</h1>

      {isLoading && (
        <div className="loading-posts">
          <p>Loading blog posts...</p>
          <div className="loading-spinner"></div>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      )}

      {!isLoading && !error && (
        <div className="blog-posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="blog-post-card">
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
              <Link to={`/blog/${post.id}`} className="read-more-link">
                Read More
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogList;
