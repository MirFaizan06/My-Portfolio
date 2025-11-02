#!/bin/bash

# Railway Deployment Script for Portfolio
# Author: Claude Code
# Date: 2025-01-02

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Functions
print_success() { echo -e "${GREEN}$1${NC}"; }
print_info() { echo -e "${CYAN}$1${NC}"; }
print_warning() { echo -e "${YELLOW}$1${NC}"; }
print_error() { echo -e "${RED}$1${NC}"; }

# Help message
show_help() {
    cat << EOF
Railway Deployment Script for Portfolio

Usage:
    ./deploy-railway.sh              # Deploy both backend and frontend
    ./deploy-railway.sh --backend    # Deploy only backend
    ./deploy-railway.sh --frontend   # Deploy only frontend
    ./deploy-railway.sh --help       # Show this help message

Prerequisites:
    1. Railway CLI installed (npm install -g @railway/cli)
    2. Logged in to Railway (railway login)
    3. Environment variables configured
    4. Railway projects linked

EOF
    exit 0
}

# Parse arguments
DEPLOY_BACKEND=true
DEPLOY_FRONTEND=true

while [[ $# -gt 0 ]]; do
    case $1 in
        --backend)
            DEPLOY_FRONTEND=false
            shift
            ;;
        --frontend)
            DEPLOY_BACKEND=false
            shift
            ;;
        --help|-h)
            show_help
            ;;
        *)
            print_error "Unknown option: $1"
            show_help
            ;;
    esac
done

# Check if Railway CLI is installed
print_info "🔍 Checking Railway CLI installation..."
if ! command -v railway &> /dev/null; then
    print_error "❌ Railway CLI is not installed!"
    print_info "Install it with: npm install -g @railway/cli"
    exit 1
fi
RAILWAY_VERSION=$(railway --version)
print_success "✅ Railway CLI installed: $RAILWAY_VERSION"

# Check if logged in
print_info "🔍 Checking Railway authentication..."
if ! railway whoami &> /dev/null; then
    print_error "❌ Not logged in to Railway!"
    print_info "Login with: railway login"
    exit 1
fi
RAILWAY_USER=$(railway whoami)
print_success "✅ Logged in as: $RAILWAY_USER"

# Store original directory
ORIGINAL_DIR=$(pwd)

# Deploy Backend
if [ "$DEPLOY_BACKEND" = true ]; then
    print_info "\n📦 Deploying Backend..."
    print_info "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    cd server || exit 1

    # Check if linked
    if [ ! -d ".railway" ]; then
        print_warning "⚠️  Backend not linked to Railway!"
        print_info "Run: railway link"
        cd "$ORIGINAL_DIR" || exit
        exit 1
    fi

    print_info "🚀 Starting backend deployment..."
    if railway up --detach; then
        print_success "✅ Backend deployed successfully!"

        # Get backend URL
        print_info "📡 Getting backend URL..."
        railway status

        print_info "\n💡 If you don't have a public URL yet, run: railway domain"
    else
        print_error "❌ Backend deployment failed!"
        cd "$ORIGINAL_DIR" || exit
        exit 1
    fi

    cd "$ORIGINAL_DIR" || exit
    print_success "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
fi

# Wait between deployments
if [ "$DEPLOY_BACKEND" = true ] && [ "$DEPLOY_FRONTEND" = true ]; then
    print_info "\n⏳ Waiting 5 seconds before deploying frontend..."
    sleep 5
fi

# Deploy Frontend
if [ "$DEPLOY_FRONTEND" = true ]; then
    print_info "\n📦 Deploying Frontend..."
    print_info "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    cd client || exit 1

    # Check if linked
    if [ ! -d ".railway" ]; then
        print_warning "⚠️  Frontend not linked to Railway!"
        print_info "Run: railway link"
        cd "$ORIGINAL_DIR" || exit
        exit 1
    fi

    print_info "🚀 Starting frontend deployment..."
    if railway up --detach; then
        print_success "✅ Frontend deployed successfully!"

        # Get frontend URL
        print_info "📡 Getting frontend URL..."
        railway status

        print_info "\n💡 If you don't have a public URL yet, run: railway domain"
    else
        print_error "❌ Frontend deployment failed!"
        cd "$ORIGINAL_DIR" || exit
        exit 1
    fi

    cd "$ORIGINAL_DIR" || exit
    print_success "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
fi

# Final message
print_success "\n🎉 Deployment Complete!"
print_info "
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
"
