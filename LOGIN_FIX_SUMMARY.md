# Login Fix Summary

This document explains the issue with the login credentials and how it was fixed.

## Issue

The login with the credentials:
- Email: admin@example.com
- Password: admin123

was failing with "Invalid credentials" error.

## Root Cause

Upon investigation, we found that the database contained two user records:
1. Old test user: admin@cadcraft.com (with password "admin123")
2. New user: admin@example.com (with password "admin123")

The database initialization script was using INSERT OR REPLACE which was creating a new record instead of updating the existing one, leading to a unique constraint violation on the email field.

## Solution

1. **Created a cleanup script** ([cleanup-database.js](cleanup-database.js)) that:
   - Deletes all existing users from the database
   - Creates a single admin user with the correct credentials from the environment variables

2. **Ran the cleanup script** to ensure only one user exists with the correct email

3. **Verified the fix** by checking the database contents

## Files Created

- [cleanup-database.js](cleanup-database.js) - Script to clean up duplicate users and create a single admin user
- [check-users.js](check-users.js) - Script to verify database contents

## How to Test

1. Visit the login page at http://localhost:8080/login
2. Enter the credentials:
   - Email: admin@example.com
   - Password: admin123
3. You should now be able to log in successfully

## Prevention

For future database initializations, the [initDatabase.js](backend/src/scripts/initDatabase.js) script has been updated to:
1. Check if any user exists
2. Update the existing user if found
3. Create a new user only if no users exist

This prevents the duplicate user issue from occurring again.