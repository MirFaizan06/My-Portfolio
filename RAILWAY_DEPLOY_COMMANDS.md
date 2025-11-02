# Railway Deployment Commands - Correct Syntax

## Updated for Railway CLI v4.11.0

---

## Step 1: Login to Railway

```powershell
railway login
```

---

## Step 2: Deploy Backend

### Navigate to Server Directory
```powershell
cd "C:\Users\Faizan\Documents\My Portfolio\server"
```

### Initialize Railway Project
```powershell
railway init
# Enter project name when prompted: my-portfolio-backend
```

### Set Environment Variables (Correct Syntax!)

**⚠️ IMPORTANT: Replace placeholders with your actual Firebase credentials!**

```powershell
# Server Configuration
railway variables --set "NODE_ENV=production"
railway variables --set "PORT=5000"

# Firebase Admin SDK (Get from Firebase Console > Service Accounts)
railway variables --set "FIREBASE_PROJECT_ID=your-project-id"
railway variables --set "FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com"
railway variables --set "FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com"

# Firebase Private Key (Replace with your actual key)
railway variables --set "FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
YOUR_ACTUAL_PRIVATE_KEY_HERE
-----END PRIVATE KEY-----"

# Firebase Client Configuration (Get from Firebase Console > General)
railway variables --set "FIREBASE_API_KEY=your-api-key"
railway variables --set "FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com"
railway variables --set "FIREBASE_MESSAGING_SENDER_ID=your-sender-id"
railway variables --set "FIREBASE_APP_ID=your-app-id"

# Admin Email (Your Google account for admin access)
railway variables --set "ADMIN_EMAIL=mirfaizan8803@gmail.com"
```

### Deploy Backend
```powershell
railway up
```

### Generate Public Domain
```powershell
railway domain
```

**📝 Save your backend URL!** (e.g., `https://my-portfolio-backend.up.railway.app`)

---

## Step 3: Deploy Frontend

### Navigate to Client Directory
```powershell
cd "C:\Users\Faizan\Documents\My Portfolio\client"
```

### Initialize Railway Project
```powershell
railway init
# Enter project name when prompted: my-portfolio-frontend
```

### Set Environment Variables

**⚠️ Replace `YOUR_BACKEND_URL` with the URL from Step 2!**

```powershell
# API URL (Use your backend URL from Step 2)
railway variables --set "VITE_API_URL=https://YOUR_BACKEND_URL.up.railway.app/api"

# Firebase Configuration (Same as backend)
railway variables --set "VITE_FIREBASE_API_KEY=your-api-key"
railway variables --set "VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com"
railway variables --set "VITE_FIREBASE_PROJECT_ID=your-project-id"
railway variables --set "VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com"
railway variables --set "VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id"
railway variables --set "VITE_FIREBASE_APP_ID=your-app-id"
```

### Deploy Frontend
```powershell
railway up
```

### Generate Public Domain
```powershell
railway domain
```

**📝 Save your frontend URL!** This is your live portfolio! 🎉

---

## Step 4: Update Backend CORS

```powershell
# Go back to server directory
cd "C:\Users\Faizan\Documents\My Portfolio\server"

# Update CLIENT_URL with your frontend URL
railway variables --set "CLIENT_URL=https://YOUR_FRONTEND_URL.up.railway.app"

# Redeploy backend
railway redeploy
```

---

## Step 5: Add Railway Domains to Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **my-portfolio-9e277**
3. Navigate to **Authentication** → **Settings** → **Authorized domains**
4. Click **Add domain** and add:
   - Your backend Railway domain (e.g., `my-portfolio-backend.up.railway.app`)
   - Your frontend Railway domain (e.g., `my-portfolio-frontend.up.railway.app`)

---

## Useful Commands

### View Variables
```powershell
# List all variables
railway variables

# Show in key=value format
railway variables --kv
```

### View Logs
```powershell
railway logs
```

### Check Status
```powershell
railway status
```

### Redeploy
```powershell
railway redeploy
```

### Open Dashboard
```powershell
railway open
```

---

## Alternative: Bulk Set Variables from .env File

Create a temporary `.env` file (don't commit it!) and set all at once:

### Create .env file (example for backend)
```env
NODE_ENV=production
PORT=5000
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_STORAGE_BUCKET=your-bucket
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-auth-domain
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
ADMIN_EMAIL=mirfaizan8803@gmail.com
```

Unfortunately, Railway CLI v4 doesn't support `--from-file` anymore. You need to set each variable individually with `--set`.

---

## Multiple Variables at Once

You can chain multiple `--set` flags:

```powershell
railway variables --set "NODE_ENV=production" --set "PORT=5000" --set "ADMIN_EMAIL=mirfaizan8803@gmail.com"
```

---

## Get Your Firebase Credentials

### Service Account (Private Key)
1. Go to: https://console.firebase.google.com/project/my-portfolio-9e277/settings/serviceaccounts/adminsdk
2. Click "Generate new private key"
3. Download the JSON file
4. Open it and extract:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY`

### Client Configuration
1. Go to: https://console.firebase.google.com/project/my-portfolio-9e277/settings/general
2. Scroll to "Your apps" section
3. Copy the `firebaseConfig` values:
   - `apiKey` → `FIREBASE_API_KEY` / `VITE_FIREBASE_API_KEY`
   - `authDomain` → `FIREBASE_AUTH_DOMAIN` / `VITE_FIREBASE_AUTH_DOMAIN`
   - `projectId` → `FIREBASE_PROJECT_ID` / `VITE_FIREBASE_PROJECT_ID`
   - `storageBucket` → `FIREBASE_STORAGE_BUCKET` / `VITE_FIREBASE_STORAGE_BUCKET`
   - `messagingSenderId` → `FIREBASE_MESSAGING_SENDER_ID` / `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `appId` → `FIREBASE_APP_ID` / `VITE_FIREBASE_APP_ID`

---

## Troubleshooting

### "error: unexpected argument 'set' found"
**Solution:** Use `--set` instead of `set`
```powershell
# ❌ Wrong
railway variables set KEY=value

# ✅ Correct
railway variables --set "KEY=value"
```

### Can't see variables
```powershell
# List all variables
railway variables

# Or in key=value format
railway variables --kv
```

### Need to update a variable
```powershell
# Just set it again with new value
railway variables --set "KEY=new-value"

# Then redeploy
railway redeploy
```

### Deployment fails
```powershell
# Check logs
railway logs

# Check status
railway status
```

---

## Quick Copy-Paste Template

### Backend Variables (Fill in your values!)
```powershell
railway variables --set "NODE_ENV=production" --set "PORT=5000" --set "FIREBASE_PROJECT_ID=YOUR_PROJECT_ID" --set "FIREBASE_CLIENT_EMAIL=YOUR_CLIENT_EMAIL" --set "FIREBASE_PRIVATE_KEY=YOUR_PRIVATE_KEY" --set "FIREBASE_STORAGE_BUCKET=YOUR_BUCKET" --set "FIREBASE_API_KEY=YOUR_API_KEY" --set "FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN" --set "FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID" --set "FIREBASE_APP_ID=YOUR_APP_ID" --set "ADMIN_EMAIL=mirfaizan8803@gmail.com"
```

### Frontend Variables (Fill in your values!)
```powershell
railway variables --set "VITE_API_URL=https://YOUR_BACKEND_URL.up.railway.app/api" --set "VITE_FIREBASE_API_KEY=YOUR_API_KEY" --set "VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN" --set "VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID" --set "VITE_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET" --set "VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID" --set "VITE_FIREBASE_APP_ID=YOUR_APP_ID"
```

---

**Last Updated:** 2025-01-02
**Railway CLI Version:** 4.11.0
**Status:** Ready to Deploy! 🚀
