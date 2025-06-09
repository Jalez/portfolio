import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 bg-theme-primary text-center border-t border-theme">
      <div className="container mx-auto px-6">
        <p className="text-theme-secondary">
          &copy; {currentYear} Jaakko Rajala. All rights reserved.
        </p>
        <p className="text-sm text-theme-secondary mt-2">
          Crafted with <span role="img" aria-label="heart" className="text-theme-primary">❤️</span> using React & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
