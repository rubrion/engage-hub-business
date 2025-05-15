import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import PageHelmet from '../../components/PageHelmet';
import { fetchBlogPostById } from '../../services/blogService';

interface BlogPostData {
  id: string;
  title: string;
  summary: string;
  content: string;
}

function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      navigate('/blog');
      return;
    }

    const loadPost = async () => {
      try {
        setIsLoading(true);
        const data = await fetchBlogPostById(slug);
        setPost(data);
        setError(null);
      } catch (err) {
        console.error(`Failed to fetch blog post with ID ${slug}`, err);
        setError(
          'Failed to load blog post. The post might not exist or there was a server error.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug, navigate]);

  return (
    <div className="blog-post-page">
      {isLoading && (
        <div className="loading-post">
          <p>Loading post...</p>
          <div className="loading-spinner"></div>
        </div>
      )}

      {error && (
        <div className="error-message">
          <h2>Error Loading Post</h2>
          <p>{error}</p>
          <Link to="/blog" className="back-to-blog">
            Back to Blog List
          </Link>
        </div>
      )}

      {!isLoading && !error && post && (
        <>
          <PageHelmet
            routeKey="BLOG_POST"
            title={`${post.title} | Rubrion Blog`}
            description={post.summary}
          />

          <article className="blog-post">
            <header>
              <h1>{post.title}</h1>
              <p className="post-summary">{post.summary}</p>
            </header>

            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <footer className="post-footer">
              <Link to="/blog" className="back-to-blog">
                Back to Blog List
              </Link>
            </footer>
          </article>
        </>
      )}
    </div>
  );
}

export default BlogPost;
