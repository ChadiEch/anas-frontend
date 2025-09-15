# CAD Craft Hub - Portfolio Application

A modern, professional portfolio website for mechanical engineers and CAD professionals, built with React, TypeScript, and a PostgreSQL backend.

## 🎯 Overview

CAD Craft Hub is a full-stack portfolio application featuring:
- **Public Portfolio**: Showcase projects, skills, and professional information
- **Admin Dashboard**: Complete content management system
- **PostgreSQL Backend**: Robust data persistence and API
- **Modern Frontend**: React 18 + TypeScript + Tailwind CSS

## 🏗️ Architecture

### Frontend
- **React 18.3.1** with TypeScript
- **Vite 5.4.1** for development and building
- **Tailwind CSS** + **shadcn/ui** for styling
- **React Query** for API state management
- **React Router** for navigation

### Backend
- **Node.js** + **Express** REST API
- **PostgreSQL** database
- **JWT Authentication** for admin access
- **bcrypt** for password hashing
- **CORS**, **Helmet**, **Rate Limiting** for security

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm

### 1. Clone and Install
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..
```

### 2. Database Setup
```sql
-- Create PostgreSQL database
CREATE DATABASE cad_craft_hub;
```

### 3. Configure Environment
```bash
# Backend configuration
cd backend
cp .env.example .env
# Edit .env with your database credentials and admin credentials

# Frontend configuration (already set)
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

### 4. Initialize Database
```bash
cd backend
npm run init-db
```

### 5. Start Services
```bash
# Terminal 1: Start backend (port 5000)
cd backend
npm run dev

# Terminal 2: Start frontend (port 8080)
npm run dev
```

### 6. Access Application
- **Portfolio**: http://localhost:8080
- **Admin Login**: http://localhost:8080/login
- **API**: http://localhost:5000/api

**Default Admin Credentials:**
- Email: `your_admin_email@example.com`
- Password: `your_secure_admin_password`

## 📁 Project Structure

```
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth & security
│   │   ├── config/         # Database config
│   │   └── scripts/        # Database initialization
│   ├── .env.example        # Environment template
│   └── package.json
├── src/                     # React frontend
│   ├── components/         # UI components
│   ├── pages/              # Route components
│   ├── lib/                # API client & utilities
│   ├── contexts/           # React contexts
│   └── hooks/              # Custom hooks
├── public/                  # Static assets
└── SETUP_GUIDE.md          # Detailed setup instructions
```

## 🔑 Features

### Public Portfolio
- **Hero Section**: Professional introduction with customizable content
- **About Section**: Experience and skills
- **Projects Grid**: Filterable portfolio projects
- **Skills Display**: Categorized technologies
- **Contact Form**: Professional contact information
- **Responsive Design**: Mobile-first approach
- **Downloadable CV**: PDF resume available for download

### Admin Dashboard
- **Authentication**: Secure JWT-based login
- **Project Management**: Full CRUD operations
- **About Editor**: Update personal information
- **Technology Manager**: Organize skills and tools
- **Homepage Editor**: Customize banner content and upload CV
- **Real-time Updates**: Changes reflect immediately

### Technical Features
- **Type Safety**: Full TypeScript implementation
- **Security**: JWT auth, password hashing, rate limiting
- **Performance**: Optimized builds, lazy loading
- **Developer Experience**: Hot reload, ESLint, error handling

## 🗄️ Database Schema

### Tables
- **profiles**: Admin user authentication
- **projects**: Portfolio projects with metadata
- **about**: Personal/professional information
- **technologies**: Skills organized by category
- **homepage_settings**: Banner content and CV information

### Key Features
- UUID primary keys
- Timestamp tracking
- Array fields for flexible data
- Proper constraints and indexes

## 🔐 API Endpoints

### Public Endpoints
```
GET  /api/projects      # Get all projects
GET  /api/technologies  # Get all technologies  
GET  /api/about         # Get about information
GET  /api/homepage      # Get homepage settings
GET  /api/health        # Health check
```

### Admin Endpoints (Authentication Required)
```
POST /api/auth/login    # Admin login
GET  /api/auth/verify   # Verify token

# Projects
POST   /api/projects    # Create project
PUT    /api/projects/:id # Update project
DELETE /api/projects/:id # Delete project

# Technologies  
POST   /api/technologies    # Create technology
PUT    /api/technologies/:id # Update technology
DELETE /api/technologies/:id # Delete technology

# About
PUT /api/about          # Update about information

# Homepage
PUT /api/homepage       # Update homepage settings
POST /api/homepage/upload-cv # Upload CV
```

## 🛠️ Development

### Frontend Development
```bash
npm run dev     # Start dev server
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
```

### Backend Development
```bash
cd backend
npm run dev     # Start with nodemon
npm start       # Start production server
npm run init-db # Initialize database
```

## ☁️ Deployment

### Railway Deployment

This application can be deployed to Railway using the provided configuration files:

1. Create a new Railway project
2. Connect your GitHub repository
3. Railway will automatically detect the project type
4. Set the `VITE_API_URL` environment variable to point to your backend service
5. The application will build and deploy automatically

For detailed instructions, see [RAILWAY_DEPLOYMENT_GUIDE.md](RAILWAY_DEPLOYMENT_GUIDE.md)

## 🚀 Deployment

### Production Checklist
- [ ] Set strong JWT_SECRET
- [ ] Configure production database
- [ ] Set NODE_ENV=production
- [ ] Update CORS origins
- [ ] Enable HTTPS
- [ ] Set up reverse proxy
- [ ] Configure environment variables
- [ ] Test all functionality

### Deployment Options
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, DigitalOcean, AWS
- **Database**: PostgreSQL on cloud providers

## 🧾 Customization Guide

For detailed instructions on using the new Homepage Editor features, see [HOMEPAGE_EDITOR_GUIDE.md](./HOMEPAGE_EDITOR_GUIDE.md)

## 🔧 Troubleshooting

### Common Issues
1. **Database connection failed**: Check PostgreSQL service and credentials
2. **CORS errors**: Verify API URL and CORS configuration
3. **Auth issues**: Check JWT secret and token storage
4. **Port conflicts**: Change ports in environment files

### Getting Help
- Check browser console for errors
- Verify API responses at `/api/health`
- Test database connection
- Review setup guide for missing steps

## 🎨 Customization

### Branding
- Update colors in `tailwind.config.ts`
- Modify hero section in `src/pages/Index.tsx`
- Change logos and favicon in `public/`

### Content
- Default data in `backend/src/scripts/initDatabase.js`
- Admin credentials in `.env` files
- API endpoints in `backend/src/routes/`

## 📄 License

MIT License - feel free to use this project for your own portfolio!

---

**Built with ❤️ for mechanical engineers and CAD professionals**