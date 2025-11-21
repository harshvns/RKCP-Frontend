# Troubleshooting API Connection Issues

## Current Fix Applied

The API URL configuration now uses **hostname detection** instead of relying on Vite environment variables. This ensures:
- ✅ Localhost (development) → Uses Vite proxy (empty string)
- ✅ Production (any other hostname) → Always uses `https://rkcp-score.vercel.app`

## How to Verify It's Working

### 1. Check Browser Console

After deployment, open your deployed site and check the browser console (F12):

You should see:
```
🔗 API Configuration: {
  hostname: "your-vercel-domain.vercel.app",
  mode: "production",
  viteApiUrl: "(not set)",
  apiBaseUrl: "https://rkcp-score.vercel.app",
  fullUrl: "https://rkcp-score.vercel.app/api/stock"
}
```

### 2. Check Network Tab

1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Try to load stocks
4. Look for requests to: `https://rkcp-score.vercel.app/api/stock`
5. Check the response status:
   - ✅ **200** = Success
   - ❌ **CORS error** = Backend CORS issue
   - ❌ **404** = Wrong URL
   - ❌ **Failed to fetch** = Network/connectivity issue

### 3. Test Backend Directly

Open in browser: https://rkcp-score.vercel.app/health

Should return:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "..."
}
```

## Common Issues

### Issue 1: Still Getting "Network error"

**Possible causes:**
1. **Backend is down** - Check https://rkcp-score.vercel.app/health
2. **CORS issue** - Check browser console for CORS errors
3. **Cache issue** - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

**Solution:**
- Check backend health endpoint
- Check browser console for specific error messages
- Clear browser cache and try again

### Issue 2: CORS Error

If you see CORS errors in console:
- Backend should allow all origins (`*`)
- Check backend CORS configuration
- Verify backend is deployed correctly

### Issue 3: Wrong URL in Console

If console shows wrong URL:
- Check the `apiBaseUrl` in console log
- Should be: `https://rkcp-score.vercel.app`
- If it's empty or wrong, the hostname detection might be failing

## Manual Override

If you need to override the API URL:

1. **Set Environment Variable in Vercel:**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://rkcp-score.vercel.app`
   - Redeploy

2. **Or modify code directly:**
   - Edit `src/services/api.js`
   - Change `PRODUCTION_API_URL` constant
   - Commit and push

## Still Not Working?

1. **Check Vercel Build Logs:**
   - Go to Vercel Dashboard → Deployments
   - Click on latest deployment
   - Check build logs for errors

2. **Check Browser Console:**
   - Look for the `🔗 API Configuration:` log
   - Check what `apiBaseUrl` is set to
   - Check Network tab for actual requests

3. **Test Backend:**
   - Visit: https://rkcp-score.vercel.app/health
   - Visit: https://rkcp-score.vercel.app/api/stock?limit=1
   - Both should return data

4. **Contact Support:**
   - Share the console log output
   - Share the Network tab screenshot
   - Share the Vercel build logs





