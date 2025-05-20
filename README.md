# DevAPI Landing Page

This project is a modern, developer-centric landing page for a fictional API platform called DevAPI. It showcases the platform's features and encourages developers to get started.

## ✨ Features

- **Responsive Navigation:** Fixed navbar with mobile hamburger menu and quick links.
- **Hero Section:** Clear value proposition, interactive terminal demo, and CTAs.
- **Features Section:** Interactive cards highlighting key benefits (Performance, Security, REST/GraphQL).
- **API Code Examples:** Tabbed interface with syntax-highlighted code snippets and copy-to-clipboard functionality.
- **Documentation Overview:** Links to Getting Started, API Reference, and CLI Tools.
- **Pricing Tiers:** Clear comparison of available plans.
- **Blog Previews:** Showcase of latest articles.
- **Call to Action:** Encourages users to sign up or explore further.
- **Footer:** Standard company and navigation links.

## 🛠️ Tech Stack

- **[Astro](https://astro.build/):** For page composition, routing, and static site generation.
- **[React](https://react.dev/) (with TypeScript):** For interactive UI components.
- **[Tailwind CSS](https://tailwindcss.com/):** For all styling.
- **[Lucide React](https://lucide.dev/):** For icons.

## 🚀 Project Structure

Key directories and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/         # Static assets like images
│   ├── components/     # Reusable Astro and React components
│   ├── layouts/        # Base layout for pages
│   ├── pages/          # Astro pages (routes)
│   └── styles/         # Global styles
├── astro.config.mjs  # Astro configuration
├── package.json      # Project dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                        |
| :---------------- | :-------------------------------------------- |
| `npm install`     | Installs dependencies                         |
| `npm run dev`     | Starts local dev server at `localhost:4321`   |
| `npm run build`   | Builds your production site to `./dist/`      |
| `npm run preview` | Previews your build locally, before deploying |

## 📄 License

This project is for demonstration purposes.
