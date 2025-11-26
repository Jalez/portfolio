'use client';

import React from 'react';

interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'skill' | 'topic' | 'profile';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  title?: string;
  style?: React.CSSProperties;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  size = 'md',
  onClick,
  title,
  style
}) => {
  const baseClasses = "bg-gradient-to-tr from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 border border-gray-400 dark:border-gray-600 hover:border-gray-600 dark:hover:border-white/50 transition-colors duration-300";
  
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-14 lg:h-14 xl:w-14 xl:h-14",
    lg: "w-64 h-64 sm:w-80 sm:h-80",
    xl: "w-full h-full"
  };

  const variantClasses = {
    default: "rounded-full",
    skill: "rounded-full flex items-center justify-center text-gray-800 dark:text-white",
    topic: "rounded-full px-3 py-2 text-sm sm:text-base font-medium inline-flex items-center text-gray-800 dark:text-white",
    profile: "rounded-full relative"
  };

  const combinedClasses = `
    ${baseClasses}
    ${variant === 'topic' ? '' : sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={combinedClasses}
      onClick={onClick}
      title={title}
      style={style}
    >
      {children}
    </Component>
  );
};

export default GradientBackground; 