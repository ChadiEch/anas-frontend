# CV Access Fix Summary

This document explains the issue with CV file access and how it was fixed.

## Issue

The CV file uploaded through the admin dashboard was not accessible at http://localhost:8080/cv.pdf, returning a 404 error.

## Root Cause

1. The CV file is stored in the backend's public directory and served by the backend server (port 5000)
2. The frontend is running on a different server (port 8080)
3. The frontend was trying to access the CV file through the frontend server instead of the backend server
4. There was no proxy configuration to forward requests from the frontend to the backend

## Solution

1. **Added proxy configuration** to the Vite config ([vite.config.ts](vite.config.ts)):
   - Proxy requests to `/api` endpoints to the backend server
   - Proxy requests to `/cv.pdf` to the backend server

2. **Updated the frontend code** ([src/pages/Index.tsx](src/pages/Index.tsx)):
   - Added a function to generate the correct CV URL based on the environment
   - In development mode, use the relative path (proxy handles the forwarding)
   - In production mode, use the full backend URL

## Files Modified

- [vite.config.ts](vite.config.ts) - Added proxy configuration
- [src/pages/Index.tsx](src/pages/Index.tsx) - Updated CV URL generation

## How to Test

1. Restart both the backend and frontend servers:
   - Backend: `cd backend && npm run dev`
   - Frontend: `npm run dev`

2. Upload a CV file through the admin dashboard:
   - Log in to the admin dashboard
   - Navigate to the Homepage Editor
   - Upload a PDF CV file

3. Visit the homepage and click the "Download Resume" button:
   - The CV should now download correctly

## Technical Details

The proxy configuration forwards requests from:
- http://localhost:8080/api/* → http://localhost:5000/api/*
- http://localhost:8080/cv.pdf → http://localhost:5000/cv.pdf

This allows the frontend to access backend resources as if they were served from the same origin, avoiding CORS issues and making the CV file accessible.