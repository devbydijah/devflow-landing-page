import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const features = [
    { 
      id: "1", 
      icon: "Zap", // Corresponds to Lucide icon name
      title: "Lightning Fast", 
      description: "10ms response times globally. Our infrastructure is optimized for speed so your APIs are always responsive." 
    },
    { 
      id: "2", 
      icon: "ShieldCheck", 
      title: "Built-in Security", 
      description: "Industry-standard authentication and authorization with JWT, OAuth, and API keys out of the box."
    },
    { 
      id: "3", 
      icon: "Network", 
      title: "RESTful & GraphQL", 
      description: "Support for both RESTful APIs and GraphQL in one unified platform. No compromises." 
    }
  ];

  return new Response(JSON.stringify(features), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
