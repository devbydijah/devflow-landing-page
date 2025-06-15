# DevAPI Landing Page

> A modern, responsive landing page showcasing advanced frontend development practices with Astro, React, and TypeScript.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://devflow-landing-page.vercel.app)
[![GitHub](https://img.shields.io/badge/View-Code-black?style=for-the-badge&logo=github)](https://github.com/devbydijah/devflow-landing-page)

## 🌟 Overview

This project demonstrates professional frontend development skills through a comprehensive API platform landing page. It showcases modern development practices including dynamic data fetching, elegant animations, robust error handling, and responsive design.

![DevAPI Landing Page Preview](./public/screenshots/devapi-preview.png)

## ✨ Key Features

### 🚀 **Dynamic Data Fetching**

- React components fetch real data from API routes
- Intelligent loading states with skeleton animations
- Graceful error handling with fallback content
- TypeScript interfaces for type safety

### 🎨 **Advanced UI/UX**

- Fade-in animations on scroll using Intersection Observer
- Smooth hover effects and transitions
- Interactive terminal demo with syntax highlighting
- Responsive design optimized for all devices

### 📊 **Real-time Form Handling**

- Enhanced contact form with validation
- Loading states with spinner animations
- Success/error feedback with icons
- Form reset on successful submission

### 🏗️ **Modern Architecture**

- Component-based architecture separating concerns
- Custom React hooks for reusable logic
- API routes for data management
- Clean TypeScript implementation

## 🛠️ Tech Stack

| Technology                                        | Purpose                | Why Used                          |
| ------------------------------------------------- | ---------------------- | --------------------------------- |
| **[Astro](https://astro.build/)**                 | Static Site Generation | Fast performance, optimal loading |
| **[React](https://react.dev/)**                   | Interactive Components | Modern component architecture     |
| **[TypeScript](https://www.typescriptlang.org/)** | Type Safety            | Better developer experience       |
| **[Tailwind CSS](https://tailwindcss.com/)**      | Styling                | Rapid UI development              |
| **[Lucide React](https://lucide.dev/)**           | Icons                  | Beautiful, consistent iconography |

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/devbydijah/devflow-landing-page.git

# Navigate to project directory
cd devflow-landing-page

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see the project in action!

## 📂 Project Architecture

```text
devflow-landing-page/
├── 📁 public/
│   └── favicon.svg
├── 📁 src/
│   ├── 📁 components/          # React & Astro components
│   │   ├── FeatureList.tsx     # Dynamic features with loading states
│   │   ├── PricingList.tsx     # Dynamic pricing with animations
│   │   ├── ContactForm.tsx     # Enhanced form with validation
│   │   ├── FadeInSection.tsx   # Reusable animation wrapper
│   │   └── InteractiveCodeDemo.tsx # Code demo with syntax highlighting
│   ├── 📁 hooks/
│   │   └── useFadeIn.ts        # Custom intersection observer hook
│   ├── 📁 pages/
│   │   ├── index.astro         # Main landing page
│   │   └── 📁 api/             # API routes for data
│   │       ├── features.ts     # Features data endpoint
│   │       ├── pricing.ts      # Pricing data endpoint
│   │       └── contact.ts      # Contact form handler
│   └── 📁 styles/
│       └── global.css          # Animation classes & utilities
├── astro.config.mjs            # Astro + Vercel configuration
└── package.json
```

## 🎯 Development Highlights

### **Dynamic Data Architecture**

Components fetch data from API routes instead of hardcoded content, demonstrating real-world data flow patterns.

### **Advanced Loading States**

Skeleton loaders that match the final UI layout, providing smooth user experience during data fetching.

### **Error Boundaries**

Graceful fallbacks when API calls fail, ensuring the site never breaks for users.

### **Performance Optimizations**

- Client-side hydration only when needed (`client:visible`)
- Intersection Observer for efficient scroll animations
- Optimized bundle size with selective imports

## 🧞 Available Commands

| Command           | Action                                      |
| ----------------- | ------------------------------------------- |
| `npm install`     | Install project dependencies                |
| `npm run dev`     | Start development server (`localhost:4321`) |
| `npm run build`   | Build production site to `./dist/`          |
| `npm run preview` | Preview production build locally            |

## 🚢 Deployment

This project is configured for seamless deployment to Vercel:

1. Push to GitHub repository
2. Connect repository to Vercel
3. Automatic deployments on every push

**Build Settings:**

- Framework: Astro
- Build Command: `npm run build`
- Output Directory: `dist`

## 💡 What Makes This Special

### **Professional Frontend Patterns**

- **Separation of Concerns:** Data fetching separated from UI rendering
- **Reusable Components:** FadeInSection wrapper for consistent animations
- **Type Safety:** Full TypeScript implementation with proper interfaces
- **Modern Hooks:** Custom useFadeIn hook for scroll animations

### **Real-World Ready**

- **Form Validation:** Client-side validation with server-side processing
- **Loading States:** Professional loading animations
- **Error Handling:** Graceful degradation when things go wrong
- **Responsive Design:** Mobile-first approach with Tailwind CSS

### **Performance First**

- **Static Generation:** Fast initial page loads with Astro
- **Selective Hydration:** JavaScript only where needed
- **Optimized Assets:** Modern image formats and efficient bundling

## 📄 License

This project is for portfolio demonstration purposes.

---

### Built with ❤️ to showcase modern frontend development skills
