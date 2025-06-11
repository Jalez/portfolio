# Portfolio with Anonymous Testimonials & Admin Dashboard

This portfolio includes a complete testimonial system where **anyone can submit testimonials** without authentication, and you have **secure admin access** to moderate and manage them.

## 🔐 Security Features

- **Open Testimonial Submissions:** Anyone can submit testimonials with their name, title, and company
- **Secure Admin Login:** Password-protected admin access with bcrypt hashing for moderation
- **JWT Tokens:** 7-day expiration with secure token validation for admin sessions
- **Input Validation:** All endpoints validate and sanitize input
- **CORS Protection:** Proper cross-origin resource sharing configuration
- **Admin Moderation:** All testimonials require approval before being displayed

## 🚀 Quick Start

1. **Set up database:** Run the updated `schema.sql` in your Vercel Postgres dashboard
2. **Configure environment:** Copy `.env.example` to `.env.local` and fill in your database values
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

### 2. Environment Variables

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

# JWT Secret (generate a secure random string) - Only needed for admin authentication
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Admin Configuration
ADMIN_EMAIL="jaakko.rajala@tuni.fi"

# Environment
NODE_ENV="production"
```

### 3. Vercel Deployment

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

### 4. Secure Admin Access

#### **Default Credentials:**
- **Email:** `jaakko.rajala@tuni.fi`

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
3. Enter email: `jaakko.rajala@tuni.fi` and default password
4. Click "Admin Login"
5. You'll be redirected to `/admin`

#### **Admin Capabilities:**
- View all testimonials (approved and pending)
- Approve testimonials for public display
- Delete inappropriate testimonials
- Real-time statistics dashboard

## 🎯 Features

### For Users:
- **No Authentication Required:** Anyone can submit testimonials instantly
- **Simple Form:** Just enter name, testimonial, title, and company
- **Generated Avatars:** Automatic avatar generation based on submitted name
- **Status Tracking:** Clear feedback when testimonial is submitted for review

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
- **Anonymous Submissions:** No user accounts needed for testimonial submission
- **Security:** Password hashing for admin, JWT tokens, input validation, CORS protection

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
│   ├── auth.ts            # Admin authentication endpoints
│   ├── testimonials.ts    # Public testimonial endpoints (no auth required)
│   └── admin/             # Admin-only endpoints
├── components/            # React components
│   ├── Login.tsx         # Admin login page
│   ├── TestimonialForm.tsx # Anonymous testimonial submission
│   ├── AdminDashboard.tsx # Admin management interface
│   └── Testimonials.tsx  # Public testimonial display
├── lib/                  # Core services
│   ├── database.ts       # Database operations (supports anonymous testimonials)
│   └── auth.ts          # Admin authentication utilities
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Admin authentication state management
├── schema.sql          # Database schema (with anonymous testimonial support)
└── generate-admin-hash.js # Password hash generator utility
```

## 🛡️ Security

- **Anonymous Submissions:** No user data stored for testimonials
- **Admin Password Hashing:** bcrypt with 12 salt rounds
- **JWT Tokens:** 7-day expiration with secure secret for admin sessions
- **Admin-only Routes:** Protected by middleware with password verification
- **Input Validation:** All endpoints validate and sanitize input
- **CORS Protection:** Proper cross-origin configuration
- **Environment Variables:** Secure credential storage

## 📱 Usage

1. **Anyone** can visit your portfolio and submit testimonials using any name, title, and company
2. **You** log in as admin using your secure email/password combination
3. **You** can approve/reject testimonials in the admin dashboard
4. **Approved testimonials** appear in the public testimonials section with generated avatars

## 🆘 Troubleshooting

- **Database errors:** Verify all environment variables are set
- **Admin access denied:** 
  - Ensure your email is in the database as admin
  - Check that password_hash is properly set in database
- **API errors:** Check Vercel function logs in dashboard
- **Password issues:** Use `generate-admin-hash.js` to create new password hash
- **Testimonial submissions failing:** Check database connection and schema

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

You now have a simple but secure testimonial system! Consider adding:
- Password change functionality in admin dashboard
- Email notifications for new testimonials
- Rate limiting for testimonial submissions
- Rich text editor for testimonials
- Automated spam detection
- Captcha for spam prevention
- Export functionality for testimonials