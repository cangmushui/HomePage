'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import personalData from '@/data/personal.json';

// 星空图的base64编码（移到组件外部作为常量）
const starryBackground = `data:image/svg+xml;base64,${btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
    <defs>
      <radialGradient id="grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:#1a1a2e"/>
        <stop offset="100%" style="stop-color:#16213e"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)"/>
    <circle cx="200" cy="150" r="1" fill="white" opacity="0.8"/>
    <circle cx="400" cy="200" r="1.5" fill="white" opacity="0.9"/>
    <circle cx="600" cy="100" r="1" fill="white" opacity="0.7"/>
    <circle cx="800" cy="300" r="1" fill="white" opacity="0.8"/>
    <circle cx="1000" cy="180" r="1.5" fill="white" opacity="0.9"/>
    <circle cx="1200" cy="250" r="1" fill="white" opacity="0.7"/>
    <circle cx="1400" cy="120" r="1" fill="white" opacity="0.8"/>
    <circle cx="1600" cy="350" r="1.5" fill="white" opacity="0.9"/>
    <circle cx="300" cy="400" r="1" fill="white" opacity="0.6"/>
    <circle cx="500" cy="450" r="1" fill="white" opacity="0.8"/>
    <circle cx="700" cy="380" r="1.5" fill="white" opacity="0.9"/>
    <circle cx="900" cy="500" r="1" fill="white" opacity="0.7"/>
    <circle cx="1100" cy="420" r="1" fill="white" opacity="0.8"/>
    <circle cx="1300" cy="480" r="1.5" fill="white" opacity="0.9"/>
    <circle cx="1500" cy="430" r="1" fill="white" opacity="0.6"/>
    <circle cx="150" cy="600" r="1" fill="white" opacity="0.8"/>
    <circle cx="350" cy="680" r="1.5" fill="white" opacity="0.9"/>
    <circle cx="550" cy="620" r="1" fill="white" opacity="0.7"/>
    <circle cx="750" cy="700" r="1" fill="white" opacity="0.8"/>
    <circle cx="950" cy="650" r="1.5" fill="white" opacity="0.9"/>
    <circle cx="1150" cy="720" r="1" fill="white" opacity="0.7"/>
    <circle cx="1350" cy="680" r="1" fill="white" opacity="0.8"/>
    <circle cx="1550" cy="750" r="1.5" fill="white" opacity="0.9"/>
    <circle cx="250" cy="850" r="1" fill="white" opacity="0.6"/>
    <circle cx="450" cy="900" r="1" fill="white" opacity="0.8"/>
    <circle cx="650" cy="880" r="1.5" fill="white" opacity="0.9"/>
    <circle cx="850" cy="920" r="1" fill="white" opacity="0.7"/>
    <circle cx="1050" cy="860" r="1" fill="white" opacity="0.8"/>
    <circle cx="1250" cy="940" r="1.5" fill="white" opacity="0.9"/>
    <circle cx="1450" cy="890" r="1" fill="white" opacity="0.6"/>
  </svg>
`)}`;

export default function Hero() {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showImageBackground, setShowImageBackground] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // 判断是否应该显示风景图背景
  const shouldShowLandscapeImage = imageLoaded && backgroundImage;

  // 调试信息
  console.log('Debug Hero states:', {
    imageLoaded,
    backgroundImage: backgroundImage ? 'has value' : 'empty',
    shouldShowLandscapeImage,
    showImageBackground,
    loadingProgress
  });

  useEffect(() => {
    // 模拟加载进度
    const progressTimer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 85) {
          clearInterval(progressTimer);
          return 85; // 停在85%等待真实加载完成
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    const fetchLandscapeImage = async () => {
      // 多个图片源，按优先级尝试
      const imageSources = [
        `https://picsum.photos/1920/1080?random=${Date.now()}`,
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // 山景
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // 森林
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // 自然风景
      ];
      
      const tryLoadImage = (url: string): Promise<string> => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.onload = () => resolve(url);
          img.onerror = () => reject();
          img.src = url;
        });
      };
      
      for (const imageUrl of imageSources) {
        try {
          console.log(`Trying to load image from: ${imageUrl.substring(0, 50)}...`);
          await tryLoadImage(imageUrl);
          
          // 图片加载完成
          clearInterval(progressTimer);
          setLoadingProgress(100);
          
          console.log('Landscape image loaded successfully');
          setBackgroundImage(imageUrl);
          setImageLoaded(true);
          
          // 等待一下再显示，创建更好的过渡效果
          setTimeout(() => {
            setShowImageBackground(true);
          }, 500);
          return;
          
        } catch {
          console.log(`Failed to load image, trying next source...`);
          continue;
        }
      }
      
      // 所有图片源都失败，使用星空背景
      clearInterval(progressTimer);
      setLoadingProgress(100);
      console.log('All image sources failed, using starry background');
      setBackgroundImage(starryBackground);
      setImageLoaded(true);
      setTimeout(() => {
        setShowImageBackground(true);
      }, 500);
    };

    fetchLandscapeImage();
    
    return () => clearInterval(progressTimer);
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* 层1: 天蓝色默认背景 - 始终存在 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800" />
      
      {/* 层1.5: 背景渐变增强层 - 根据加载状态调整 */}
      <div className={`absolute inset-0 transition-all duration-2000 ease-out ${
        loadingProgress > 50 
          ? 'bg-gradient-to-br from-blue-100/50 via-indigo-100/30 to-purple-100/20 opacity-100' 
          : 'bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/10 opacity-60'
      }`} />
      
      {/* 层2: 加载过渡背景 - 在加载时显示 */}
      <div 
        className={`absolute inset-0 transition-all duration-1500 ease-out ${
          loadingProgress < 100 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/70 to-indigo-200/70 dark:from-blue-900/70 dark:to-indigo-900/70" />
        
        {/* 加载指示器 */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center">
          <div className="w-40 h-1 bg-white/20 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-sm text-white/80 font-light">Loading beautiful scenery...</p>
        </div>
      </div>
      
      {/* 层2.5: 预过渡层 - 为背景图片准备 */}
      <div className={`absolute inset-0 transition-all duration-2000 ease-out ${
        loadingProgress >= 100 && !showImageBackground
          ? 'bg-gradient-to-br from-indigo-200/40 via-blue-200/30 to-purple-200/20 opacity-100'
          : 'opacity-0'
      }`} />
      
      {/* 层3: 风景背景图片 - 平滑淡入 */}
      {shouldShowLandscapeImage && (
        <div 
          className={`absolute inset-0 transition-all duration-3000 ease-out ${
            showImageBackground ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className={`absolute inset-0 transition-all duration-2000 ease-out ${
            showImageBackground 
              ? 'bg-gradient-to-br from-black/20 via-black/30 to-black/40' 
              : 'bg-black/60'
          }`} />
        </div>
      )}
      
      {/* 内容层 */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* 个人照片 */}
          <div className="text-center lg:text-left">
            <div className="relative inline-block">
              {/* 背景渐变圆环 - 根据背景状态变化 */}
              <div className={`absolute -inset-6 rounded-full transition-all duration-2000 ease-out ${
                shouldShowLandscapeImage && showImageBackground
                  ? 'bg-gradient-to-r from-white/20 via-blue-200/30 to-indigo-200/30'
                  : 'bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20'
              } blur-xl`}></div>
              
              {/* 中间装饰圆环 */}
              <div className={`absolute -inset-3 rounded-full border-2 transition-all duration-2000 ease-out ${
                shouldShowLandscapeImage && showImageBackground
                  ? 'border-white/30 bg-white/10'
                  : 'border-blue-300/40 bg-blue-50/20 dark:border-blue-600/40 dark:bg-blue-900/20'
              } backdrop-blur-sm`}></div>
              
              {/* 头像容器 */}
              <div className={`w-64 h-64 sm:w-80 sm:h-80 relative mx-auto lg:mx-0 rounded-full overflow-hidden transition-all duration-2000 ease-out ${
                shouldShowLandscapeImage && showImageBackground
                  ? 'ring-4 ring-white/50 shadow-2xl shadow-black/30'
                  : 'ring-4 ring-blue-200/50 shadow-xl shadow-blue-500/20 dark:ring-blue-600/50 dark:shadow-blue-900/30'
              }`}>
                <Image
                  src={personalData.avatar}
                  alt={personalData.name}
                  fill
                  className={`object-cover transition-all duration-2000 ease-out ${
                    shouldShowLandscapeImage && showImageBackground
                      ? 'brightness-110 contrast-105'
                      : 'brightness-100 contrast-100'
                  }`}
                  priority
                />
                
                {/* 头像上的光效 */}
                <div className={`absolute inset-0 transition-all duration-2000 ease-out ${
                  shouldShowLandscapeImage && showImageBackground
                    ? 'bg-gradient-to-br from-white/10 via-transparent to-blue-500/10'
                    : 'bg-gradient-to-br from-blue-400/5 via-transparent to-indigo-500/5'
                }`}></div>
              </div>
              
              {/* 外层光晕效果 */}
              <div className={`absolute -inset-8 rounded-full transition-all duration-3000 ease-out ${
                shouldShowLandscapeImage && showImageBackground
                  ? 'bg-gradient-to-r from-white/10 via-blue-100/15 to-indigo-100/10 opacity-60'
                  : 'bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-purple-400/10 opacity-40'
              } blur-2xl animate-pulse`}></div>
              
              {/* 动态粒子效果 */}
              <div className="absolute -inset-10 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full transition-all duration-2000 ease-out ${
                      shouldShowLandscapeImage && showImageBackground
                        ? 'bg-white/40'
                        : 'bg-blue-400/60'
                    }`}
                    style={{
                      left: `${20 + (i * 60) % 80}%`,
                      top: `${15 + (i * 40) % 70}%`,
                      animationDelay: `${i * 0.5}s`,
                      animation: `float ${3 + (i * 0.5)}s ease-in-out infinite alternate`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* 个人信息 */}
          <div className="text-center lg:text-left">
            {/* 名字 - 根据背景调整颜色 */}
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-serif font-normal tracking-wide mb-8">
              <span className={`bg-gradient-to-r transition-all duration-1000 ${
                shouldShowLandscapeImage && showImageBackground
                  ? 'from-white via-blue-100 to-indigo-100'
                  : 'from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-300 dark:to-indigo-300'
              } bg-clip-text text-transparent drop-shadow-lg`}>
                {personalData.name}
              </span>
            </h1>
            
            {/* 职业信息 - 根据背景调整颜色 */}
            <div className="mb-6 space-y-2">
              <p className={`text-xl font-serif font-light tracking-wide italic transition-all duration-1000 ${
                shouldShowLandscapeImage && showImageBackground
                  ? 'text-white/95 drop-shadow-md'
                  : 'text-slate-700 dark:text-slate-300'
              }`}>
                {personalData.position}
              </p>
              <p className={`text-lg font-serif font-light tracking-wider transition-all duration-1000 ${
                shouldShowLandscapeImage && showImageBackground
                  ? 'text-white/90 drop-shadow-md'
                  : 'text-slate-600 dark:text-slate-400'
              }`}>
                {personalData.department}
              </p>
              <p className={`text-lg font-serif font-light tracking-wider transition-all duration-1000 ${
                shouldShowLandscapeImage && showImageBackground
                  ? 'text-white/90 drop-shadow-md'
                  : 'text-slate-600 dark:text-slate-400'
              }`}>
                {personalData.affiliation}
              </p>
            </div>

            {/* Bio - 根据背景调整样式 */}
            <div className="mb-8 max-w-2xl">
              <p className={`text-lg font-serif font-light leading-relaxed tracking-wide text-justify p-6 border-2 border-dashed rounded-lg shadow-lg hover:shadow-xl transition-all duration-1000 ${
                shouldShowLandscapeImage && showImageBackground
                  ? 'text-white/95 border-white/40 bg-black/25 backdrop-blur-sm drop-shadow-md'
                  : 'text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50/50 to-blue-50/30 dark:from-slate-800/50 dark:to-blue-900/30'
              }`}>
                {personalData.bio}
              </p>
            </div>

            {/* 社交链接 */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              {personalData.social.googleScholar && (
                <a
                  href={personalData.social.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                  </svg>
                  Google Scholar
                </a>
              )}
              
              {personalData.social.github && (
                <a
                  href={personalData.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              )}

              {personalData.social.linkedin && (
                <a
                  href={personalData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>

            {/* 联系信息 - 根据背景调整颜色 */}
            <div className="space-y-1">
              <p className={`text-sm font-serif font-light tracking-wider flex items-center justify-center lg:justify-start transition-all duration-1000 ${
                shouldShowLandscapeImage && showImageBackground
                  ? 'text-white/80 drop-shadow-md'
                  : 'text-slate-600 dark:text-slate-400'
              }`}>
                <span className="mr-2">📧</span>
                {personalData.email}
              </p>
              <p className={`text-sm font-serif font-light tracking-wider flex items-center justify-center lg:justify-start transition-all duration-1000 ${
                shouldShowLandscapeImage && showImageBackground
                  ? 'text-white/80 drop-shadow-md'
                  : 'text-slate-600 dark:text-slate-400'
              }`}>
                <span className="mr-2">📍</span>
                {personalData.location}
              </p>
            </div>
          </div>
        </div>

        {/* 滚动提示 - 根据背景调整颜色 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className={`w-6 h-6 transition-all duration-1000 ${
            shouldShowLandscapeImage && showImageBackground
              ? 'text-white/60'
              : 'text-gray-600 dark:text-gray-400'
          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
} 