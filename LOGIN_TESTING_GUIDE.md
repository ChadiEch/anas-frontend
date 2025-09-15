# 🔐 Admin Login Testing Guide

## Overview
The CAD Craft Hub application has a complete JWT-based authentication system with admin login functionality. Here's how to test the login credentials and access the admin dashboard.

## 🎯 Default Admin Credentials

### Primary Test Account
- **Email**: `admin@cadcraft.com`
- **Password**: `admin123`
- **Role**: Administrator (Full Access)

## 🚀 How to Test Login

### Step 1: Start the Application

1. **Start Backend Server** (Terminal 1):
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Backend should be running on `http://localhost:5000`

2. **Start Frontend Server** (Terminal 2):
   ```bash
   npm install
   npm run dev
   ```
   Frontend should be running on `http://localhost:8080`

### Step 2: Access Login Page

1. **Open your browser** and go to: `http://localhost:8080`
2. **Navigate to Login** by clicking "Admin Login" or go directly to: `http://localhost:8080/login`

### Step 3: Test Login Credentials

#### Method 1: Manual Entry
1. Enter **Email**: `admin@cadcraft.com`
2. Enter **Password**: `admin123`
3. Click **"Sign In"**

#### Method 2: Use Auto-Fill Button
1. Click the **"Fill Test Credentials"** button on the login page
2. Credentials will be automatically filled
3. Click **"Sign In"**

### Step 4: Verify Successful Login

After successful login, you should:
1. ✅ See a success toast notification
2. ✅ Be redirected to `/dashboard`
3. ✅ See the Admin Dashboard with three cards:
   - **Projects** (Manage Projects)
   - **About** (Edit About)
   - **Technologies** (Edit Technologies)

## 🔍 Testing Different Scenarios

### ✅ Valid Login Test
- **Email**: `admin@cadcraft.com`
- **Password**: `admin123`
- **Expected**: Success + Dashboard redirect

### ❌ Invalid Email Test
- **Email**: `wrong@email.com`
- **Password**: `admin123`
- **Expected**: Error toast "Invalid credentials"

### ❌ Invalid Password Test
- **Email**: `admin@cadcraft.com`
- **Password**: `wrongpassword`
- **Expected**: Error toast "Invalid credentials"

### ❌ Empty Fields Test
- **Email**: *(empty)*
- **Password**: *(empty)*
- **Expected**: HTML5 validation error

### 🔒 Protected Routes Test
1. Try accessing `/dashboard` without login
2. **Expected**: Redirect to `/login`

## 🎛️ Admin Dashboard Features to Test

After successful login, test these admin features:

### 1. Project Management (`/dashboard/projects`)
- ✅ View existing projects
- ✅ Create new project
- ✅ Edit existing project
- ✅ Delete project
- ✅ Mark project as featured

### 2. About Section Editor (`/dashboard/about`)
- ✅ Edit personal content
- ✅ Update years of experience
- ✅ Modify skills list

### 3. Technology Manager (`/dashboard/technologies`)
- ✅ View all technologies
- ✅ Add new technology with category/icon/color
- ✅ Edit existing technology
- ✅ Delete technology

### 4. Logout Functionality
- ✅ Click "Logout" button in dashboard header
- ✅ Should clear authentication
- ✅ Redirect to homepage

## 🔧 API Testing (Advanced)

### Test Login API Directly
```bash
# Test login endpoint
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@cadcraft.com",
    "password": "admin123"
  }'
```

**Expected Response**:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "admin@cadcraft.com",
    "full_name": "Admin User"
  }
}
```

### Test Token Verification
```bash
# Replace YOUR_TOKEN with the token from login response
curl -X GET http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🐛 Troubleshooting Login Issues

### Issue: "Network Error" or "Cannot connect to API"
**Solution**:
1. Ensure backend is running on port 5000
2. Check `VITE_API_URL` in `.env` file
3. Verify no CORS errors in browser console

### Issue: "Invalid credentials" with correct password
**Solution**:
1. Ensure database is initialized: `cd backend && npm run init-db`
2. Check PostgreSQL is running
3. Verify `.env` database credentials

### Issue: "JWT Secret not set"
**Solution**:
1. Check `backend/.env` has `JWT_SECRET` set
2. Restart backend server after changing `.env`

### Issue: Token expires immediately
**Solution**:
1. Check system time is correct
2. Verify JWT secret is consistent
3. Token expires in 24 hours by default

## 🎯 Expected Login Flow

```
1. User visits /login
2. Enters admin@cadcraft.com / admin123
3. Frontend sends POST to /api/auth/login
4. Backend validates credentials against PostgreSQL
5. Backend generates JWT token
6. Frontend stores token in localStorage
7. User redirected to /dashboard
8. Protected routes now accessible
9. API calls include Authorization header
```

## 📱 Mobile Testing

The login page is responsive. Test on:
- ✅ Desktop (1920x1080)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667)

## 🔄 Session Management

- **Session Duration**: 24 hours
- **Auto-logout**: When token expires
- **Remember login**: Stored in localStorage
- **Multi-tab**: Works across browser tabs

## 🎨 UI/UX Features

- ✅ Loading states during login
- ✅ Success/error toast notifications
- ✅ Form validation
- ✅ Auto-fill test credentials button
- ✅ Responsive design
- ✅ Gradient background
- ✅ Clear typography and spacing

The login system is production-ready with proper security, validation, and user experience!