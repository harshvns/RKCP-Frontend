# Vercel Environment Variable Setup

## Quick Fix: Set Environment Variable in Vercel

If the API URL is still not working after the code fix, set the environment variable explicitly in Vercel:

### Steps:

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Sign in and select your project

2. **Navigate to Settings**
   - Click on your project
   - Go to **Settings** → **Environment Variables**

3. **Add Environment Variable**
   - Click **Add New**
   - **Name**: `VITE_API_URL`
   - **Value**: `https://rkcp-score.vercel.app`
   - **Environment**: Select all (Production, Preview, Development)
   - Click **Save**

4. **Redeploy**
   - Go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Click **Redeploy**
   - Or push a new commit to trigger auto-deploy

## Verify It's Working

After redeploying, check the browser console:
- Open your deployed site
- Open Developer Tools (F12)
- Check Console tab
- You should see: `API Configuration: { mode: 'production', apiBaseUrl: 'https://rkcp-score.vercel.app', ... }`

## Alternative: Check Build Logs

1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Check the build logs to see if there are any errors
4. Verify the build completed successfully

## Still Not Working?

If it's still not working after setting the environment variable:

1. **Check Backend is Accessible**
   - Visit: https://rkcp-score.vercel.app/health
   - Should return: `{"success":true,"message":"Server is running",...}`

2. **Check CORS**
   - Backend should allow all origins (`*`)
   - Check browser console for CORS errors

3. **Check Network Tab**
   - Open Developer Tools → Network tab
   - Try to load stocks
   - Check if requests are being made to the correct URL
   - Check response status codes

4. **Clear Browser Cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or clear browser cache

