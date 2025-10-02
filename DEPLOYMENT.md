# Deployment Guide

This guide will help you deploy your Recipe Finder app with GitHub Pages (frontend) and Vercel (backend).

## ✨ GitHub Pages Status

**✅ GitHub Pages deployment is now automated!** 

The repository is configured with GitHub Actions that automatically deploy the frontend to GitHub Pages when changes are pushed to the main branch. See Step 4 below for details.

## 🎯 Quick Deployment Checklist

- [ ] Get Spoonacular API key
- [ ] Deploy backend to Vercel
- [ ] Update frontend configuration
- [x] Deploy frontend to GitHub Pages (Automated with GitHub Actions)
- [ ] Test the live application

## 📋 Step-by-Step Instructions

### Step 1: Get Spoonacular API Key

1. Go to [Spoonacular API](https://spoonacular.com/food-api)
2. Sign up for a free account
3. Navigate to your dashboard
4. Copy your API key

### Step 2: Deploy Backend to Vercel

1. **Fork this repository** to your GitHub account

2. **Go to [Vercel](https://vercel.com)** and sign up/login

3. **Import your project:**
   - Click "New Project"
   - Import from GitHub
   - Select your forked repository

4. **Configure the deployment:**
   - Set **Root Directory** to `backend`
   - Framework Preset: Other
   - Build Command: `npm install`
   - Output Directory: (leave empty)
   - Install Command: `npm install`

5. **Add environment variables:**
   - Go to Settings → Environment Variables
   - Add: `SPOONACULAR_API_KEY` = your API key from Step 1

6. **Deploy!** Click "Deploy"

7. **Copy your backend URL** (e.g., `https://your-app-name.vercel.app`)

### Step 3: Update Frontend Configuration

1. **Open `config.js`** in your repository

2. **Update the production backend URL:**
   ```javascript
   production: {
       backendURL: 'https://your-actual-backend-url.vercel.app/api'
   }
   ```

3. **Commit and push** the changes to GitHub

### Step 4: Deploy Frontend to GitHub Pages

**✅ GitHub Pages is now configured with automatic deployment!**

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages when changes are pushed to the main branch.

**What happens automatically:**
1. When you push to the `main` branch, GitHub Actions triggers
2. The workflow builds and deploys your site to GitHub Pages
3. Your site becomes available at: `https://jeelan80.github.io/Recipie-Finder`

**Manual deployment option:**
- Go to the "Actions" tab in your GitHub repository
- Select "Deploy to GitHub Pages" workflow
- Click "Run workflow" to manually trigger a deployment

**First-time setup (one-time only):**
If this is your first deployment, you may need to:
1. Go to your repository settings on GitHub
2. Navigate to Pages section (left sidebar)
3. Verify Source is set to "GitHub Actions"
4. If not, select "GitHub Actions" as the source

### Step 5: Test Your Application

1. **Visit your GitHub Pages URL**
2. **Add some ingredients** (e.g., chicken, tomato, pasta)
3. **Click "Find Recipes"**
4. **Verify recipes load** from your backend
5. **Test "View Full Recipe"** functionality

## 🔧 Troubleshooting

### Backend Issues

**Problem**: API returns 500 error
- **Solution**: Check Vercel logs, ensure API key is set correctly

**Problem**: CORS errors
- **Solution**: Update CORS origins in `backend/server.js` to include your GitHub Pages URL

### Frontend Issues

**Problem**: No recipes loading
- **Solution**: Check browser console, verify backend URL in `config.js`

**Problem**: "View Full Recipe" not working
- **Solution**: Check network tab for API errors

### Common Issues

**Problem**: Mixed content errors (HTTP/HTTPS)
- **Solution**: Ensure backend URL uses HTTPS

**Problem**: API key not working
- **Solution**: Verify API key is correct and has sufficient quota

## 🚀 Alternative Deployment Options

### Backend Alternatives

#### Render
1. Go to [Render](https://render.com)
2. Connect GitHub repository
3. Create Web Service
4. Set build: `npm install`
5. Set start: `npm start`
6. Add environment variable

#### Railway
1. Go to [Railway](https://railway.app)
2. Connect GitHub repository
3. Add environment variable
4. Auto-deploys!

### Frontend Alternatives

#### Netlify
1. Go to [Netlify](https://netlify.com)
2. Drag and drop your project folder
3. Update backend URL in config

#### Vercel (Frontend)
1. Deploy frontend separately to Vercel
2. Set root directory to `/` (root)

## 📊 Monitoring

### Check Backend Health
Visit: `https://your-backend-url.vercel.app`

### Check API Endpoints
- Search: `https://your-backend-url.vercel.app/api/recipes/search?ingredients=chicken`
- Recipe: `https://your-backend-url.vercel.app/api/recipes/123456`

## 🔒 Security Notes

- API key is stored securely in backend environment variables
- Frontend never exposes the API key
- CORS is configured to only allow your domain
- All API calls go through your backend proxy

## 📈 Scaling Considerations

- Spoonacular free tier: 150 requests/day
- Vercel free tier: 100GB bandwidth/month
- GitHub Pages: Unlimited static hosting
- Consider upgrading plans for production use

## 🎉 You're Done!

Your Recipe Finder app is now live with:
- ✅ Secure API key management
- ✅ Professional deployment setup
- ✅ Scalable architecture
- ✅ Free hosting (within limits)

Share your live app URL and enjoy your deployed Recipe Finder!