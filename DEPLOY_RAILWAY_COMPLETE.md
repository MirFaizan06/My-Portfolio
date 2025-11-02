# Complete Railway Deployment Guide - Official CLI Method

Based on official Railway CLI documentation - Updated 2025-01-02

---

## 🎯 Overview

We'll deploy your portfolio as **two separate services**:
1. **Backend Service** (Express API + Firebase)
2. **Frontend Service** (React/Vite)

Both will be in the **same Railway project** but different services.

---

## ✅ Prerequisites Checklist

- [x] Railway CLI installed (you have v4.11.0)
- [ ] Logged into Railway
- [ ] Firebase credentials ready
- [ ] Git repository up to date

---

## Step 1: Login to Railway

```powershell
railway login
```

This opens your browser to authenticate. Complete the login.

**Verify:**
```powershell
railway whoami
```

You should see your email/username.

---

## Step 2: Create Railway Project

We'll create ONE project with TWO services (backend + frontend).

### Create Project
```powershell
# From project root
cd "C:\Users\Faizan\Documents\My Portfolio"

# Create new project
railway init
```

**When prompted:**
- **Project name:** `my-portfolio` (or your preferred name)
- **Starting directory:** Press Enter (use current directory)

This creates:
- A new Railway project
- Links your current directory to it
- Creates a `.railway` directory

---

## Step 3: Deploy Backend Service

### 3.1 Navigate to Server Directory
```powershell
cd server
```

### 3.2 Link to Project & Create Service

Since you already initialized the project, now link this directory to a service:

```powershell
# This will show the project you just created
railway link

# Then create/select a service
railway service
```

**Select:** `+ Create a new service`
**Service name:** `backend`

### 3.3 Set Environment Variables

**Option A: Interactive Helper Script**
```powershell
..\setup-backend.ps1
```

**Option B: Manual (All at Once)**
```powershell
railway variables `
  --set "NODE_ENV=production" `
  --set "PORT=5000" `
  --set "FIREBASE_PROJECT_ID=your-project-id" `
  --set "FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com" `
  --set "FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com" `
  --set "FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
YOUR_KEY_HERE
-----END PRIVATE KEY-----" `
  --set "FIREBASE_API_KEY=your-api-key" `
  --set "FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com" `
  --set "FIREBASE_MESSAGING_SENDER_ID=your-sender-id" `
  --set "FIREBASE_APP_ID=your-app-id" `
  --set "ADMIN_EMAIL=mirfaizan8803@gmail.com"
```

**Option C: One by One**
```powershell
railway variables --set "NODE_ENV=production"
railway variables --set "PORT=5000"
railway variables --set "FIREBASE_PROJECT_ID=your-project-id"
# ... continue for each variable
```

**Verify Variables:**
```powershell
railway variables
```

### 3.4 Deploy Backend
```powershell
railway up
```

This will:
- Build your backend
- Deploy it to Railway
- Show build logs

**Wait for:** `✓ Build successful` and `✓ Deployment successful`

### 3.5 Generate Public Domain
```powershell
railway domain
```

Railway will generate a public URL like:
`https://my-portfolio-backend-production.up.railway.app`

**📝 IMPORTANT: Copy this URL!** You'll need it for the frontend.

**Check deployment:**
```powershell
railway status
```

---

## Step 4: Deploy Frontend Service

### 4.1 Navigate to Client Directory
```powershell
cd ..\client
```

### 4.2 Link to Project & Create Service

```powershell
# Link to the same project
railway link
# Select the project you created: my-portfolio

# Create new service
railway service
```

**Select:** `+ Create a new service`
**Service name:** `frontend`

### 4.3 Set Environment Variables

**Replace `YOUR_BACKEND_URL` with the URL from Step 3.5!**

**Option A: Interactive Helper Script**
```powershell
..\setup-frontend.ps1
```

**Option B: Manual**
```powershell
railway variables `
  --set "VITE_API_URL=https://YOUR_BACKEND_URL.up.railway.app/api" `
  --set "VITE_FIREBASE_API_KEY=your-api-key" `
  --set "VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com" `
  --set "VITE_FIREBASE_PROJECT_ID=your-project-id" `
  --set "VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com" `
  --set "VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id" `
  --set "VITE_FIREBASE_APP_ID=your-app-id"
```

**Verify Variables:**
```powershell
railway variables
```

### 4.4 Deploy Frontend
```powershell
railway up
```

Wait for build and deployment to complete.

### 4.5 Generate Public Domain
```powershell
railway domain
```

Railway will generate a public URL like:
`https://my-portfolio-frontend-production.up.railway.app`

**📝 This is your live portfolio URL! 🎉**

**Check deployment:**
```powershell
railway status
```

---

## Step 5: Update Backend CORS Configuration

Now that you have the frontend URL, update the backend to allow CORS:

```powershell
# Go back to server directory
cd ..\server

# Update CLIENT_URL with your frontend URL
railway variables --set "CLIENT_URL=https://YOUR_FRONTEND_URL.up.railway.app"

# Redeploy backend to apply changes
railway redeploy
```

**Verify:**
```powershell
railway variables | Select-String "CLIENT_URL"
```

---

## Step 6: Configure Firebase Authorized Domains

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **my-portfolio-9e277**
3. Navigate to **Authentication** → **Settings** → **Authorized domains**
4. Click **Add domain** and add:
   - Backend domain: `my-portfolio-backend-production.up.railway.app`
   - Frontend domain: `my-portfolio-frontend-production.up.railway.app`

---

## Step 7: Test Your Deployment

### Test Backend
```powershell
# From server directory
curl https://YOUR_BACKEND_URL.up.railway.app/api/health
```

Expected response: `{"status":"ok","message":"Server is running"}`

### Test Frontend
Open your frontend URL in a browser:
```powershell
# Open in default browser
start https://YOUR_FRONTEND_URL.up.railway.app
```

**Test Checklist:**
- [ ] Homepage loads
- [ ] All pages accessible (Projects, Pricing, Resume, Contact)
- [ ] Admin login page loads
- [ ] Can log in with Google (as mirfaizan8803@gmail.com)
- [ ] Admin dashboard accessible
- [ ] Can view/add projects
- [ ] Can view/add pricing plans

---

## 📊 Monitor Your Deployment

### View Logs
```powershell
# Backend logs
cd server
railway logs

# Frontend logs
cd ..\client
railway logs

# Follow logs in real-time
railway logs --follow
```

### Check Status
```powershell
railway status
```

### Open Railway Dashboard
```powershell
railway open
```

---

## 🔄 Update Deployment After Code Changes

### Method 1: Automatic (Recommended)
Railway can automatically deploy when you push to GitHub:

1. In Railway dashboard, go to your service
2. Connect to GitHub repository
3. Select branch: `main`
4. Enable automatic deployments

Now every `git push` triggers a deployment!

### Method 2: Manual
```powershell
# Make code changes
git add .
git commit -m "Your changes"
git push

# Then manually deploy
cd server
railway up

cd ..\client
railway up
```

---

## 🛠️ Useful Commands Reference

### Project & Service Management
```powershell
# List all projects
railway list

# Switch project
railway link

# Switch service (within a project)
railway service

# Check what's linked
railway status

# Open Railway dashboard
railway open
```

### Environment Variables
```powershell
# View all variables
railway variables

# View in key=value format
railway variables --kv

# Set a variable
railway variables --set "KEY=value"

# Set multiple variables
railway variables --set "KEY1=value1" --set "KEY2=value2"
```

### Deployment
```powershell
# Deploy and show logs
railway up

# Deploy without waiting
railway up --detach

# Redeploy existing deployment
railway redeploy
```

### Logs & Debugging
```powershell
# View logs
railway logs

# Follow logs in real-time
railway logs --follow

# Last 100 log lines
railway logs --tail 100
```

### Local Development with Railway Env
```powershell
# Run local server with Railway environment variables
railway run npm start

# Open shell with Railway variables
railway shell
```

### Domains
```powershell
# Generate public domain
railway domain

# Remove domain
railway domain --remove
```

---

## 🎯 Environment Management

Railway supports multiple environments (production, staging, etc.)

### Switch Environment
```powershell
railway environment
# Select: production (default) or create new
```

### Set Variables for Specific Environment
```powershell
railway variables --set "KEY=value" --environment production
```

---

## 🔐 Security Best Practices

### 1. Never Commit Secrets
```gitignore
# Already in .gitignore
.env
.env.local
.env.production
.railway/
```

### 2. Use Railway Variables for All Secrets
All sensitive data should be in Railway variables, not code.

### 3. Rotate Credentials Regularly
```powershell
# Update a credential
railway variables --set "FIREBASE_PRIVATE_KEY=new-key"
railway redeploy
```

### 4. Limit Access
- Only add necessary team members to Railway project
- Use minimal Firebase permissions

---

## 🚨 Troubleshooting

### "No service linked"
```powershell
railway service
# Select or create a service
```

### Build Fails
```powershell
# Check logs
railway logs

# Common issues:
# - Missing dependencies (check package.json)
# - Build script errors (check build output)
# - Environment variables not set
```

### CORS Errors
```powershell
# Ensure CLIENT_URL is set correctly on backend
cd server
railway variables | Select-String "CLIENT_URL"

# Update if wrong
railway variables --set "CLIENT_URL=https://correct-frontend-url.up.railway.app"
railway redeploy
```

### Firebase Authentication Fails
1. Check Firebase authorized domains include Railway domains
2. Verify Firebase credentials are correct
3. Check environment variables are set

### 502 Bad Gateway
- Service might be starting (wait 30 seconds)
- Check logs for crashes: `railway logs`
- Verify PORT is set correctly

### Variables Not Loading
```powershell
# Verify variables are set
railway variables

# Redeploy to apply changes
railway redeploy
```

---

## 💰 Cost & Usage

### Free Tier (Hobby Plan)
- **$5 free credits per month**
- Enough for 2 small services
- Auto-sleep after inactivity (configurable)
- 512MB RAM per service
- Shared CPU

### Monitor Usage
```powershell
railway open
# Go to project settings > Usage
```

---

## 📚 Additional Resources

- **Railway Docs:** https://docs.railway.com
- **Railway CLI Guide:** https://docs.railway.com/guides/cli
- **Railway Dashboard:** https://railway.app/dashboard
- **Railway Discord:** https://discord.gg/railway
- **Railway Status:** https://status.railway.app

---

## 🎉 Deployment Checklist

- [ ] Railway CLI installed and authenticated
- [ ] Project created: `railway init`
- [ ] Backend service created and deployed
- [ ] Backend domain generated
- [ ] Frontend service created and deployed
- [ ] Frontend domain generated
- [ ] Backend CLIENT_URL updated with frontend URL
- [ ] Firebase authorized domains configured
- [ ] Tested all pages load
- [ ] Tested admin login works
- [ ] Tested API endpoints work
- [ ] Monitored logs for errors

---

## 🔄 Quick Redeploy Commands

```powershell
# Redeploy backend
cd "C:\Users\Faizan\Documents\My Portfolio\server"
railway redeploy

# Redeploy frontend
cd "C:\Users\Faizan\Documents\My Portfolio\client"
railway redeploy

# Or update and redeploy
git pull origin main
cd server
railway up
cd ..\client
railway up
```

---

**You're ready to deploy! 🚀**

**Start with Step 1 and work through each step carefully.**

**Time estimate:** 15-20 minutes for complete deployment
