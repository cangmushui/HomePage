import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
}

export default function Section({ 
  children, 
  className = '', 
  id, 
  title, 
  subtitle 
}: SectionProps) {
  return (
    <section 
      id={id} 
      className={`py-16 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-4xl mx-auto">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
} 