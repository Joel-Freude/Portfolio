# Portfolio Website

A modern, animated portfolio website built with Next.js, featuring smooth animations, dynamic navigation, and interactive elements.

## Features

- **Responsive Design**: Fully responsive layout that works on desktop and mobile devices
- **Dynamic Navigation**: Navbar elements automatically change color based on background (white/dark sections)
- **Smooth Animations**: Built with Framer Motion for seamless transitions and effects
- **Custom Typography**: Uses custom fonts (Gued and Vlorentine) for unique branding
- **Interactive Components**:
  - Flip card carousel for tech skills display
  - Animated scrolling lines
  - Social media badges with hover effects
  - Download CV button
  - Mobile-friendly navigation

## Pages

- **Home**: Introduction, skills overview, and approach section
- **About**: Detailed tech skills with interactive carousel (IT Support, Web Designer, Network Administration)
- **School**: Education background and achievements
- **Projects**: Portfolio of completed projects
- **Contact**: Contact information and form

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons, Lucide React
- **Fonts**: Custom Gued and Vlorentine fonts

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/
│   ├── about/
│   │   └── page.tsx          # About page with skills carousel
│   ├── components/
│   │   ├── Navbar.tsx        # Main navigation with dynamic colors
│   │   ├── MobileNavbar.tsx  # Mobile navigation
│   │   ├── ScrollingLines.tsx # Animated scrolling lines
│   │   ├── PolygonBall.tsx   # Animated polygon component
│   │   └── DownloadCVButton.tsx
│   ├── contact/
│   │   └── page.tsx          # Contact page
│   ├── projects/
│   │   └── page.tsx          # Projects page
│   ├── school/
│   │   └── page.tsx          # Education page
│   ├── globals.css           # Global styles and font definitions
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── public/
│   ├── fonts/                # Custom font files
│   ├── images/               # Project images and assets
│   └── data/                 # CV and documents
└── README.md
```

## Customization

### Fonts
The project uses custom fonts defined in `app/globals.css`. To change fonts:
1. Add your font files to `public/fonts/`
2. Update the `@font-face` declarations in `globals.css`
3. Update the CSS variables in `:root`

### Colors
The navbar dynamically changes color based on `.bg-white` sections. To customize:
- Add or remove white background sections in your pages
- The scroll handler in `Navbar.tsx` automatically detects these sections

### Animations
Animation timing and effects are controlled by Framer Motion in individual components. Adjust the `transition` and `animate` props to customize behavior.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - animation library for React
- [React Icons](https://react-icons.github.io/react-icons/) - popular icon libraries

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
