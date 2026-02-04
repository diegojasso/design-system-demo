# Agent Portal Demo

A modern Agent Portal demo built with Next.js, React, Tailwind CSS, and Radix UI. This project showcases a complete insurance quote management interface with advanced UI components, form handling, and user experience features.

## Features

- **Modern UI Components**: Built with Radix UI primitives and Tailwind CSS
- **Form Management**: Advanced form handling with React Hook Form and Zod validation
- **Command Palette**: Quick navigation and actions with keyboard shortcuts
- **Theme Support**: Dark/light mode with system preference detection
- **Auto-save**: Automatic form data persistence
- **Responsive Design**: Mobile-first, fully responsive layout
- **Type Safety**: Full TypeScript support throughout
- **Accessibility**: WCAG compliant components with proper ARIA attributes

## Tech Stack

- **Framework**: [Next.js 16.0.7](https://nextjs.org/) with App Router (latest secure version)
- **UI Library**: [React 19.0.1](https://react.dev/) (latest secure version)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Charts**: [Recharts](https://recharts.org/)

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- Yarn 4.x (workspaces enabled)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd design-system-demo
```

2. Install dependencies:
```bash
yarn install
```

3. Run the development server:
```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Storybook

This project includes Storybook for component documentation and testing:

```bash
# Run Storybook
yarn storybook

# Build Storybook
yarn build-storybook
```

Storybook will be available at [http://localhost:6006](http://localhost:6006).

## Project Structure

```
design-system-demo/
├── apps/
│   └── portal/             # Next.js App Router host app
│       ├── app/            # Route binding (Server Components)
│       ├── src/
│       │   ├── app/        # App shell and providers
│       │   ├── screens/    # UX-owned screen components
│       │   ├── server/     # Server loaders/actions/adapters
│       │   └── shared/     # Shared utilities
│       └── public/         # Static assets
├── packages/
│   ├── ui/                 # Design system primitives + Storybook
│   ├── analytics/          # Analytics SDK wrapper (stub)
│   └── api-client/         # API client contracts (stub)
└── docs/
    └── sdd/                # Software design docs
```

## Development

### Available Scripts

- `yarn dev` - Start the portal app (Next.js)
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn test` - Unit tests
- `yarn test:storybook` - Storybook tests
- `yarn storybook` - Start Storybook
- `yarn build-storybook` - Build Storybook for static hosting

### Code Style

This project uses:
- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** (if configured) for code formatting

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev/) - Learn React
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn Tailwind CSS
- [Radix UI Documentation](https://www.radix-ui.com/docs) - Learn Radix UI
- [Storybook Documentation](https://storybook.js.org/docs) - Learn Storybook

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for component inspiration
