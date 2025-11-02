# Railway Frontend Setup Script
# This script helps you set environment variables for the frontend

Write-Host "🎨 Railway Frontend Environment Setup" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the client directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Not in client directory!" -ForegroundColor Red
    Write-Host "Please run this from the client directory:" -ForegroundColor Yellow
    Write-Host "  cd `"C:\Users\Faizan\Documents\My Portfolio\client`"" -ForegroundColor Yellow
    exit 1
}

Write-Host "This script will help you set Railway environment variables for the frontend." -ForegroundColor Green
Write-Host ""

# Prompt for values
$backendUrl = Read-Host "Enter your BACKEND URL (from railway domain, without /api)"
if ($backendUrl.EndsWith("/")) {
    $backendUrl = $backendUrl.TrimEnd("/")
}
$apiUrl = "$backendUrl/api"

Write-Host ""
Write-Host "Now enter your Firebase configuration (same as backend):" -ForegroundColor Yellow
$apiKey = Read-Host "Enter FIREBASE_API_KEY"
$authDomain = Read-Host "Enter FIREBASE_AUTH_DOMAIN (e.g., my-portfolio-9e277.firebaseapp.com)"
$projectId = Read-Host "Enter FIREBASE_PROJECT_ID"
$storageBucket = Read-Host "Enter FIREBASE_STORAGE_BUCKET"
$senderId = Read-Host "Enter FIREBASE_MESSAGING_SENDER_ID"
$appId = Read-Host "Enter FIREBASE_APP_ID"

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📋 Setting environment variables..." -ForegroundColor Cyan
Write-Host ""

# Set variables
try {
    Write-Host "Setting VITE_API_URL..." -ForegroundColor Gray
    railway variables --set "VITE_API_URL=$apiUrl"

    Write-Host "Setting VITE_FIREBASE_API_KEY..." -ForegroundColor Gray
    railway variables --set "VITE_FIREBASE_API_KEY=$apiKey"

    Write-Host "Setting VITE_FIREBASE_AUTH_DOMAIN..." -ForegroundColor Gray
    railway variables --set "VITE_FIREBASE_AUTH_DOMAIN=$authDomain"

    Write-Host "Setting VITE_FIREBASE_PROJECT_ID..." -ForegroundColor Gray
    railway variables --set "VITE_FIREBASE_PROJECT_ID=$projectId"

    Write-Host "Setting VITE_FIREBASE_STORAGE_BUCKET..." -ForegroundColor Gray
    railway variables --set "VITE_FIREBASE_STORAGE_BUCKET=$storageBucket"

    Write-Host "Setting VITE_FIREBASE_MESSAGING_SENDER_ID..." -ForegroundColor Gray
    railway variables --set "VITE_FIREBASE_MESSAGING_SENDER_ID=$senderId"

    Write-Host "Setting VITE_FIREBASE_APP_ID..." -ForegroundColor Gray
    railway variables --set "VITE_FIREBASE_APP_ID=$appId"

    Write-Host ""
    Write-Host "✅ All environment variables set successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Deploy frontend:   railway up" -ForegroundColor Yellow
    Write-Host "  2. Generate domain:   railway domain" -ForegroundColor Yellow
    Write-Host "  3. Update backend CLIENT_URL with your frontend URL" -ForegroundColor Yellow
    Write-Host ""
} catch {
    Write-Host "❌ Error setting variables: $_" -ForegroundColor Red
    exit 1
}
