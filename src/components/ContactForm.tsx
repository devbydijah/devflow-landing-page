import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface SubmissionStatus {
  submitted: boolean;
  success?: boolean;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<SubmissionStatus>({ submitted: false });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus({ submitted: true, success: false, message: 'Please correct the errors below.' });
      return;
    }

    setStatus({ submitted: true, success: undefined, message: 'Submitting...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ submitted: true, success: true, message: result.message || 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        setStatus({ submitted: true, success: false, message: result.message || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus({ submitted: true, success: false, message: 'An unexpected error occurred. Please try again.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg shadow-xl max-w-xl mx-auto">
      <h3 className="text-2xl font-semibold text-white text-center mb-6">Contact Us</h3>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500`}
          placeholder="Your Name"
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500`}
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
        <textarea
          name="message"
          id="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 bg-gray-700 border ${errors.message ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500`}
          placeholder="How can we help you?"
        ></textarea>
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
      </div>
      <div>
        <button
          type="submit"
          disabled={status.submitted && status.success === undefined}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-50 transition-colors"
        >
          {status.submitted && status.success === undefined ? 'Sending...' : 'Send Message'}
        </button>
      </div>
      {status.submitted && status.message && (
        <p className={`mt-3 text-sm text-center ${status.success ? 'text-green-400' : 'text-red-400'}`}>
          {status.message}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
