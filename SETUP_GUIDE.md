# CAD Craft Hub - Complete Setup Guide

This guide will help you set up the complete CAD Craft Hub application with the new PostgreSQL backend.

## Prerequisites

Before starting, ensure you have the following installed:

1. **Node.js 18+** - [Download from nodejs.org](https://nodejs.org/)
2. **PostgreSQL 12+** - [Download from postgresql.org](https://www.postgresql.org/download/)
3. **Git** (optional) - [Download from git-scm.com](https://git-scm.com/)

## Step 1: Database Setup

### Install and Start PostgreSQL

1. Install PostgreSQL on your system
2. Start the PostgreSQL service
3. Create a database:

```sql
-- Connect to PostgreSQL as superuser
CREATE DATABASE cad_craft_hub;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE cad_craft_hub TO postgres;
```

Or use the default postgres user with your chosen password.

## Step 2: Backend Setup

### Install Dependencies

```bash
cd backend
npm install
```

### Configure Environment

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Edit `.env` file with your database credentials:
```env
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cad_craft_hub
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# JWT Secret (change this in production)
JWT_SECRET=cad_craft_hub_super_secret_jwt_key_2024

# Admin Credentials
ADMIN_EMAIL=admin@cadcraft.com
ADMIN_PASSWORD=admin123
```

### Initialize Database

```bash
npm run init-db
```

This will create all necessary tables and insert default data.

### Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

The backend will be available at `http://localhost:5000`

## Step 3: Frontend Setup

### Install Dependencies

```bash
# In the main project directory (not backend folder)
npm install
```

### Configure Environment

1. The `.env` file is already configured to point to `http://localhost:5000/api`
2. If you need to change the API URL, edit `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### Start Frontend Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:8080`

## Step 4: Test the Application

### Access the Application

1. **Portfolio Website**: `http://localhost:8080`
2. **Admin Login**: `http://localhost:8080/login`
3. **API Health Check**: `http://localhost:5000/api/health`

### Default Admin Credentials

- **Email**: `admin@cadcraft.com`
- **Password**: `admin123`

### Test Admin Features

1. Log in to the admin dashboard
2. Try creating/editing projects
3. Update the about section
4. Manage technologies
5. Verify changes appear on the main portfolio

## Step 5: Verify Everything Works

### Check Backend API

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test projects endpoint
curl http://localhost:5000/api/projects

# Test about endpoint
curl http://localhost:5000/api/about

# Test technologies endpoint
curl http://localhost:5000/api/technologies
```

### Test Admin Authentication

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cadcraft.com","password":"admin123"}'
```

## Troubleshooting

### Database Connection Issues

1. **Error: "database does not exist"**
   - Create the database: `CREATE DATABASE cad_craft_hub;`

2. **Error: "password authentication failed"**
   - Check your `.env` file credentials
   - Verify PostgreSQL user exists and password is correct

3. **Error: "connection refused"**
   - Ensure PostgreSQL service is running
   - Check if PostgreSQL is listening on port 5432

### Backend Issues

1. **Error: "npm command not found"**
   - Install Node.js from nodejs.org
   - Restart your terminal after installation

2. **Error: "Port 5000 already in use"**
   - Change PORT in `.env` file
   - Or stop the process using port 5000

3. **Error: "JWT secret not set"**
   - Ensure JWT_SECRET is set in `.env` file

### Frontend Issues

1. **Error: "Network Error" when logging in**
   - Ensure backend is running on port 5000
   - Check VITE_API_URL in `.env` file

2. **Error: "Cannot connect to API"**
   - Verify backend is accessible at `http://localhost:5000/api/health`
   - Check browser console for CORS errors

## Production Deployment

### Backend Deployment

1. Set environment variables:
   - `NODE_ENV=production`
   - Strong `JWT_SECRET`
   - Production database credentials
   - Allowed CORS origins

2. Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start src/server.js --name "cad-craft-hub-api"
```

### Frontend Deployment

1. Build the frontend:
```bash
npm run build
```

2. Serve the `dist` folder using a web server (nginx, Apache, or static hosting)

3. Update `VITE_API_URL` to point to your production API

## Architecture Overview

### Backend (Node.js + Express + PostgreSQL)
- **Port**: 5000
- **Database**: PostgreSQL with 4 main tables
- **Authentication**: JWT tokens
- **API**: RESTful endpoints for all operations

### Frontend (React + Vite + TypeScript)
- **Port**: 8080 (development)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Context + React Query

### Database Schema
- **profiles**: Admin users with authentication
- **projects**: Portfolio projects with technologies
- **about**: Personal information and skills
- **technologies**: Technical skills with categories

## API Endpoints

### Public Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/technologies` - Get all technologies
- `GET /api/about` - Get about information
- `GET /api/health` - Health check

### Admin Endpoints (Require Authentication)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token
- `POST|PUT|DELETE /api/projects/*` - Manage projects
- `POST|PUT|DELETE /api/technologies/*` - Manage technologies
- `PUT /api/about` - Update about information

## Support

If you encounter any issues:

1. Check this README for common solutions
2. Verify all prerequisites are installed
3. Check the browser console and terminal for error messages
4. Ensure both frontend and backend servers are running
5. Test API endpoints directly using curl or Postman

The application should now work exactly like the original Supabase version, but with a proper PostgreSQL backend that you have full control over!