# Replit Deployment Guide

This guide will help you deploy the Design System Demo on Replit.

## Quick Start

1. **Import to Replit**
   - Go to [Replit](https://replit.com/)
   - Click "Create Repl"
   - Select "Import from GitHub" or upload project files
   - Replit will automatically detect the Node.js project

2. **Automatic Setup**
   - Dependencies will be installed automatically via `package.json`
   - The `.replit` configuration file handles the environment setup
   - Node.js 20.x will be installed via `replit.nix`

3. **Run the Project**
   - Click the "Run" button in Replit
   - The app will start automatically
   - A public URL will be generated (e.g., `yourproject.replit.app`)

## Configuration Files

### `.replit`
This file configures:
- Language: Node.js
- Run command: `npm run dev`
- Environment variables (PORT is set automatically by Replit)
- Deployment settings

### `replit.nix`
This file specifies:
- Node.js 20.x
- npm package manager
- TypeScript compiler

### `next.config.ts`
Configured with:
- Standalone output mode for optimized deployment
- React strict mode enabled
- Image optimization settings

## Port Configuration

Replit automatically provides a `PORT` environment variable. Next.js will use this automatically in development and production modes. No additional configuration is needed.

## Deployment

### Development Mode
- Click "Run" - uses `npm run dev`
- Hot reload enabled
- Accessible via Replit's public URL

### Production Deployment
1. Click "Deploy" in the Replit header
2. Choose deployment type:
   - **Autoscale** (recommended): Automatically scales based on traffic
   - **Always On**: Keeps the app running 24/7
3. Configure:
   - Build command: `npm run build`
   - Run command: `npm start`
   - Health check path: `/` (configured in `.replit`)
4. Deploy!

## Environment Variables

If you need to add environment variables:

1. Go to the "Secrets" tab in Replit
2. Click "Add Secret"
3. Enter key-value pairs
4. Access in code via `process.env.VARIABLE_NAME`

Example secrets you might need:
- `NODE_ENV=production`
- `NEXT_PUBLIC_API_URL=your-api-url`
- Any other API keys or configuration

## Troubleshooting

### Build Fails
- Check the console for error messages
- Ensure all dependencies are listed in `package.json`
- Verify Node.js version compatibility

### Port Already in Use
- Replit handles port assignment automatically
- No manual port configuration needed
- If issues persist, check `.replit` configuration

### Dependencies Not Installing
- Check `package.json` for correct dependency versions
- Verify `replit.nix` has correct Node.js version
- Try running `npm install` manually in the console

### App Not Starting
- Check console logs for errors
- Verify `next.config.ts` is valid
- Ensure `package.json` scripts are correct

## Performance Tips

1. **Use Standalone Mode**: Already configured in `next.config.ts`
2. **Optimize Images**: Use Next.js Image component
3. **Enable Caching**: Configure appropriate cache headers
4. **Monitor Bundle Size**: Keep dependencies minimal

## Resources

- [Replit Documentation](https://docs.replit.com/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Replit Deployments](https://docs.replit.com/hosting/deployments)

## Support

If you encounter issues:
1. Check the Replit console for error messages
2. Review the configuration files (`.replit`, `replit.nix`, `next.config.ts`)
3. Verify all dependencies are compatible
4. Check Next.js and React version compatibility
