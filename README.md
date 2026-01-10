# Design System Demo

A modern, comprehensive design system demo built with Next.js, React, Tailwind CSS, and Radix UI. This project showcases a complete insurance quote management interface with advanced UI components, form handling, and user experience features.

## 🚀 Features

- **Modern UI Components**: Built with Radix UI primitives and Tailwind CSS
- **Form Management**: Advanced form handling with React Hook Form and Zod validation
- **Command Palette**: Quick navigation and actions with keyboard shortcuts
- **Theme Support**: Dark/light mode with system preference detection
- **Auto-save**: Automatic form data persistence
- **Responsive Design**: Mobile-first, fully responsive layout
- **Type Safety**: Full TypeScript support throughout
- **Accessibility**: WCAG compliant components with proper ARIA attributes

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.0.7](https://nextjs.org/) with App Router (latest secure version)
- **UI Library**: [React 19.0.1](https://react.dev/) (latest secure version)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Charts**: [Recharts](https://recharts.org/)

## 📦 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd design-system-demo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Storybook

This project includes Storybook for component documentation and testing:

```bash
# Run Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

Storybook will be available at [http://localhost:6006](http://localhost:6006).

## 🚢 Deployment

### Deploy on Replit

This project is configured for easy deployment on Replit:

1. **Import to Replit**:
   - Go to [Replit](https://replit.com/)
   - Click "Create Repl"
   - Select "Import from GitHub" or upload the project files

2. **Automatic Setup**:
   - Replit will automatically detect the Node.js project
   - Dependencies will be installed automatically
   - The `.replit` configuration file handles the setup

3. **Run the Project**:
   - Click the "Run" button in Replit
   - The app will start on the port provided by Replit
   - A public URL will be generated automatically

4. **Deploy for Production**:
   - Click "Deploy" in the Replit header
   - Choose deployment type (Autoscale recommended)
   - Configure build command: `npm run build`
   - Configure run command: `npm start`
   - Deploy!

### Environment Variables

If you need to configure environment variables in Replit:
1. Go to the "Secrets" tab in Replit
2. Add your environment variables
3. They will be available as `process.env.VARIABLE_NAME`

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/hello-world)

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📁 Project Structure

```
design-system-demo/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   ├── contexts/          # React contexts
│   └── page.tsx           # Main page
├── components/            # Shared UI components
│   └── ui/                # Radix UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── stories/               # Storybook stories
└── public/                # Static assets
```

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook for static hosting

### Code Style

This project uses:
- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** (if configured) for code formatting

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev/) - Learn React
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn Tailwind CSS
- [Radix UI Documentation](https://www.radix-ui.com/docs) - Learn Radix UI
- [Storybook Documentation](https://storybook.js.org/docs) - Learn Storybook

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for component inspiration
