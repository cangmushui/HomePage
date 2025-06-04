'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import personalData from '@/data/personal.json';

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Publications', href: '#publications' },
  { name: 'News', href: '#news' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-white/20 dark:border-gray-700/30' 
          : 'bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm border-b border-white/5 dark:border-gray-700/10'
        }
      `}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <div className="flex-shrink-0">
            <Link 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className={`text-xl font-bold transition-colors ${
                scrolled 
                  ? 'text-gray-900 dark:text-white drop-shadow-sm' 
                  : 'text-white drop-shadow-lg'
              } hover:text-blue-400 dark:hover:text-blue-400`}
            >
              {personalData.name}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-4 py-2 rounded-md text-xl font-semibold transition-all tracking-wide ${
                    scrolled 
                      ? 'text-gray-800 dark:text-gray-200 drop-shadow-sm hover:bg-white/20 dark:hover:bg-gray-800/30' 
                      : 'text-white drop-shadow-lg hover:bg-white/10'
                  } hover:text-blue-400 dark:hover:text-blue-400`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                scrolled 
                  ? 'text-gray-800 dark:text-gray-200 drop-shadow-sm hover:bg-white/20 dark:hover:bg-gray-800/30' 
                  : 'text-white drop-shadow-lg hover:bg-white/10'
              } hover:text-blue-400 dark:hover:text-blue-400`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-gray-900/95 rounded-lg shadow-xl mt-2 backdrop-blur-md border border-white/20 dark:border-gray-700/30">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 block px-4 py-3 rounded-md text-2xl font-semibold w-full text-left transition-all tracking-wide drop-shadow-sm hover:bg-white/30 dark:hover:bg-gray-800/30"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 