# Railway Deployment Guide for CAD Craft Hub Frontend

## Prerequisites
1. A Railway account (https://railway.app)
2. Your frontend code pushed to a GitHub repository
3. Your backend deployed to Railway (separate service)

## Deployment Steps

### 1. Deploy the Frontend

1. Go to Railway.app and create a new project
2. Select "Deploy from GitHub repo" and choose your frontend repository
3. Railway should automatically detect this as a Node.js project

### 2. Configure Environment Variables

In your Railway project dashboard:
1. Go to your frontend service
2. Click on "Settings" → "Variables"
3. Add the following environment variable:
   ```
   VITE_API_URL=https://anas-backend.railway.internal/api
   ```

### 3. Configure Custom Domain (Optional)

If you want to use a custom domain:
1. In your Railway project, go to "Settings" → "Domains"
2. Add your custom domain
3. Follow Railway's instructions to configure DNS

### 4. Fixing the 405 Method Not Allowed Error

The error you're seeing is because the frontend is trying to access the backend at an incorrect URL. Here's how to fix it:

1. Make sure your backend is deployed and running on Railway
2. Update the `VITE_API_URL` environment variable in Railway to point to your backend service
3. The format should be: `https://anas-backend.railway.internal/api`

### 5. Redeploy

After making these changes:
1. Railway will automatically redeploy your application
2. Check the deployment logs for any errors
3. Visit your application URL to test

## Troubleshooting

### Common Issues

1. **405 Method Not Allowed**: This usually means the frontend is trying to access an endpoint that doesn't exist or the URL is incorrect.
   - Solution: Verify that `VITE_API_URL` is set to `https://anas-backend.railway.internal/api`

2. **CORS Errors**: If you see CORS errors in the browser console:
   - Make sure your backend is configured to accept requests from your frontend domain
   - Check your backend's CORS configuration

3. **Blank Page**: If you see a blank page:
   - Check the browser console for JavaScript errors
   - Ensure all environment variables are correctly set

### Checking Logs

To debug issues:
1. In Railway, go to your service
2. Click on "Deployments" to see build logs
3. Click on "Settings" → "Logs" to see runtime logs

## Best Practices

1. Always use environment variables for URLs and secrets
2. Test your application locally before deploying
3. Monitor your application after deployment
4. Set up health checks for your services