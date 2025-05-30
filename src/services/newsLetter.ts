import axiosInstance from './axiosInstance';
import { NewsletterEmailSchema } from './validators';

export const subscribeToNewsletter = async (email: string) => {
  try {
    const validationResult = NewsletterEmailSchema.safeParse({ email });

    if (!validationResult.success) {
      throw new Error(
        validationResult.error.errors[0].message || 'Invalid email address'
      );
    }

    const response = await axiosInstance.post('/newsletter/subscribe', {
      email,
    });
    return response.data;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};
