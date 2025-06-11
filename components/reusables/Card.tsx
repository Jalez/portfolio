import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: boolean;
  animatedBorder?: boolean;
  onClick?: () => void;
  padding?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'centered';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  animatedBorder = true,
  onClick,
  padding = 'md',
  variant = 'default'
}) => {
  const paddingClasses = {
    sm: 'p-3 sm:p-4',
    md: 'p-3 sm:p-4 lg:p-6', 
    lg: 'p-6 sm:p-8'
  };

  const variantClasses = {
    default: '',
    centered: 'text-center flex flex-col items-center'
  };

  return (
    <div 
      className={`relative rounded-xl transform transition-all duration-300 flex flex-col h-full group ${animatedBorder ? 'hover-border-animation' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {/* Animated border background */}
      {animatedBorder && (
        <div className="absolute inset-0 rounded-xl transition-all duration-300 group-hover:opacity-100 opacity-0"
             style={{
               background: `
                 linear-gradient(var(--angle, 0deg), #ffffff, #cccccc, #999999, #666666, #333333, #000000) border-box
               `,
               animation: 'var(--hover-animation, none)',
               padding: '8px'
             }}
        />
      )}
      
      {/* Card content */}
      <div className={`relative bg-theme-secondary ${animatedBorder ? 'm-0.5' : ''} ${paddingClasses[padding]} rounded-lg shadow-xl flex flex-col h-full border border-theme group-hover:border-transparent transition-all duration-300 overflow-hidden ${variantClasses[variant]} min-h-0
    
      `}>
          {children}
      </div>
    </div>
  );
};

export default Card;