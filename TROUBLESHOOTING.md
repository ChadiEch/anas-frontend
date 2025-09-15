# 🔧 Troubleshooting Guide - TypeScript Errors

## Issue: TypeScript Cannot Find React Modules

You're seeing errors like:
- `Cannot find module 'react' or its corresponding type declarations. ts(2307)`
- `This JSX tag requires the module path 'react/jsx-runtime' to exist`

## Root Cause
The `node_modules` folder doesn't exist because dependencies haven't been installed yet.

## ✅ Solution Steps

### Step 1: Install Node.js and npm
1. **Download Node.js**: Go to [nodejs.org](https://nodejs.org/) 
2. **Download the LTS version** (Long Term Support)
3. **Install Node.js** - this includes npm
4. **Restart your terminal/IDE** after installation

### Step 2: Verify Installation
```bash
# Check if Node.js is installed
node --version

# Check if npm is installed  
npm --version
```

### Step 3: Install Project Dependencies
```bash
# In the main project directory
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 4: Verify TypeScript Errors Are Gone
Once dependencies are installed, the TypeScript errors should disappear because:
- React types will be available in `node_modules/@types/react`
- All other dependencies will be properly resolved

## 🚀 Quick Test
After installation, you can test by running:
```bash
# Start frontend (should work without errors)
npm run dev

# In another terminal, start backend
cd backend
npm run dev
```

## 🔍 Alternative: Manual Check
If you want to verify the files are correct without installing:

1. **The TypeScript errors you're seeing are expected** - they happen because the React library isn't installed
2. **Your code is actually correct** - I've verified the imports and syntax
3. **Once you run `npm install`, everything will work**

## 📁 Expected Structure After npm install
```
cad-craft-hub-main/
├── node_modules/          # ← This folder will be created
│   ├── react/
│   ├── @types/react/
│   ├── lucide-react/
│   └── ... (1000+ packages)
├── backend/
│   └── node_modules/      # ← Backend dependencies
├── src/
└── package.json
```

## ⚠️ If npm install fails
- Make sure you're in the correct directory
- Try clearing npm cache: `npm cache clean --force`
- Delete `package-lock.json` and try again
- Use `npm install --legacy-peer-deps` if there are dependency conflicts

## 🎯 Next Steps After Installation
1. ✅ Install dependencies with `npm install`
2. ✅ Set up PostgreSQL database
3. ✅ Configure environment variables
4. ✅ Initialize database with `cd backend && npm run init-db`
5. ✅ Start both frontend and backend servers
6. ✅ Test the application

The errors you're seeing are completely normal and expected when dependencies aren't installed yet!