# Vercel Deployment Fix - API URL Issue

## Problem
The deployed frontend on Vercel was showing:
```
Network error: Unable to connect to API at https://rkcp-score.vercel.app
```

## Root Cause
The API URL configuration was not correctly detecting production mode in Vite builds, causing `API_BASE_URL` to be empty or undefined in production.

## Solution
Updated `src/services/api.js` to:
1. Explicitly check for development mode using both `import.meta.env.MODE` and `import.meta.env.DEV`
2. Always default to production URL (`https://rkcp-score.vercel.app`) when not in development
3. Added debug logging for development

## Changes Made
- Updated API_BASE_URL logic to be more explicit
- Added `DEFAULT_API_URL` constant for clarity
- Improved development mode detection

## Deployment Steps

1. **Code is already pushed to GitHub** ✅
   - The fix has been committed and pushed

2. **Vercel will auto-deploy** (if connected to GitHub)
   - Vercel will automatically detect the push and redeploy
   - Wait for deployment to complete (usually 1-2 minutes)

3. **Optional: Set Environment Variable in Vercel**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://rkcp-score.vercel.app`
   - This is optional since the code now defaults to this URL

4. **Verify Deployment**
   - Check your Vercel deployment URL
   - The API should now connect correctly

## Alternative: Manual Environment Variable

If you want to explicitly set the API URL in Vercel:

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://rkcp-score.vercel.app`
   - **Environment**: Production, Preview, Development (select all)
5. Redeploy

## Testing

After deployment, test:
- ✅ Search functionality
- ✅ View All Stocks
- ✅ Stock Details page
- ✅ Screener links

All should work correctly now!





