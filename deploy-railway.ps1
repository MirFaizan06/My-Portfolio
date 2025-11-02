# Railway Deployment Script for Portfolio
# Author: Claude Code
# Date: 2025-01-02

param(
    [switch]$SkipBackend,
    [switch]$SkipFrontend,
    [switch]$Help
)

# Color functions
function Write-Success { param($Message) Write-Host $Message -ForegroundColor Green }
function Write-Info { param($Message) Write-Host $Message -ForegroundColor Cyan }
function Write-Warning { param($Message) Write-Host $Message -ForegroundColor Yellow }
function Write-Error { param($Message) Write-Host $Message -ForegroundColor Red }

# Help message
if ($Help) {
    Write-Host @"
Railway Deployment Script for Portfolio

Usage:
    .\deploy-railway.ps1                 # Deploy both backend and frontend
    .\deploy-railway.ps1 -SkipBackend    # Deploy only frontend
    .\deploy-railway.ps1 -SkipFrontend   # Deploy only backend
    .\deploy-railway.ps1 -Help           # Show this help message

Prerequisites:
    1. Railway CLI installed (npm install -g @railway/cli)
    2. Logged in to Railway (railway login)
    3. Environment variables configured
    4. Railway projects linked

"@
    exit 0
}

# Check if Railway CLI is installed
Write-Info "🔍 Checking Railway CLI installation..."
$railwayVersion = railway --version 2>$null
if (-not $railwayVersion) {
    Write-Error "❌ Railway CLI is not installed!"
    Write-Info "Install it with: npm install -g @railway/cli"
    exit 1
}
Write-Success "✅ Railway CLI installed: $railwayVersion"

# Check if logged in
Write-Info "🔍 Checking Railway authentication..."
$whoami = railway whoami 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Error "❌ Not logged in to Railway!"
    Write-Info "Login with: railway login"
    exit 1
}
Write-Success "✅ Logged in as: $whoami"

# Store original location
$originalLocation = Get-Location

# Deploy Backend
if (-not $SkipBackend) {
    Write-Info "`n📦 Deploying Backend..."
    Write-Info "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    Set-Location server

    # Check if linked
    if (-not (Test-Path ".railway")) {
        Write-Warning "⚠️  Backend not linked to Railway!"
        Write-Info "Run: railway link"
        Set-Location $originalLocation
        exit 1
    }

    Write-Info "🚀 Starting backend deployment..."
    railway up --detach

    if ($LASTEXITCODE -eq 0) {
        Write-Success "✅ Backend deployed successfully!"

        # Get backend URL
        Write-Info "📡 Getting backend URL..."
        $status = railway status 2>$null
        Write-Host $status

        Write-Info "`n💡 If you don't have a public URL yet, run: railway domain"
    } else {
        Write-Error "❌ Backend deployment failed!"
        Set-Location $originalLocation
        exit 1
    }

    Set-Location $originalLocation
    Write-Success "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

# Wait between deployments
if (-not $SkipBackend -and -not $SkipFrontend) {
    Write-Info "`n⏳ Waiting 5 seconds before deploying frontend..."
    Start-Sleep -Seconds 5
}

# Deploy Frontend
if (-not $SkipFrontend) {
    Write-Info "`n📦 Deploying Frontend..."
    Write-Info "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    Set-Location client

    # Check if linked
    if (-not (Test-Path ".railway")) {
        Write-Warning "⚠️  Frontend not linked to Railway!"
        Write-Info "Run: railway link"
        Set-Location $originalLocation
        exit 1
    }

    Write-Info "🚀 Starting frontend deployment..."
    railway up --detach

    if ($LASTEXITCODE -eq 0) {
        Write-Success "✅ Frontend deployed successfully!"

        # Get frontend URL
        Write-Info "📡 Getting frontend URL..."
        $status = railway status 2>$null
        Write-Host $status

        Write-Info "`n💡 If you don't have a public URL yet, run: railway domain"
    } else {
        Write-Error "❌ Frontend deployment failed!"
        Set-Location $originalLocation
        exit 1
    }

    Set-Location $originalLocation
    Write-Success "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

# Final message
Write-Success "`n🎉 Deployment Complete!"
Write-Info @"

Next Steps:
1. Get your URLs:
   - Backend:  cd server && railway domain
   - Frontend: cd client && railway domain

2. Update environment variables:
   - Update backend CLIENT_URL with frontend URL
   - Update frontend VITE_API_URL with backend URL

3. Add Railway domains to Firebase:
   - Go to Firebase Console > Authentication
   - Add your Railway domains to authorized domains

4. Test your deployment:
   - Visit your frontend URL
   - Test authentication
   - Check admin panel

View logs:
   - Backend:  cd server && railway logs --follow
   - Frontend: cd client && railway logs --follow

"@
