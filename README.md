# Wedding Invitation - Peter & Kristina

An elegant, responsive wedding invitation website built with Next.js and Tailwind CSS.

## Features

- 🎨 Beautiful, minimalist design matching the original invitation
- 📱 Fully responsive layout for all devices
- 📝 Interactive RSVP form
- 🖼️ Optimized images with Next.js Image component
- 🎯 SEO optimized with proper metadata
- ⚡ Fast loading with Next.js optimizations

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd wedding-invitation-gabriela
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Option 1: Deploy with Vercel CLI

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

3. Follow the prompts to connect your project.

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect Next.js and deploy

### Option 3: Deploy with GitHub Integration

1. Connect your GitHub account to Vercel
2. Select your repository
3. Vercel will automatically deploy on every push to main branch

## Customization

### Update Content

- Edit `app/page.tsx` to change text content
- Replace image URLs with your own photos
- Update contact information and venue details

### Styling

- Modify `tailwind.config.js` for theme customization
- Edit `app/globals.css` for custom styles
- Update colors, fonts, and spacing as needed

### Form Handling

The RSVP form currently logs data to console. To handle form submissions:

1. Add a backend API route in `app/api/rsvp/route.ts`
2. Update the `handleSubmit` function in `app/page.tsx`
3. Connect to your preferred database or email service

## Project Structure

```
wedding-invitation-gabriela/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main wedding invitation page
│   └── globals.css         # Global styles and Tailwind imports
├── public/                 # Static assets (images, etc.)
├── tailwind.config.js      # Tailwind CSS configuration
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Performance

- Images are optimized with Next.js Image component
- Fonts are loaded with `next/font/google` for optimal performance
- CSS is purged in production builds
- Static generation for fast loading

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and for personal use.

## Support

For questions or issues, please contact the development team.
