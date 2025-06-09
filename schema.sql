-- Database schema for testimonials system
-- Run this in your Vercel Postgres dashboard

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  image_url VARCHAR(500),
  provider VARCHAR(50) NOT NULL, -- 'google', 'facebook', 'admin'
  provider_id VARCHAR(255),
  password_hash VARCHAR(255), -- For admin users with password authentication
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  quote TEXT NOT NULL,
  title VARCHAR(255),
  company VARCHAR(255),
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider, provider_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved);
CREATE INDEX IF NOT EXISTS idx_testimonials_user ON testimonials(user_id);

-- Insert admin user with hashed password (replace with your actual email and set a secure password)
-- Password: 'AdminPass2025!' (Change this immediately after first login)
INSERT INTO users (email, name, provider, password_hash, is_admin) 
VALUES (
  'jaakko.rajala@tuni.fi', 
  'Jaakko Rajala', 
  'admin', 
  '$2a$12$x9KfzuoYM9u8Q0PyX5tW0elmnZycJkRkYVmkyoer9p82DFpqyn/T.', -- Properly hashed password
  TRUE
)
ON CONFLICT (email) DO UPDATE SET 
  password_hash = EXCLUDED.password_hash,
  is_admin = EXCLUDED.is_admin;