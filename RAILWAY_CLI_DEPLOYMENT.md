# Railway CLI Deployment Guide

## Overview
Deploy your portfolio to Railway using the Railway CLI for full control over your deployment process.

---

## Prerequisites

- [x] Node.js 18+ installed
- [x] Git repository with code pushed to GitHub
- [x] Railway account (sign up at https://railway.app)
- [x] Firebase project configured

---

## Step 1: Install Railway CLI

### Windows (PowerShell)
```powershell
# Using npm (recommended)
npm install -g @railway/cli

# Or using Scoop
scoop install railway
```

### macOS/Linux
```bash
# Using npm
npm install -g @railway/cli

# Or using Homebrew (macOS)
brew install railway

# Or using curl
curl -fsSL https://railway.app/install.sh | sh
```

### Verify Installation
```bash
railway --version
```

---

## Step 2: Login to Railway

```bash
railway login
```

This will:
1. Open your browser
2. Ask you to authorize the CLI
3. Automatically link your account

### Verify Login
```bash
railway whoami
```

---

## Step 3: Project Setup

### Navigate to your project
```bash
cd "C:\Users\Faizan\Documents\My Portfolio"
```

### Initialize Railway Project
```bash
# Create a new Railway project
railway init
```

You'll be prompted to:
- Enter project name: `my-portfolio` (or your preferred name)
- Select team (if you have multiple)

This creates a `.railway` directory and `railway.json` configuration.

---

## Step 4: Deploy Backend (Server)

### 4.1 Navigate to Server Directory
```bash
cd server
```

### 4.2 Link to Railway Service
```bash
# Create a new service for the backend
railway link
```

Select or create a new project when prompted.

### 4.3 Set Environment Variables

#### Option A: Using CLI (One by one)
```bash
# Server Configuration
railway variables set PORT=5000
railway variables set NODE_ENV=production

# Firebase Admin SDK
railway variables set FIREBASE_PROJECT_ID=your-project-id
railway variables set FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
railway variables set FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
YOUR_PRIVATE_KEY_HERE
-----END PRIVATE KEY-----"
railway variables set FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com

# Firebase Client Config
railway variables set FIREBASE_API_KEY=your-api-key
railway variables set FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
railway variables set FIREBASE_MESSAGING_SENDER_ID=your-sender-id
railway variables set FIREBASE_APP_ID=your-app-id

# Admin Email
railway variables set ADMIN_EMAIL=your-admin-email@gmail.com
```

#### Option B: Using a .env file (Easier)
```bash
# Create a temporary .env file (DO NOT COMMIT THIS)
# Copy from .env.example and fill in real values

# Upload all variables at once
railway variables set --from-file .env

# Delete the temp .env file immediately
rm .env  # or del .env on Windows
```

### 4.4 View Your Variables (to verify)
```bash
railway variables
```

### 4.5 Deploy Backend
```bash
# Deploy the server
railway up

# Or deploy with logs
railway up --detach
```

### 4.6 Get Backend URL
```bash
# Generate a public domain
railway domain

# Or view service info
railway status
```

**Copy the backend URL** - you'll need it for the frontend (e.g., `https://your-backend.up.railway.app`)

### 4.7 Update CLIENT_URL Variable
```bash
# After deploying frontend, update this with your frontend URL
railway variables set CLIENT_URL=https://your-frontend.up.railway.app
```

---

## Step 5: Deploy Frontend (Client)

### 5.1 Navigate to Client Directory
```bash
cd ../client
```

### 5.2 Link to New Railway Service
```bash
# Create a new service for the frontend
railway link

# Or create a new service in the same project
railway service
```

Select "Create new service" and name it `portfolio-frontend` or similar.

### 5.3 Set Frontend Environment Variables
```bash
# API URL (use the backend URL from Step 4.6)
railway variables set VITE_API_URL=https://your-backend.up.railway.app/api

# Firebase Configuration (same as backend)
railway variables set VITE_FIREBASE_API_KEY=your-api-key
railway variables set VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
railway variables set VITE_FIREBASE_PROJECT_ID=your-project-id
railway variables set VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
railway variables set VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
railway variables set VITE_FIREBASE_APP_ID=your-app-id
```

### 5.4 Deploy Frontend
```bash
# Deploy the client
railway up

# Railway will automatically detect it's a Vite app and:
# - Run npm install
# - Run npm run build
# - Serve the dist folder
```

### 5.5 Get Frontend URL
```bash
# Generate a public domain for frontend
railway domain

# View deployment status
railway status
```

**Copy the frontend URL** - this is your live portfolio URL!

### 5.6 Update Backend CLIENT_URL
```bash
# Go back to server directory
cd ../server

# Update CLIENT_URL with the frontend URL
railway variables set CLIENT_URL=https://your-frontend.up.railway.app

# Redeploy backend with new variable
railway up
```

---

## Step 6: View Logs and Monitor

### View Real-time Logs
```bash
# Backend logs
cd server
railway logs

# Frontend logs
cd ../client
railway logs

# Follow logs in real-time
railway logs --follow
```

### Check Service Status
```bash
railway status
```

### Open in Browser
```bash
# Open Railway dashboard
railway open

# Open the deployed service
railway run open
```

---

## Step 7: Custom Domain (Optional)

### Add Custom Domain via CLI
```bash
# Navigate to the service (client or server)
cd client  # for frontend

# Add custom domain
railway domain add yourdomain.com

# Or add subdomain
railway domain add portfolio.yourdomain.com
```

### DNS Configuration
Railway will provide CNAME records. Add them to your domain registrar:

```
Type: CNAME
Name: @ (or subdomain)
Value: [provided by Railway]
```

---

## Useful Railway CLI Commands

### Project Management
```bash
# List all projects
railway list

# Switch project
railway link

# Unlink current project
railway unlink

# Delete service
railway service delete
```

### Environment Variables
```bash
# List all variables
railway variables

# Set a variable
railway variables set KEY=value

# Delete a variable
railway variables delete KEY

# Load from file
railway variables set --from-file .env
```

### Deployment
```bash
# Deploy current directory
railway up

# Deploy specific directory
railway up --service backend

# Deploy and follow logs
railway up --detach && railway logs --follow

# Redeploy without changes
railway redeploy
```

### Logs and Debugging
```bash
# View logs
railway logs

# Follow logs in real-time
railway logs --follow

# Filter logs
railway logs --filter error
```

### Service Management
```bash
# List services in project
railway service list

# Switch service
railway service

# Get service info
railway status

# Restart service
railway restart
```

---

## Deployment Workflow

### Complete Deployment Script

Create a `deploy.sh` file in your project root:

```bash
#!/bin/bash

echo "🚀 Deploying Portfolio to Railway..."

# Deploy Backend
echo "📦 Deploying Backend..."
cd server
railway up --detach
BACKEND_URL=$(railway status | grep "URL" | awk '{print $2}')
echo "✅ Backend deployed: $BACKEND_URL"

# Wait for backend to be ready
sleep 10

# Deploy Frontend
echo "📦 Deploying Frontend..."
cd ../client
railway variables set VITE_API_URL="${BACKEND_URL}/api"
railway up --detach
FRONTEND_URL=$(railway status | grep "URL" | awk '{print $2}')
echo "✅ Frontend deployed: $FRONTEND_URL"

# Update Backend with Frontend URL
echo "🔄 Updating Backend CLIENT_URL..."
cd ../server
railway variables set CLIENT_URL="$FRONTEND_URL"
railway redeploy

echo "🎉 Deployment Complete!"
echo "Frontend: $FRONTEND_URL"
echo "Backend: $BACKEND_URL"
```

### PowerShell Version (deploy.ps1)

```powershell
Write-Host "🚀 Deploying Portfolio to Railway..." -ForegroundColor Cyan

# Deploy Backend
Write-Host "📦 Deploying Backend..." -ForegroundColor Yellow
Set-Location server
railway up --detach
$backendInfo = railway status
Write-Host "✅ Backend deployed" -ForegroundColor Green

# Wait for backend
Start-Sleep -Seconds 10

# Deploy Frontend
Write-Host "📦 Deploying Frontend..." -ForegroundColor Yellow
Set-Location ..\client
railway up --detach
$frontendInfo = railway status
Write-Host "✅ Frontend deployed" -ForegroundColor Green

Write-Host "🎉 Deployment Complete!" -ForegroundColor Green
```

---

## Troubleshooting

### Build Fails

**Check logs:**
```bash
railway logs
```

**Common issues:**
- Missing environment variables
- Build script errors
- Port conflicts

### Can't Connect to Backend

**Verify CORS:**
```bash
# Check CLIENT_URL is set correctly
cd server
railway variables | grep CLIENT_URL

# Update if needed
railway variables set CLIENT_URL=https://your-frontend-url.up.railway.app
railway redeploy
```

### Environment Variables Not Loading

**Verify variables are set:**
```bash
railway variables
```

**Redeploy after setting variables:**
```bash
railway redeploy
```

### Service Won't Start

**Check if PORT is correct:**
```bash
# Railway automatically sets PORT
# Make sure your server.js uses process.env.PORT
railway variables | grep PORT
```

**Check build command:**
```bash
# Make sure package.json has correct scripts
railway run npm start
```

---

## Railway Configuration Files

### railway.json (Root)
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "sleepApplication": false,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### railway.json (Server)
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install"
  },
  "deploy": {
    "startCommand": "npm start",
    "numReplicas": 1,
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### railway.json (Client)
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm run preview",
    "numReplicas": 1
  }
}
```

---

## Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables set correctly
- [ ] CORS configured properly (CLIENT_URL set)
- [ ] Firebase authentication working
- [ ] Admin login working
- [ ] File uploads working
- [ ] All API endpoints responding
- [ ] Custom domain configured (if applicable)
- [ ] SSL/HTTPS working (automatic with Railway)
- [ ] Firebase authorized domains updated

---

## Cost Optimization

### Free Tier Limits (Railway)
- $5 free credits per month
- Automatically sleeps after inactivity
- Limited to 512MB RAM per service

### Optimize for Free Tier
```bash
# Enable sleep mode (automatically done)
# Your apps will sleep after 30 minutes of inactivity

# Use single replica
# Configure in railway.json with "numReplicas": 1
```

---

## Monitoring and Maintenance

### Regular Checks
```bash
# Check service health
railway status

# View recent logs
railway logs --tail 100

# Check resource usage
railway metrics
```

### Update Deployment
```bash
# After pushing to GitHub
git push origin main

# Redeploy from Railway
railway up

# Or trigger redeploy
railway redeploy
```

---

## Security Best Practices

1. **Never commit environment files**
   ```bash
   # Ensure .gitignore includes
   .env
   .env.local
   .env.production
   ```

2. **Use Railway variables for secrets**
   - Store all sensitive data in Railway variables
   - Never hardcode credentials

3. **Enable CORS properly**
   - Set CLIENT_URL to your exact frontend domain
   - Don't use wildcards in production

4. **Update Firebase authorized domains**
   - Add your Railway domains to Firebase Console
   - Go to Authentication > Settings > Authorized domains

5. **Keep dependencies updated**
   ```bash
   npm audit
   npm update
   ```

---

## Quick Reference Card

```bash
# Login
railway login

# Initialize project
railway init

# Set variables
railway variables set KEY=value
railway variables set --from-file .env

# Deploy
railway up

# View logs
railway logs --follow

# Get URL
railway domain

# Redeploy
railway redeploy

# Service info
railway status

# Open dashboard
railway open
```

---

## Support Resources

- **Railway Docs:** https://docs.railway.app
- **Railway CLI Docs:** https://docs.railway.app/develop/cli
- **Railway Discord:** https://discord.gg/railway
- **Railway Status:** https://status.railway.app

---

## Next Steps After Deployment

1. **Update Firebase Authorized Domains**
   - Add your Railway domains to Firebase Console
   - Test Google authentication

2. **Test All Features**
   - Run through the post-deployment checklist
   - Test admin panel functionality
   - Verify file uploads work

3. **Monitor Performance**
   - Check logs regularly
   - Monitor Railway dashboard
   - Set up alerts if needed

4. **Optional: Add Custom Domain**
   - Purchase domain from registrar
   - Configure DNS settings
   - Add to Railway using `railway domain add`

---

**Deployment Status:** Ready to Deploy ✅
**Estimated Time:** 15-20 minutes
**Difficulty:** Easy with this guide 🚀

---

*Last Updated: 2025-01-02*
*Railway CLI Version: Latest*
