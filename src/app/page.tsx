import React from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Publications from '@/components/sections/Publications';
import News from '@/components/sections/News';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main>
        <Hero />
        <About />
        <Publications />
        <News />
      </main>
      <Footer />
    </div>
  );
}
