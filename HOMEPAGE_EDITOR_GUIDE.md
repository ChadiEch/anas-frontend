# Homepage Editor Guide

This guide explains how to use the new Homepage Editor feature in the CAD Craft Hub admin dashboard.

## New Features

1. **Editable Homepage Banner Content**: You can now customize the title, subtitle, and description in the homepage banner from the admin dashboard.
2. **CV Upload and Download**: Upload your CV as a PDF file and make it available for download through the "Download Resume" button on the homepage.
3. **Enhanced Admin Dashboard**: Added a new "Homepage" card to the dashboard for easy access to homepage editing features.

## Setup Instructions

### 1. Environment Variables

Update your environment variables in the backend `.env` file:

```env
# Admin Credentials (change these for security)
ADMIN_EMAIL=your_admin_email@example.com
ADMIN_PASSWORD=your_secure_admin_password

# JWT Secret (change this in production)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### 2. Database Initialization

Run the database initialization script to create the new homepage settings table:

```bash
cd backend
npm run init-db
```

### 3. Accessing the Homepage Editor

1. Navigate to the admin dashboard at `http://localhost:8080/login`
2. Log in with your admin credentials
3. Click on the "Homepage" card in the dashboard
4. Edit the banner content and upload your CV

## Using the Homepage Editor

### Editing Banner Content

1. In the Homepage Editor, you'll see a form for "Banner Content"
2. Update the fields:
   - **Banner Title**: Your main title (e.g., "Mechanical Engineer")
   - **Banner Subtitle**: A short tagline (e.g., "Designing innovative solutions")
   - **Banner Description**: A longer description of your skills
3. Click "Update Banner Content" to save changes

### Uploading Your CV

1. In the Homepage Editor, scroll to the "CV Management" section
2. Click the upload area or drag and drop a PDF file
3. Only PDF files are accepted (max 10MB)
4. After upload, a success message will appear
5. The "Download Resume" button on the homepage will now be functional

## Technical Details

### New API Endpoints

- `GET /api/homepage` - Get homepage settings
- `PUT /api/homepage` - Update homepage settings
- `POST /api/homepage/upload-cv` - Upload CV file

### Database Schema

A new table `homepage_settings` has been added with the following fields:
- `banner_title` - The main title for the homepage banner
- `banner_subtitle` - The subtitle for the homepage banner
- `banner_description` - The description text for the homepage banner
- `cv_file_path` - Path to the uploaded CV file
- `created_at` - Timestamp when the record was created
- `updated_at` - Timestamp when the record was last updated

## Security Notes

1. Always change the default admin credentials in your `.env` file
2. Change the JWT secret for production deployments
3. Only administrators can access the homepage editor
4. CV files are stored in the `public` directory and are publicly accessible via the URL