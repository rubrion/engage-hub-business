import axiosInstance from './axiosInstance';

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
}

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await axiosInstance.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

export const fetchBlogPostById = async (id: string): Promise<BlogPost> => {
  try {
    const response = await axiosInstance.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog post with ID ${id}:`, error);
    throw error;
  }
};
