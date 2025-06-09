import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") !== "application/json") {
    return new Response(JSON.stringify({ message: "Content-Type must be application/json" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const data = await request.json();
    const { name, email, message } = data;

    // Basic validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: "Missing required fields (name, email, message)" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return new Response(JSON.stringify({ message: "Invalid data types for fields." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Email validation regex (simple one)
    if (!/\S+@\S+\.\S+/.test(email)) {
      return new Response(JSON.stringify({ message: "Invalid email format." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Process the data (e.g., send an email, save to database)
    // For this portfolio piece, we'll just log it and simulate success.
    console.log("Contact Form Submission:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return new Response(JSON.stringify({ message: "Message received successfully! We'll be in touch." }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(JSON.stringify({ message: "An error occurred while processing your request." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
