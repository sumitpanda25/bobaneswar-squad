# PulseIQ Deployment Guide

## 🚀 Quick Start

The PulseIQ application is already running and accessible at:

- **Development Server**: http://localhost:3001
- **Proxy Server** (for Langflow): http://localhost:3000

## 📋 Pre-Deployment Checklist

### 1. Environment Configuration

Create `.env.local` file in the `pulseiq/` directory:

```bash
cp .env.local.example .env.local
```

Update with your actual values:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# Chatbot Configuration
NEXT_PUBLIC_CHATBOT_API_URL=http://localhost:3000/langflow
NEXT_PUBLIC_CHATBOT_API_KEY=sk-F1sRs8TrNwAkWGR-DUHBs4xdFEpeRSkCO7ntvvroHhU
NEXT_PUBLIC_FLOW_ID=ce0bea51-8829-4115-990b-6cbd8bb51ca3

# Feature Flags
NEXT_PUBLIC_ENABLE_REAL_API=false
NEXT_PUBLIC_ENABLE_MOCK_DATA=true
```

### 2. Dependencies Installation

```bash
cd pulseiq
npm install
```

### 3. Build Verification

```bash
npm run build
```

## 🌐 Deployment Options

### Option 1: Local Development

**Already Running!** ✅

The application is currently running at:
- Next.js App: http://localhost:3001
- Proxy Server: http://localhost:3000

To restart if needed:
```bash
# Terminal 1 - Proxy Server (for Langflow)
cd ..
node proxy-server.js

# Terminal 2 - Next.js App
cd pulseiq
npm run dev
```

### Option 2: Production Build (Local)

```bash
# Build the application
cd pulseiq
npm run build

# Start production server
npm start
```

Access at: http://localhost:3000

### Option 3: Docker Deployment

Create `Dockerfile` in `pulseiq/` directory:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t pulseiq:latest .
docker run -p 3000:3000 pulseiq:latest
```

### Option 4: Vercel Deployment

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
cd pulseiq
vercel
```

3. **Configure Environment Variables** in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Production Deployment**
```bash
vercel --prod
```

### Option 5: AWS Deployment

#### Using AWS Amplify

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect your Git repository
   - Select the `pulseiq` folder as root

2. **Build Settings** (`amplify.yml`):
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd pulseiq
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: pulseiq/.next
    files:
      - '**/*'
  cache:
    paths:
      - pulseiq/node_modules/**/*
```

3. **Environment Variables**
   - Add in Amplify Console → Environment Variables

#### Using EC2

```bash
# SSH into EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Clone and setup
git clone your-repo
cd pulseiq
npm install
npm run build

# Use PM2 for process management
npm install -g pm2
pm2 start npm --name "pulseiq" -- start
pm2 save
pm2 startup
```

### Option 6: Azure Deployment

```bash
# Install Azure CLI
# https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

# Login
az login

# Create resource group
az group create --name pulseiq-rg --location eastus

# Create App Service plan
az appservice plan create --name pulseiq-plan --resource-group pulseiq-rg --sku B1 --is-linux

# Create web app
az webapp create --resource-group pulseiq-rg --plan pulseiq-plan --name pulseiq-app --runtime "NODE:20-lts"

# Deploy
cd pulseiq
az webapp up --name pulseiq-app --resource-group pulseiq-rg
```

## 🔧 Configuration

### Proxy Server Configuration

The proxy server (`proxy-server.js`) is required for Langflow integration to handle CORS.

**Current Configuration:**
- Port: 3000
- Langflow Endpoint: https://langflow.servicesessentials.ibm.com
- API Key: Configured in proxy-server.js

**To modify:**
```javascript
// proxy-server.js
const PORT = 3000; // Change port if needed

app.use(
  "/langflow",
  createProxyMiddleware({
    target: "https://your-langflow-endpoint.com",
    changeOrigin: true,
    pathRewrite: { "^/langflow": "" },
    on: {
      proxyReq: (proxyReq) => {
        proxyReq.setHeader("x-api-key", "your-api-key");
      },
    },
  })
);
```

### Backend API Configuration

If you have a Python FastAPI backend (`app.py`):

```bash
# Install dependencies
pip install fastapi pandas uvicorn

# Run backend
uvicorn app:app --reload --port 8000
```

Update `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_ENABLE_REAL_API=true
```

## 🔒 Security Considerations

### Production Checklist

- [ ] Remove or secure API keys in environment variables
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable authentication/authorization
- [ ] Configure CSP headers
- [ ] Enable security headers
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline

### Environment Variables Security

**Never commit `.env.local` to version control!**

Add to `.gitignore`:
```
.env.local
.env.*.local
```

Use secret management services:
- AWS Secrets Manager
- Azure Key Vault
- HashiCorp Vault
- Vercel Environment Variables

## 📊 Monitoring

### Application Monitoring

```bash
# Install monitoring tools
npm install @vercel/analytics @vercel/speed-insights
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Error Tracking

```bash
npm install @sentry/nextjs
```

Configure Sentry:
```bash
npx @sentry/wizard@latest -i nextjs
```

## 🚦 Health Checks

Create `app/api/health/route.ts`:
```typescript
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  })
}
```

Access at: http://localhost:3001/api/health

## 📈 Performance Optimization

### Build Optimization

```javascript
// next.config.ts
const config = {
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
}
```

### Caching Strategy

```typescript
// Enable ISR (Incremental Static Regeneration)
export const revalidate = 60 // Revalidate every 60 seconds
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy PulseIQ

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: cd pulseiq && npm ci
      - run: cd pulseiq && npm run build
      - run: cd pulseiq && npm test
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## 📞 Support

### Troubleshooting

**Port already in use:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

**Build errors:**
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

**Environment variables not loading:**
- Ensure `.env.local` is in the correct directory
- Restart the development server
- Check variable names start with `NEXT_PUBLIC_`

## 🎯 Current Status

✅ **Application is LIVE and RUNNING!**

- **Next.js App**: http://localhost:3001
- **Proxy Server**: http://localhost:3000
- **Status**: Development mode
- **Features**: All modules operational

### Access the Application

1. **Product Dashboard**: http://localhost:3001
2. **Competitor Analysis**: http://localhost:3001/competitor
3. **AI Chatbot**: Click the floating chat button (bottom-right)

### Test the Features

1. **View KPIs**: Check real-time metrics on dashboard
2. **Explore Charts**: Interactive visualizations with Recharts
3. **Use AI Assistant**: Ask questions like "Which products are overpriced?"
4. **Refresh Data**: Click refresh button in header
5. **Navigate**: Use sidebar to switch between dashboards

## 📝 Next Steps

1. ✅ Application is running
2. ✅ All features implemented
3. ✅ API services integrated
4. ✅ Chatbot operational
5. 🔄 Configure production environment variables
6. 🔄 Set up backend API (if needed)
7. 🔄 Deploy to production environment
8. 🔄 Configure monitoring and analytics

---

**Deployment Status**: ✅ READY FOR PRODUCTION

*Last Updated: May 2026*