# Portfolio with Anonymous Testimonials & Admin Dashboard

A modern, secure portfolio website featuring an anonymous testimonial system with admin moderation capabilities. Built with React, TypeScript, and Vercel Postgres.

## ✨ Features

### 🌟 For Visitors
- **Anonymous Testimonial Submissions:** Anyone can submit testimonials without creating an account
- **Simple Form Interface:** Easy-to-use form with name, testimonial, title, and company fields
- **Auto-Generated Avatars:** Beautiful avatars automatically created based on submitted names
- **Instant Feedback:** Clear status messages when testimonials are submitted for review

### 🔐 For Admins
- **Secure Authentication:** Password-protected admin access with bcrypt hashing
- **Full Management Dashboard:** View, approve, and delete testimonials
- **Real-time Statistics:** Track total, approved, and pending testimonials
- **JWT-based Sessions:** Secure 7-day token expiration with proper validation

### 🛡️ Security Features
- **Input Validation:** All endpoints validate and sanitize user input
- **CORS Protection:** Proper cross-origin resource sharing configuration
- **Admin Moderation:** All testimonials require approval before public display
- **Secure Password Storage:** bcrypt hashing with 12 salt rounds
- **Environment Variable Protection:** Secure credential storage

### 🔧 Technical Features
- **Real Database:** Vercel Postgres with proper indexing and relationships
- **Serverless API:** Vercel functions for scalable, cost-effective backend
- **Type-Safe:** Full TypeScript implementation throughout the stack
- **Responsive Design:** Optimized for all device sizes and screen types
- **Modern Stack:** React, Vite, Tailwind CSS, and TypeScript

## 🚀 Quick Start

1. **Database Setup:** Run `schema.private.sql` in your Vercel Postgres dashboard
2. **Environment Configuration:** Create `.env.local` with your database credentials
3. **Admin Setup:** Default admin email is `jaakko.rajala@tuni.fi` - **change the password immediately**
4. **Deploy:** Push to Vercel and configure environment variables

## 📋 Complete Setup Guide

### 1. Database Setup (Vercel Postgres)

1. **Create a Vercel Postgres Database:**
   - Navigate to [Vercel Dashboard](https://vercel.com/dashboard)
   - Create a new project or select your existing project
   - Go to the "Storage" tab
   - Create a new Postgres database

2. **Execute the Database Schema:**
   - Copy the contents of `schema.private.sql`
   - Go to your Vercel Postgres dashboard
   - Navigate to the "Query" tab
   - Paste and execute the SQL schema
   - This creates the admin user with email `jaakko.rajala@tuni.fi`

3. **Collect Database Connection Details:**
   - From your Vercel Postgres dashboard, copy all environment variables

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

# JWT Secret (generate a secure random string)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Admin Configuration
ADMIN_EMAIL="jaakko.rajala@tuni.fi"

# Environment
NODE_ENV="production"
```

### 3. Vercel Deployment

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy the Application:**
   ```bash
   vercel
   ```

3. **Configure Environment Variables:**
   - Go to your project settings in Vercel Dashboard
   - Navigate to "Environment Variables"
   - Add all variables from your `.env.local` file

### 4. Admin Access Configuration

#### Default Credentials:
- **Email:** `jaakko.rajala@tuni.fi`
- **Password:** Use `generate-admin-hash.js` to set your secure password

#### ⚠️ CRITICAL SECURITY STEPS:

1. **Set Your Secure Password:**
   ```bash
   # Edit the password in generate-admin-hash.js, then run:
   node generate-admin-hash.js
   ```

2. **Update Database with New Password Hash:**
   ```sql
   UPDATE users SET password_hash = 'your-generated-hash' WHERE email = 'jaakko.rajala@tuni.fi';
   ```

#### Admin Login Process:
1. Navigate to `/login`
2. Scroll to "Admin Access" section
3. Enter email: `jaakko.rajala@tuni.fi` and your password
4. Click "Admin Login"
5. You'll be redirected to `/admin` dashboard

#### Admin Dashboard Features:
- View all testimonials (approved and pending)
- Approve testimonials for public display
- Delete inappropriate or spam testimonials
- Real-time statistics and analytics dashboard

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate new admin password hash
node generate-admin-hash.js

# Type checking
npm run type-check

# Linting
npm run lint
```


## 🛡️ Security Implementation

- **Anonymous Submissions:** No personal data storage for testimonial submitters
- **Password Security:** bcrypt hashing with 12 salt rounds for admin accounts
- **Session Management:** JWT tokens with 7-day expiration and secure validation
- **Route Protection:** Middleware-protected admin routes with password verification
- **Input Sanitization:** All user inputs validated and sanitized server-side
- **CORS Configuration:** Proper cross-origin resource sharing policies
- **Environment Security:** Sensitive credentials stored in environment variables

## 📱 How It Works

### For Public Users:
1. Visit the portfolio website
2. Navigate to the testimonials section
3. Fill out the anonymous testimonial form (name, testimonial, title, company)
4. Submit testimonial for admin review
5. Receive confirmation that testimonial is pending approval

### For Admins:
1. Access `/login` and authenticate with secure credentials
2. Navigate to the admin dashboard at `/admin`
3. Review pending testimonials in the management interface
4. Approve legitimate testimonials for public display
5. Delete spam or inappropriate submissions
6. Monitor real-time statistics and testimonial analytics

### Technical Flow:
1. Public testimonials are submitted via API without authentication
2. Admin authentication uses JWT tokens for session management
3. All testimonials require admin approval before public display
4. Approved testimonials appear in the public testimonials carousel
5. Auto-generated avatars enhance visual presentation

## 🆘 Troubleshooting

### Common Issues:

**Database Connection Errors:**
- Verify all environment variables are correctly set
- Check Vercel Postgres dashboard for connection status
- Ensure database schema has been executed properly

**Admin Authentication Problems:**
- Confirm your email exists in the users table as admin
- Verify password_hash is properly set in the database
- Check JWT_SECRET environment variable is configured

**API Endpoint Failures:**
- Review Vercel function logs in the dashboard
- Validate environment variables in Vercel project settings
- Check CORS configuration for cross-origin requests

**Password-Related Issues:**
- Use `generate-admin-hash.js` to create new password hashes
- Ensure bcrypt dependency is properly installed
- Verify database update queries are executed correctly

**Testimonial Submission Problems:**
- Check database connection and table schema
- Validate input sanitization and validation rules
- Review network requests in browser developer tools

## 🔑 Password Management

### Changing Admin Password:

1. **Generate New Password Hash:**
   ```bash
   # Edit the desired password in generate-admin-hash.js
   node generate-admin-hash.js
   # Copy the generated hash from console output
   ```

2. **Update Database:**
   ```sql
   UPDATE users 
   SET password_hash = 'your-new-generated-hash' 
   WHERE email = 'jaakko.rajala@tuni.fi';
   ```

3. **Test New Credentials:**
   - Log out of admin dashboard
   - Attempt login with new password
   - Verify successful authentication

## 🚀 Future Enhancements

Consider implementing these additional features:

### User Experience:
- **Rich Text Editor:** Enhanced testimonial formatting options
- **Image Uploads:** Allow testimonial submitters to include photos
- **Email Notifications:** Automatic alerts for new testimonial submissions
- **Public API:** RESTful endpoints for testimonial integration

### Security & Moderation:
- **Rate Limiting:** Prevent spam through submission throttling
- **CAPTCHA Integration:** Add bot protection for form submissions
- **Automated Spam Detection:** Machine learning-based content filtering
- **Admin Password Reset:** Self-service password recovery system

### Analytics & Management:
- **Export Functionality:** CSV/JSON export of approved testimonials
- **Advanced Filtering:** Search and filter testimonials by various criteria
- **Bulk Operations:** Mass approve/delete testimonial batches
- **Analytics Dashboard:** Detailed submission and approval metrics

### Technical Improvements:
- **Caching Layer:** Redis integration for improved performance
- **CDN Integration:** Static asset optimization and delivery
- **Database Migrations:** Version-controlled schema updates
- **Automated Testing:** Unit and integration test coverage

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Contact

**Jaakko Rajala**
- Email: jaakko.rajala@tuni.fi
- Portfolio: [Your Portfolio URL]

---

Built with ❤️ using React, TypeScript, Vercel, and modern web technologies.