import React from 'react'; // Import React for React.ReactNode and React.ReactElement

export interface Project {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count?: number;
  forks_count?: number;
  language?: string;
  topics?: string[];
  imageUrl?: string;
}

export interface Work {
  id: number;
  title: string;
  description: string;
  url: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title?: string; // Made optional
  company?: string;
  imageUrl?: string;
  // Database-specific fields - updated for anonymous submissions
  user_id?: number | null; // Allow null for anonymous testimonials
  is_approved?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Skill {
  id: number;
  name: string;
  icon?: React.ReactElement; // Changed from React.ReactNode to React.ReactElement
  category: 'Frontend' | 'Backend' | 'Databases' | 'Tools' | 'Languages';
  level?: number; // Optional: 1-5 or 1-100 for proficiency
}

export interface NavLink {
  href: string;
  label: string;
}
