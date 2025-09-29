# Deployment Guide

This guide covers how to deploy the ToolBox website to various platforms.

## 🚀 Vercel (Recommended)

Vercel is the easiest way to deploy a Next.js application.

### Automatic Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your repository
   - Vercel will automatically detect Next.js and configure the build settings

3. **Deploy**
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

### Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

## 🌐 Netlify

### Automatic Deployment

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Sign in and click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

3. **Deploy**
   - Click "Deploy site"

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `.next` folder to Netlify
   - Or use Netlify CLI: `netlify deploy --prod --dir=.next`

## 🚂 Railway

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project" → "Deploy from GitHub repo"

2. **Configure**
   - Railway will auto-detect Next.js
   - No additional configuration needed

3. **Deploy**
   - Click "Deploy"
   - Your site will be live automatically

## ☁️ AWS Amplify

1. **Connect Repository**
   - Go to [aws.amazon.com/amplify](https://aws.amazon.com/amplify)
   - Sign in to AWS Console
   - Click "New app" → "Host web app"

2. **Build Settings**
   - Repository: Connect your GitHub repo
   - Build command: `npm run build`
   - Base directory: `/`
   - Build output: `.next`

3. **Deploy**
   - Click "Save and deploy"

## 🐳 Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build the Docker image
docker build -t toolbox-website .

# Run the container
docker run -p 3000:3000 toolbox-website
```

## 🔧 Environment Variables

Create a `.env.local` file for local development:

```env
# Optional: Analytics (if you want to add them later)
# NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Optional: Contact form (if you add a backend)
# CONTACT_EMAIL=your-email@example.com
```

## 📊 Performance Optimization

### Build Optimization

1. **Enable Turbopack** (already configured)
   ```bash
   npm run build --turbopack
   ```

2. **Optimize Images**
   - Use Next.js Image component
   - Compress images before upload
   - Use WebP format when possible

3. **Code Splitting**
   - Dynamic imports for heavy components
   - Lazy loading for non-critical features

### Runtime Optimization

1. **Caching**
   - Static assets cached by CDN
   - API responses cached when applicable
   - Browser caching headers configured

2. **Bundle Analysis**
   ```bash
   npm install -g @next/bundle-analyzer
   npm run build
   npm run analyze
   ```

## 🔒 Security Headers

The project includes security headers in `vercel.json`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📈 Monitoring

### Health Checks

Add a health check endpoint:

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'ok', timestamp: new Date().toISOString() })
}
```

### Error Monitoring

Consider adding error monitoring:

1. **Sentry**
   ```bash
   npm install @sentry/nextjs
   ```

2. **LogRocket**
   ```bash
   npm install logrocket
   ```

## 🚀 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      - run: npm run type-check
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./
```

## 🔄 Rollback Strategy

### Vercel
- Use Vercel's deployment history
- One-click rollback to previous versions

### Netlify
- Use Netlify's deploy history
- Rollback through dashboard

### Manual Rollback
```bash
# Revert to previous commit
git revert HEAD
git push origin main
```

## 📋 Pre-deployment Checklist

- [ ] All tests passing
- [ ] Build successful
- [ ] No linting errors
- [ ] TypeScript compilation successful
- [ ] Environment variables configured
- [ ] Domain configured (if custom)
- [ ] SSL certificate valid
- [ ] Performance optimized
- [ ] Security headers configured
- [ ] Monitoring set up

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (18+)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

2. **Deployment Timeouts**
   - Increase build timeout
   - Optimize build process
   - Check for memory issues

3. **Runtime Errors**
   - Check environment variables
   - Verify API endpoints
   - Check browser console for errors

### Support

- Check [Next.js documentation](https://nextjs.org/docs)
- Review [Vercel documentation](https://vercel.com/docs)
- Open an issue on GitHub

---

Happy deploying! 🚀
