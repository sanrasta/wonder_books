# WonderTales

AI-powered personalized children's book platform. Turn photos into beautifully illustrated hardbound storybooks.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP with ScrollTrigger
- **Smooth Scroll**: Lenis
- **Fonts**: Fredoka, Quicksand (Google Fonts)
- **Deployment**: Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run fresh dev server (kills existing processes first)
npm run dev:fresh

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Endpoints

The platform serves different audiences through dedicated landing pages, each with unique theming, copy, and imagery.

| Route | Audience | Description |
|-------|----------|-------------|
| `/` | Children/Parents | Kids adventure books - the main product |
| `/valentines` | Couples | Romantic love story keepsakes |
| `/worldcup` | Football fans | World Cup champion stories |
| `/birthday` | Birthday celebrations | Personalized birthday adventure books |
| `/graduation` | Graduates/Families | Academic journey keepsakes |
| `/newbaby` | New parents | Baby welcome and sibling stories |
| `/anniversary` | Couples | Anniversary milestone keepsakes |
| `/dogtraining` | Dog owners | Personalized dog adventure storybooks |

Each endpoint includes:
- Theme-specific navbar and footer
- MagicMirror hero section (before/after slider)
- MagicPreviewCTA (lead capture with free cover preview)
- HowItWorks process section (5-step scroll animation)
- Shipping section with pricing options
- Book preview gallery

## Project Structure

```
app/
  page.tsx              # Kids endpoint (/)
  valentines/page.tsx   # Valentine's endpoint
  worldcup/page.tsx     # World Cup endpoint
  birthday/page.tsx     # Birthday endpoint
  graduation/page.tsx   # Graduation endpoint
  newbaby/page.tsx      # New baby endpoint
  anniversary/page.tsx  # Anniversary endpoint
  dogtraining/page.tsx  # Dog training/pet endpoint

components/
  MagicMirror.tsx       # Theme-adaptive hero slider
  MagicPreviewCTA.tsx   # Theme-adaptive lead capture
  SmoothScroll.tsx      # Lenis smooth scroll provider
  Navbar.tsx            # Main site navbar
  Footer.tsx            # Main site footer
  
  process/              # How It Works section
    HowItWorks.tsx
    themes.ts
    types.ts
    index.ts

  valentines/           # Valentine's specific components
  worldcup/             # World Cup specific components
  birthday/             # Birthday specific components
  graduation/           # Graduation specific components
  newbaby/              # New baby specific components
  anniversary/          # Anniversary specific components
  dogtraining/          # Dog training/pet specific components
```

## Adding New Endpoints

1. Add theme variant to type definitions:
   - `components/MagicMirror.tsx`
   - `components/MagicPreviewCTA.tsx`
   - `components/process/types.ts`

2. Add theme configuration:
   - `components/process/themes.ts`

3. Create endpoint-specific components:
   - `components/[theme]/[Theme]Navbar.tsx`
   - `components/[theme]/[Theme]Shipping.tsx`
   - `components/[theme]/[Theme]BookPreview.tsx`
   - `components/[theme]/[Theme]Footer.tsx`

4. Create page:
   - `app/[theme]/page.tsx`

## Deployment

Deploy to Vercel:

```bash
npm run build
vercel deploy
```

Or connect the GitHub repository to Vercel for automatic deployments.

## License

Private - All rights reserved.
