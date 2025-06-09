import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$0',
      priceSuffix: '/month',
      features: [
        '1,000 API calls/month',
        'Basic rate limiting',
        'Community support',
        'Basic analytics',
      ],
      buttonText: 'Get Started',
      ctaLink: '#', // Added for consistency, can be used for actual links
      bgColor: 'bg-gray-800',
      textColor: 'text-white',
      buttonColor: 'bg-gray-700 hover:bg-gray-600', // Removed transition classes, handle in component if needed
      borderColor: 'border-gray-700',
      recommended: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$49',
      priceSuffix: '/month',
      features: [
        '100,000 API calls/month',
        'Advanced rate limiting',
        'Priority support',
        'Advanced analytics',
        'Custom domains',
      ],
      buttonText: 'Get Started',
      ctaLink: '#',
      bgColor: 'bg-gray-800', // Base background
      textColor: 'text-white',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      borderColor: 'border-blue-600', // Highlight border for recommended
      recommended: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$199',
      priceSuffix: '/month',
      features: [
        'Unlimited API calls',
        'Custom rate limiting',
        '24/7 dedicated support',
        'Advanced analytics',
        'Custom domains',
        'SLA guarantee',
      ],
      buttonText: 'Get Started',
      ctaLink: '#',
      bgColor: 'bg-gray-800',
      textColor: 'text-white',
      buttonColor: 'bg-gray-700 hover:bg-gray-600',
      borderColor: 'border-gray-700',
      recommended: false,
    },
  ];

  return new Response(JSON.stringify(plans), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
