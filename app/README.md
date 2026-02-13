# Animated Portfolio

A modern, animated personal portfolio website built with React, TypeScript, and cutting-edge web technologies. Features smooth scroll-triggered animations, 3D elements, and a sleek dark-themed design.

## Features

- **Smooth Animations** - GSAP-powered scroll-triggered animations with parallax effects
- **3D Graphics** - Interactive 3D elements using Three.js and React Three Fiber
- **Modern UI Components** - Built with Radix UI primitives and shadcn/ui
- **Responsive Design** - Fully responsive layout with Tailwind CSS
- **Performance Optimized** - Fast builds with Vite and React 19

## Sections

| Section | Description |
|---------|-------------|
| Hero | Animated introduction with floating particles and social links |
| About | Personal introduction with stats and background |
| Experience | Professional work history timeline |
| Projects | Showcase of development projects |
| Pushpak Club | Club/organization involvement |
| Skills | Technical skills with visual indicators |
| Certifications | Professional certifications display |
| Achievements | Awards and accomplishments |
| Gallery | Photo gallery section |
| CTA | Call-to-action contact section |

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + tailwindcss-animate
- **Animations:** GSAP + Framer Motion
- **3D Graphics:** Three.js + React Three Fiber + Drei
- **UI Components:** Radix UI + shadcn/ui
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Siddhanth2509/Mine-Portfolio.git

# Navigate to the app directory
cd Mine-Portfolio/app

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
app/
├── public/           # Static assets
│   ├── gallery/      # Gallery images
│   └── pushpak/      # Pushpak club assets
├── src/
│   ├── components/   # Reusable components
│   │   ├── ui/       # shadcn/ui components
│   │   └── FloatingParticles.tsx
│   ├── sections/     # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   └── ...
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   ├── App.tsx       # Main app component
│   └── main.tsx      # Entry point
└── package.json
```

## License

This project is licensed under the terms specified in the LICENSE file.
