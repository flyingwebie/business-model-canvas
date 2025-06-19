# Business Model Canvas

A modern, interactive Business Model Canvas dashboard built with Next.js, TypeScript, and Tailwind CSS. This application provides a comprehensive view of Flying Web Solutions' business model across 9 key areas, with both grid and tabbed view modes.

## 🚀 Features

- **Interactive Business Canvas**: Visualize all 9 sections of the business model canvas
- **Dual View Modes**: Switch between grid view and tabbed view for different perspectives
- **Responsive Design**: Optimized for desktop and mobile devices
- **Markdown Content**: Business sections are stored as markdown files for easy editing
- **Modern UI**: Built with Shadcn/ui components and Tailwind CSS
- **Fast Loading**: Optimized with Next.js 15 and Turbopack

## 📋 Business Canvas Sections

1. **Value Proposition** - Our unique value and solutions
2. **Customer Segments** - Target audience and market segments
3. **Channels** - How we reach and deliver to customers
4. **Customer Relationships** - How we interact with customers
5. **Revenue Streams** - How we generate income
6. **Key Resources** - Essential assets and resources
7. **Key Activities** - Core business activities
8. **Key Partnerships** - Strategic partnerships and alliances
9. **Cost Structure** - Main costs and expenses

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives with Shadcn/ui
- **Package Manager**: Bun
- **Icons**: Lucide React
- **Markdown**: React Markdown with GitHub Flavored Markdown

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd flyingweb-business-canvas
```

2. Install dependencies:

```bash
bun install
```

3. Run the development server:

```bash
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
flyingweb-business-canvas/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── areas/                 # Business canvas content (markdown files)
│   ├── 1. value_proposition.md
│   ├── 2. customer_segments.md
│   └── ... (9 sections total)
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── business-canvas-dashboard.tsx
│   ├── canvas-grid.tsx
│   └── canvas-tabs.tsx
├── lib/                  # Utility functions and data
│   ├── canvas-data.ts    # Data fetching logic
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## 🎨 Customization

### Updating Business Content

Edit the markdown files in the `areas/` directory to update the business model content. The application will automatically reflect changes during development.

### Styling

The application uses Tailwind CSS for styling. Customize the design by:

- Modifying the Tailwind configuration
- Updating component styles in the respective `.tsx` files
- Adding custom CSS in `app/globals.css`

## 📦 Available Scripts

- `bun dev` - Start development server with Turbopack
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint

## 🏢 About Flying Web Solutions

**Website**: [www.flyingweb.ie](https://www.flyingweb.ie)

Flying Web Solutions specializes in creating AI-powered web solutions, custom automations, and comprehensive digital strategies for businesses looking to scale their online presence and automate their workflows.

## 👨‍💻 Development

Built with ❤️ by [Davide Del Gatto](https://github.com/flyingwebie) for Flying Web Solutions.

---

_Last updated: June 2025_
