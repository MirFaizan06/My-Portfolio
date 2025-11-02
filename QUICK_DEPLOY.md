# Quick Deploy Guide - Railway CLI

Get your portfolio live in **under 15 minutes**! 🚀

---

## Prerequisites (5 minutes)

### 1. Install Railway CLI
```powershell
# Windows
npm install -g @railway/cli

# Verify
railway --version
```

### 2. Login to Railway
```bash
railway login
```
This opens your browser to authorize.

### 3. Prepare Firebase Credentials
Have these ready from your Firebase Console:
- Project ID
- Client Email (from Service Account)
- Private Key (from Service Account)
- Storage Bucket
- API Key, Auth Domain, App ID, etc.

---

## Deploy Backend (5 minutes)

```bash
# 1. Navigate to server
cd server

# 2. Initialize Railway project
railway init
# Enter project name: my-portfolio-backend

# 3. Set environment variables (replace with your values)
railway variables set NODE_ENV=production
railway variables set PORT=5000
railway variables set FIREBASE_PROJECT_ID=your-project-id
railway variables set FIREBASE_CLIENT_EMAIL=your-client-email
railway variables set FIREBASE_PRIVATE_KEY="your-private-key"
railway variables set FIREBASE_STORAGE_BUCKET=your-bucket
railway variables set FIREBASE_API_KEY=your-api-key
railway variables set FIREBASE_AUTH_DOMAIN=your-auth-domain
railway variables set FIREBASE_MESSAGING_SENDER_ID=your-sender-id
railway variables set FIREBASE_APP_ID=your-app-id
railway variables set ADMIN_EMAIL=your-email@gmail.com

# 4. Deploy!
railway up

# 5. Generate public URL
railway domain

# 6. Copy the URL (you'll need it for frontend)
railway status
```

**🎯 Backend URL:** Save this! (e.g., `https://my-portfolio-backend.up.railway.app`)

---

## Deploy Frontend (5 minutes)

```bash
# 1. Navigate to client
cd ../client

# 2. Create new Railway service
railway init
# Enter project name: my-portfolio-frontend

# 3. Set environment variables
railway variables set VITE_API_URL=https://your-backend-url.up.railway.app/api
railway variables set VITE_FIREBASE_API_KEY=your-api-key
railway variables set VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
railway variables set VITE_FIREBASE_PROJECT_ID=your-project-id
railway variables set VITE_FIREBASE_STORAGE_BUCKET=your-bucket
railway variables set VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
railway variables set VITE_FIREBASE_APP_ID=your-app-id

# 4. Deploy!
railway up

# 5. Generate public URL
railway domain

# 6. Copy the URL - this is your live site!
railway status
```

**🎯 Frontend URL:** This is your portfolio! (e.g., `https://my-portfolio.up.railway.app`)

---

## Final Steps (3 minutes)

### 1. Update Backend with Frontend URL
```bash
cd ../server
railway variables set CLIENT_URL=https://your-frontend-url.up.railway.app
railway redeploy
```

### 2. Add Railway Domains to Firebase
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Click **Add domain**
5. Add both:
   - Your backend domain: `my-portfolio-backend.up.railway.app`
   - Your frontend domain: `my-portfolio.up.railway.app`

### 3. Test Your Site!
- Visit your frontend URL
- Try logging in as admin
- Upload a file
- Check if everything works

---

## Using the Deployment Script (Even Faster!)

### PowerShell (Windows)
```powershell
# Make sure you've linked both services first
cd server
railway link  # Link to backend project

cd ../client
railway link  # Link to frontend project

# Then deploy both
cd ..
.\deploy-railway.ps1
```

### Bash (Mac/Linux)
```bash
# Make executable
chmod +x deploy-railway.sh

# Deploy
./deploy-railway.sh
```

---

## Troubleshooting

### "Not logged in to Railway"
```bash
railway login
```

### "railway: command not found"
```bash
npm install -g @railway/cli
```

### Backend can't connect to Firebase
Check your environment variables:
```bash
cd server
railway variables
```

### Frontend can't reach backend (CORS error)
Update CLIENT_URL on backend:
```bash
cd server
railway variables set CLIENT_URL=https://your-frontend-url.up.railway.app
railway redeploy
```

### Changes not showing up
Clear build cache and redeploy:
```bash
railway redeploy
```

---

## View Logs

```bash
# Backend logs
cd server
railway logs --follow

# Frontend logs
cd client
railway logs --follow
```

---

## Update After Code Changes

```bash
# 1. Push to GitHub
git add .
git commit -m "Your changes"
git push

# 2. Redeploy backend
cd server
railway up

# 3. Redeploy frontend
cd ../client
railway up
```

---

## Environment Variables Cheatsheet

### Backend (.env format)
```env
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-frontend.up.railway.app
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----"
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
ADMIN_EMAIL=your-email@gmail.com
```

### Frontend (.env format)
```env
VITE_API_URL=https://your-backend.up.railway.app/api
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Bulk Set from .env file
```bash
# Create temp .env file with above content
railway variables set --from-file .env

# Delete temp file immediately
rm .env  # or del .env on Windows
```

---

## Cost (Free Tier)

Railway gives you **$5 free credits per month**, which is enough for:
- 2 small services (backend + frontend)
- Automatically sleeps after 30 minutes of inactivity
- Wakes up automatically when accessed

**Your portfolio should run completely free!** 🎉

---

## Next Steps

1. ✅ Site is live
2. ✅ Authentication works
3. ✅ Admin panel accessible

**Now consider:**
- Add custom domain (optional)
- Monitor with Railway dashboard
- Set up alerts
- Add more content via admin panel

---

## Quick Commands Reference

```bash
# Deploy
railway up

# View logs
railway logs --follow

# Check status
railway status

# Redeploy
railway redeploy

# Get URL
railway domain

# List variables
railway variables

# Open dashboard
railway open
```

---

**Total Time:** ~13-15 minutes
**Difficulty:** Easy
**Cost:** Free

**You're live! 🚀**

For detailed information, see [RAILWAY_CLI_DEPLOYMENT.md](./RAILWAY_CLI_DEPLOYMENT.md)
