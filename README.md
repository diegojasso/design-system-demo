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

### Yarn 4.6.0 (Corepack)

This repo pins Yarn via the `packageManager` field in `package.json` (currently `yarn@4.6.0`). If your terminal is using Yarn 1.x, enable Corepack so the correct Yarn version is used.

```bash
corepack enable
corepack prepare yarn@4.6.0 --activate
yarn -v  # should print 4.6.0
```

If `yarn -v` still prints 1.x (shadowed by a global install), run Yarn through Corepack:

```bash
corepack yarn -v
corepack yarn install
```

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd novo-quote-website
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
novo-quote-website/
├── apps/
│   └── agent-portal/       # Next.js App Router app
│       ├── app/            # Next.js route entrypoints (mostly re-export shims)
│       ├── src/
│       │   ├── app/        # App shell, providers, quote context, internal routes (source)
│       │   ├── server/     # Server loaders/actions/adapters (source)
│       │   ├── features/   # UX-owned screen/components (designer-owned)
│       │   └── shared/     # Shared utilities + view model mapping
│       └── public/         # Static assets
├── packages/
│   ├── ui/                 # Design system primitives + Storybook
│   ├── analytics/          # Analytics SDK wrapper (stub)
│   └── api-client/         # API client contracts (stub)
```

### `apps/agent-portal/app` vs `apps/agent-portal/src/app`

This repo uses a small **re-export shim** pattern:

- `apps/agent-portal/app/**` is the **actual Next.js App Router directory**.
- `apps/agent-portal/src/app/**` contains the **real implementation**.

For example:

```ts
// apps/agent-portal/app/initial-info/page.tsx
export { default } from "../../src/app/initial-info/page";
```

### Quote draft state (`quote-context`)

`apps/agent-portal/src/app/quote-context.tsx` is the client-side quote draft store:

- Holds `quoteData` in React Context for all steps
- Persists drafts to `localStorage`
- Implements one-time prefill (`prefillFromApplication`) and step navigation

## Development

### Monorepo Notes

- Yarn uses `node-modules` linker (see `.yarnrc.yml`).
- App aliases (e.g., `@/pages/*`) are defined in `apps/portal/tsconfig.json`.
- Storybook tests are run via `yarn test:storybook` and use the UI package config.

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
