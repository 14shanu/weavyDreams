# Weaving Dreams - Event Management Website

Professional event planning and management website built with Next.js 16, React 19, and TypeScript.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## 🛠️ Tech Stack

- **Framework:** Next.js 16.1.3
- **React:** 19
- **TypeScript:** 5+
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod
- **Email:** Resend
- **Icons:** Lucide React

## 📁 Project Structure

```
showman-site/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── data/             # JSON configuration files
│   ├── lib/              # Utilities, types, API functions
│   └── ui/               # Components
│       ├── animations/   # Framer Motion components
│       ├── cart/         # Cart components
│       ├── components/   # Shared components
│       ├── elements/     # UI elements (Button, Input, etc.)
│       ├── layout/       # Layout components
│       ├── quiz/         # Quiz components
│       └── sections/     # Page sections
├── public/
│   └── images/           # Static images
└── ...config files
```

## 🎨 Configuration

All content is managed through JSON files in `src/data/`:

- `site-config.json` - Site settings, contact info, currencies
- `events.json` - Event types (weddings, corporate, etc.)
- `services.json` - Services (photography, catering, etc.)
- `packages.json` - Package offerings
- `quiz.json` - Quiz questions and logic
- `navigation.json` - Menu and footer links

See [CONTENT_MANAGEMENT_GUIDE.md](../CONTENT_MANAGEMENT_GUIDE.md) for details.

## 🔧 Environment Variables

Create `.env.local` file:

```bash
# Email Service
RESEND_API_KEY=your_api_key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_ga_id
```

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npm run type-check   # Check TypeScript types
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

See [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) for detailed instructions.

### Other Platforms

- Netlify
- AWS Amplify
- Custom server with Node.js

## 🎯 Features

### Core Features
- ✅ 5 Event Types (Weddings, Corporate, Private, Exhibitions, Proposals)
- ✅ 6 Universal Services
- ✅ 15 Pre-built Packages
- ✅ Interactive Quiz System
- ✅ Shopping Cart
- ✅ Quote Request Forms
- ✅ Portfolio Gallery
- ✅ Multi-currency Support

### Technical Features
- ✅ Server-side Rendering (SSR)
- ✅ Static Site Generation (SSG)
- ✅ Image Optimization
- ✅ SEO Optimized
- ✅ Fully Responsive
- ✅ Accessible (WCAG AA)
- ✅ Performance Optimized
- ✅ Type-safe with TypeScript

## 📊 Performance

Target metrics:
- Lighthouse Score: > 90
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

## ♿ Accessibility

- WCAG 2.1 Level AA compliant
- Keyboard navigation
- Screen reader support
- Color contrast ratios
- Skip navigation link

See [ACCESSIBILITY_GUIDE.md](../ACCESSIBILITY_GUIDE.md) for details.

## 🧪 Testing

```bash
# Run Lighthouse
npm run build
npm run start
# Open Chrome DevTools > Lighthouse

# Manual testing
- Cross-browser (Chrome, Firefox, Safari, Edge)
- Mobile devices (iOS, Android)
- Keyboard navigation
- Screen readers
```

See [TESTING_CHECKLIST.md](../TESTING_CHECKLIST.md) for complete checklist.

## 📚 Documentation

- [Quick Start](../QUICK_START.md)
- [Project Summary](../PROJECT_SUMMARY.md)
- [Technical Specification](../TECHNICAL_SPECIFICATION.md)
- [Implementation Roadmap](../IMPLEMENTATION_ROADMAP.md)
- [Content Management Guide](../CONTENT_MANAGEMENT_GUIDE.md)
- [Deployment Guide](../DEPLOYMENT_GUIDE.md)
- [Performance Guide](../PERFORMANCE_GUIDE.md)
- [Accessibility Guide](../ACCESSIBILITY_GUIDE.md)
- [Testing Checklist](../TESTING_CHECKLIST.md)

## 🔄 Content Updates

To update content:

1. Edit JSON files in `src/data/`
2. Save changes
3. Refresh browser (dev) or redeploy (production)

No code changes required!

## 🐛 Troubleshooting

### Build Errors
```bash
# Clean install
rm -rf node_modules .next
npm install
npm run build
```

### Type Errors
```bash
# Check types
npm run type-check
```

### Images Not Loading
- Check file paths start with `/images/`
- Verify files exist in `public/images/`
- Check file names match exactly (case-sensitive)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📄 License

Proprietary - All rights reserved

## 📞 Support

For technical support:
- Check documentation first
- Review troubleshooting guides
- Contact development team

## 🎉 Credits

Built with ❤️ using:
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

**Version:** 1.0  
**Last Updated:** January 2025  
**Status:** Production Ready 🚀
