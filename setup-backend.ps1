# Railway Backend Setup Script
# This script helps you set environment variables for the backend

Write-Host "🚀 Railway Backend Environment Setup" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the server directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Not in server directory!" -ForegroundColor Red
    Write-Host "Please run this from the server directory:" -ForegroundColor Yellow
    Write-Host "  cd `"C:\Users\Faizan\Documents\My Portfolio\server`"" -ForegroundColor Yellow
    exit 1
}

Write-Host "This script will help you set Railway environment variables." -ForegroundColor Green
Write-Host "You'll need your Firebase credentials ready." -ForegroundColor Yellow
Write-Host ""
Write-Host "Firebase Console URLs:" -ForegroundColor Cyan
Write-Host "  Service Account: https://console.firebase.google.com/project/my-portfolio-9e277/settings/serviceaccounts/adminsdk" -ForegroundColor Gray
Write-Host "  General Settings: https://console.firebase.google.com/project/my-portfolio-9e277/settings/general" -ForegroundColor Gray
Write-Host ""

# Prompt for values
$projectId = Read-Host "Enter FIREBASE_PROJECT_ID (e.g., my-portfolio-9e277)"
$clientEmail = Read-Host "Enter FIREBASE_CLIENT_EMAIL (e.g., firebase-adminsdk-xxxxx@...)"
$storageBucket = Read-Host "Enter FIREBASE_STORAGE_BUCKET (e.g., my-portfolio-9e277.appspot.com)"

Write-Host ""
Write-Host "For FIREBASE_PRIVATE_KEY, paste the entire key including:" -ForegroundColor Yellow
Write-Host "  -----BEGIN PRIVATE KEY-----" -ForegroundColor Gray
Write-Host "  [key content]" -ForegroundColor Gray
Write-Host "  -----END PRIVATE KEY-----" -ForegroundColor Gray
Write-Host "Press Enter when ready, then paste the key, then press Enter twice:" -ForegroundColor Yellow
Read-Host

# Read multi-line private key
$privateKey = ""
$line = ""
do {
    $line = Read-Host
    if ($line) { $privateKey += $line + "`n" }
} while ($line)
$privateKey = $privateKey.TrimEnd()

Write-Host ""
$apiKey = Read-Host "Enter FIREBASE_API_KEY"
$authDomain = Read-Host "Enter FIREBASE_AUTH_DOMAIN (e.g., my-portfolio-9e277.firebaseapp.com)"
$senderId = Read-Host "Enter FIREBASE_MESSAGING_SENDER_ID"
$appId = Read-Host "Enter FIREBASE_APP_ID"

Write-Host ""
$adminEmail = Read-Host "Enter ADMIN_EMAIL [mirfaizan8803@gmail.com]"
if ([string]::IsNullOrWhiteSpace($adminEmail)) {
    $adminEmail = "mirfaizan8803@gmail.com"
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📋 Setting environment variables..." -ForegroundColor Cyan
Write-Host ""

# Set variables
try {
    Write-Host "Setting NODE_ENV..." -ForegroundColor Gray
    railway variables --set "NODE_ENV=production"

    Write-Host "Setting PORT..." -ForegroundColor Gray
    railway variables --set "PORT=5000"

    Write-Host "Setting FIREBASE_PROJECT_ID..." -ForegroundColor Gray
    railway variables --set "FIREBASE_PROJECT_ID=$projectId"

    Write-Host "Setting FIREBASE_CLIENT_EMAIL..." -ForegroundColor Gray
    railway variables --set "FIREBASE_CLIENT_EMAIL=$clientEmail"

    Write-Host "Setting FIREBASE_STORAGE_BUCKET..." -ForegroundColor Gray
    railway variables --set "FIREBASE_STORAGE_BUCKET=$storageBucket"

    Write-Host "Setting FIREBASE_PRIVATE_KEY..." -ForegroundColor Gray
    railway variables --set "FIREBASE_PRIVATE_KEY=$privateKey"

    Write-Host "Setting FIREBASE_API_KEY..." -ForegroundColor Gray
    railway variables --set "FIREBASE_API_KEY=$apiKey"

    Write-Host "Setting FIREBASE_AUTH_DOMAIN..." -ForegroundColor Gray
    railway variables --set "FIREBASE_AUTH_DOMAIN=$authDomain"

    Write-Host "Setting FIREBASE_MESSAGING_SENDER_ID..." -ForegroundColor Gray
    railway variables --set "FIREBASE_MESSAGING_SENDER_ID=$senderId"

    Write-Host "Setting FIREBASE_APP_ID..." -ForegroundColor Gray
    railway variables --set "FIREBASE_APP_ID=$appId"

    Write-Host "Setting ADMIN_EMAIL..." -ForegroundColor Gray
    railway variables --set "ADMIN_EMAIL=$adminEmail"

    Write-Host ""
    Write-Host "✅ All environment variables set successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Deploy backend:    railway up" -ForegroundColor Yellow
    Write-Host "  2. Generate domain:   railway domain" -ForegroundColor Yellow
    Write-Host "  3. Save the URL for frontend setup" -ForegroundColor Yellow
    Write-Host ""
} catch {
    Write-Host "❌ Error setting variables: $_" -ForegroundColor Red
    exit 1
}
