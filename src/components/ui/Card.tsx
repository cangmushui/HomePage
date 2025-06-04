import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ 
  children, 
  className = '', 
  hover = true 
}: CardProps) {
  return (
    <div 
      className={`
        bg-white/80 backdrop-blur-sm dark:bg-gray-800/90 
        rounded-lg shadow-md border border-amber-100/50 dark:border-amber-900/20
        ${hover ? 'hover:shadow-lg hover:shadow-amber-200/20 dark:hover:shadow-amber-900/30 transition-all duration-200' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
} 