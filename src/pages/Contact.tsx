import { ChangeEvent, FormEvent, useState } from 'react';

import PageHelmet from '../components/PageHelmet';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate API call
    setTimeout(() => {
      // Mock successful submission
      console.log('Form submitted:', formData);
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <div className="contact-page">
      <PageHelmet routeKey="CONTACT" />

      <h1>Contact Us</h1>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            We'd love to hear from you. Please fill out the form or use the
            contact information below.
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <strong>Email:</strong>
              <p>contact@rubrion.com</p>
            </div>

            <div className="contact-item">
              <strong>Phone:</strong>
              <p>+1 (555) 123-4567</p>
            </div>

            <div className="contact-item">
              <strong>Address:</strong>
              <p>123 Web Dev Street, Tech City, 12345</p>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          {formStatus === 'success' ? (
            <div className="success-message">
              <h2>Thank you for your message!</h2>
              <p>We'll get back to you as soon as possible.</p>
              <button
                onClick={() => setFormStatus('idle')}
                className="send-another-btn"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="submit-button"
              >
                {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
