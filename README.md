# Business Model Canvas

<!-- Shields.io badges -->

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-Package_Manager-000000?style=for-the-badge&logo=bun&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-Components-161618?style=for-the-badge&logo=radix-ui&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A modern, interactive Business Model Canvas dashboard built with Next.js, TypeScript, and Tailwind CSS. This application provides a comprehensive view of your business model across 9 key areas, with both grid and tabbed view modes.

## 🚀 Features

- **Interactive Business Canvas**: Visualize all 9 sections of the business model canvas
- **Dual View Modes**: Switch between grid view and tabbed view for different perspectives
- **Responsive Design**: Optimized for desktop and mobile devices
- **Markdown Content**: Business sections are stored as markdown files for easy editing
- **Modern UI**: Built with Shadcn/ui components and Tailwind CSS
- **Fast Loading**: Optimized with Next.js 15 and Turbopack
- **Print Support**: Export your canvas to PDF for presentations

## 📋 Business Canvas Sections

1. **Value Proposition** - Your unique value and solutions
2. **Customer Segments** - Target audience and market segments
3. **Channels** - How you reach and deliver to customers
4. **Customer Relationships** - How you interact with customers
5. **Revenue Streams** - How you generate income
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
- **PDF Generation**: PDFMake for export functionality

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/business-model-canvas.git
cd business-model-canvas
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

## 📝 How to Use

### Setting Up Your Business Model

1. **Content Configuration**: Navigate to the `areas/` directory where you'll find 9 markdown files, each corresponding to a section of the Business Model Canvas.

2. **Customize Your Content**: Edit each markdown file to reflect your business model:

   - Each file contains structured content with headers and sections
   - Use standard markdown formatting for rich text display
   - The content you add will automatically appear in both grid and tabbed views

3. **Content Structure**: Each area file should contain:

   - Clear headings and subheadings
   - Bullet points for easy scanning
   - Relevant business information specific to that canvas section
   - Any additional context or details that support your business model

4. **Real-time Updates**: Changes to the markdown files will be reflected immediately in development mode

### Viewing Your Canvas

- **Grid View**: See all 9 sections at once in a traditional canvas layout
- **Tabbed View**: Navigate through each section individually for detailed review
- **Print View**: Access the print-friendly version at `/print` for PDF export

### Customization

- **Styling**: Modify the Tailwind classes in components to match your brand
- **Layout**: Adjust the grid layout in `components/canvas-grid.tsx`
- **Content Structure**: Update the data structure in `lib/canvas-data.ts` if needed

## 📁 Project Structure

```
business-model-canvas/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── print/             # Print view page
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
│   ├── canvas-tabs.tsx
│   └── canvas-print-view.tsx
├── lib/                  # Utility functions and data
│   ├── canvas-data.ts    # Data fetching logic
│   ├── pdf-utils.ts      # PDF generation utilities
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## 🎨 Customization

### Updating Business Content

Edit the markdown files in the `areas/` directory to update your business model content. The application will automatically reflect changes during development.

### Styling

The application uses Tailwind CSS for styling. Customize the design by:

- Modifying the Tailwind configuration
- Updating component styles in the respective `.tsx` files
- Adding custom CSS in `app/globals.css`

### Adding New Features

- **API Routes**: Add new endpoints in `app/api/`
- **Components**: Create new components in `components/`
- **Utilities**: Add helper functions in `lib/`

## 📦 Available Scripts

- `bun dev` - Start development server with Turbopack
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint

## 🖨️ Print & Export

Access the print-friendly version at `/print` to:

- Generate PDF exports of your business model canvas
- Create presentation-ready layouts
- Share your business model with stakeholders

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🏢 About Flying Web Solutions

**Website**: [www.flyingweb.ie](https://www.flyingweb.ie)

Flying Web Solutions specializes in creating AI-powered web solutions, custom automations, and comprehensive digital strategies for businesses looking to scale their online presence and automate their workflows.

## 👨‍💻 Development

Built with ❤️ by [Davide Del Gatto](https://github.com/flyingwebie) for Flying Web Solutions.

---

_Last updated: January 2025_
