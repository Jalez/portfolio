# Portfolio with Secure Authentication & Database Testimonials

This portfolio now includes a complete testimonial system with **secure authentication** using Vercel Postgres, Google/Facebook OAuth, and **password-protected admin access**.

## 🔐 Security Features

- **OAuth Authentication:** Google/Facebook login for users
- **Secure Admin Login:** Password-protected admin access with bcrypt hashing
- **JWT Tokens:** 7-day expiration with secure token validation
- **Password Security:** bcrypt with salt rounds 12 for maximum security
- **Input Validation:** All endpoints validate and sanitize input
- **CORS Protection:** Proper cross-origin resource sharing configuration

## 🚀 Quick Start

1. **Set up database:** Run the updated `schema.sql` in your Vercel Postgres dashboard
2. **Configure environment:** Copy `.env.example` to `.env.local` and fill in your values
3. **Set admin password:** The default password is `AdminPass2025!` - **CHANGE THIS IMMEDIATELY**
4. **Deploy:** Push to Vercel and configure environment variables

## 📋 Complete Setup Guide

### 1. Database Setup (Vercel Postgres)

1. **Create a Vercel Postgres Database:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Create a new project or go to your existing project
   - Go to the "Storage" tab
   - Create a new Postgres database

2. **Run the database schema:**
   - Copy the contents of `schema.sql`
   - Go to your Vercel Postgres dashboard
   - Navigate to the "Query" tab
   - Paste and execute the SQL schema
   - **The admin user with email `jaakko.rajala@tuni.fi` will be created**

3. **Get your database connection details:**
   - From your Vercel Postgres dashboard, copy all the environment variables

### 2. OAuth Setup

#### Google OAuth Setup:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set authorized redirect URIs:
   - `http://localhost:5173/auth/google/callback` (development)
   - `https://your-domain.vercel.app/auth/google/callback` (production)
6. Copy your Client ID and Client Secret

#### Facebook OAuth Setup:
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add "Facebook Login" product
4. Set valid OAuth redirect URIs:
   - `http://localhost:5173/auth/facebook/callback` (development)  
   - `https://your-domain.vercel.app/auth/facebook/callback` (production)
5. Copy your App ID and App Secret

### 3. Environment Variables

Create a `.env.local` file in your project root:

```bash
# Database Configuration (from Vercel Postgres)
POSTGRES_URL="your-vercel-postgres-url"
POSTGRES_PRISMA_URL="your-vercel-postgres-prisma-url"
POSTGRES_URL_NON_POOLING="your-vercel-postgres-non-pooling-url"
POSTGRES_USER="your-postgres-user"
POSTGRES_HOST="your-postgres-host"
POSTGRES_PASSWORD="your-postgres-password"
POSTGRES_DATABASE="your-postgres-database"

# JWT Secret (generate a secure random string)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Google OAuth Configuration
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_REDIRECT_URI="https://your-domain.vercel.app/auth/google/callback"

# Facebook OAuth Configuration
FACEBOOK_CLIENT_ID="your-facebook-app-id"
FACEBOOK_CLIENT_SECRET="your-facebook-app-secret"
FACEBOOK_REDIRECT_URI="https://your-domain.vercel.app/auth/facebook/callback"

# Admin Configuration
ADMIN_EMAIL="jaakko.rajala@tuni.fi"

# Environment
NODE_ENV="production"
```

### 4. Vercel Deployment

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Add environment variables in Vercel Dashboard:**
   - Go to your project settings in Vercel
   - Navigate to "Environment Variables"
   - Add all the variables from your `.env.local` file

4. **Update the API base URL:**
   - In `api/auth/index.ts`
   - Replace `https://your-vercel-app.vercel.app` with your actual Vercel domain

### 5. Secure Admin Access

#### **Default Credentials:**
- **Email:** `jaakko.rajala@tuni.fi`
- **Password:** `AdminPass2025!`

#### **⚠️ IMPORTANT SECURITY STEPS:**

1. **Change the default password immediately after first login**
2. **Generate a new password hash if needed:**
   ```bash
   # Run this script to generate a new password hash
   node generate-admin-hash.js
   ```
3. **Update the database with the new hash:**
   ```sql
   UPDATE users SET password_hash = 'your-new-hash' WHERE email = 'jaakko.rajala@tuni.fi';
   ```

#### **Admin Login Process:**
1. Go to `/login`
2. Scroll to "Admin Access" section
3. Enter email: `jaakko.rajala@tuni.fi`
4. Enter password: `AdminPass2025!` (or your custom password)
5. Click "Admin Login"
6. You'll be redirected to `/admin`

#### **Admin Capabilities:**
- View all testimonials (approved and pending)
- Approve testimonials for public display
- Delete inappropriate testimonials
- Real-time statistics dashboard

## 🎯 Features

### For Users:
- **Google/Facebook Login:** Secure OAuth authentication
- **Easy Testimonial Submission:** Simple form with validation
- **Status Tracking:** Users can see if their testimonial is pending approval

### For Admins:
- **Secure Password Protection:** bcrypt-hashed passwords with salt
- **Full Management Dashboard:** View, approve, and delete testimonials
- **Real-time Stats:** Track total, approved, and pending testimonials
- **Secure Admin Access:** JWT-based authentication with admin privileges

### Technical Features:
- **Real Database:** Vercel Postgres with proper indexing
- **Serverless API:** Vercel functions for scalable backend
- **Type-Safe:** Full TypeScript implementation
- **Responsive Design:** Works on all devices
- **Security:** Password hashing, JWT tokens, input validation, CORS protection

## 🔧 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate new admin password hash
node generate-admin-hash.js
```

## 📁 Project Structure

```
├── api/                    # Vercel serverless functions
│   ├── auth.ts            # Authentication endpoints (with password verification)
│   ├── testimonials.ts    # Public testimonial endpoints
│   └── admin/             # Admin-only endpoints
├── components/            # React components
│   ├── Login.tsx         # OAuth login page (with secure admin form)
│   ├── TestimonialForm.tsx # User testimonial submission
│   ├── AdminDashboard.tsx # Admin management interface
│   └── Testimonials.tsx  # Public testimonial display
├── lib/                  # Core services
│   ├── database.ts       # Database operations (with password_hash support)
│   └── auth.ts          # Authentication utilities (bcrypt password handling)
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state management
├── schema.sql          # Database schema (with password_hash field)
└── generate-admin-hash.js # Password hash generator utility
```

## 🛡️ Security

- **Password Hashing:** bcrypt with 12 salt rounds
- **JWT Tokens:** 7-day expiration with secure secret
- **Admin-only Routes:** Protected by middleware with password verification
- **Input Validation:** All endpoints validate and sanitize input
- **CORS Protection:** Proper cross-origin configuration
- **Environment Variables:** Secure credential storage

## 📱 Usage

1. **Users** can visit your portfolio and sign in with Google/Facebook to leave testimonials
2. **You** log in as admin using your secure email/password combination
3. **You** can approve/reject testimonials in the admin dashboard
4. **Approved testimonials** appear in the public testimonials section

## 🆘 Troubleshooting

- **OAuth not working:** Check redirect URIs match exactly
- **Database errors:** Verify all environment variables are set
- **Admin access denied:** 
  - Ensure your email is in the database as admin
  - Verify you're using the correct password (`AdminPass2025!` by default)
  - Check that password_hash is properly set in database
- **API errors:** Check Vercel function logs in dashboard
- **Password issues:** Use `generate-admin-hash.js` to create new password hash

## 🔑 Password Management

### To Change Admin Password:

1. **Generate new hash:**
   ```bash
   # Edit the password in generate-admin-hash.js, then run:
   node generate-admin-hash.js
   ```

2. **Update database:**
   ```sql
   UPDATE users SET password_hash = 'new-generated-hash' WHERE email = 'jaakko.rajala@tuni.fi';
   ```

3. **Test login with new password**

## 🚀 What's Next?

You now have a fully secure testimonial system! Consider adding:
- Password change functionality in admin dashboard
- Email notifications for new testimonials
- Two-factor authentication for admin
- Rate limiting for login attempts
- Rich text editor for testimonials
- Automated spam detection