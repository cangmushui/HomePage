'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import publicationsData from '@/data/publications.json';

interface Publication {
  id: number;
  title: string;
  authors: string[];
  venue: string;
  year: string;
  time?: string;
  type: string;
  status: string;
  abstract: string;
  tags: string[];
  links: {
    paper?: string;
    project?: string;
    code?: string;
    arxiv?: string;
    demo?: string;
  };
  featured: boolean;
  image: string;
}

export default function Publications() {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const [showAll, setShowAll] = useState(false);
  
  const publications = publicationsData as Publication[];
  
  // 按时间倒序排列（最新的在前面）
  const sortedPublications = publications.sort((a, b) => {
    // 如果有 time 字段则使用 time，否则回退到 year
    const timeA = a.time || a.year;
    const timeB = b.time || b.year;
    return timeB.localeCompare(timeA);
  });
  
  const filteredPublications = filter === 'featured' 
    ? sortedPublications.filter(pub => pub.featured)
    : sortedPublications;

  // 控制显示数量
  const displayedPublications = showAll 
    ? filteredPublications 
    : filteredPublications.slice(0, 3);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'journal':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'conference':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Section id="publications" title="Publications" subtitle="My research contributions and academic publications" className="bg-gradient-to-br from-amber-50/50 via-yellow-50/30 to-orange-50/20 dark:from-amber-900/15 dark:via-yellow-900/10 dark:to-orange-900/5">
      {/* 筛选按钮 */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            All Papers
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'featured'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Featured Papers
          </button>
        </div>
      </div>

      {/* 论文列表 */}
      <div className="space-y-8">
        {displayedPublications.map((publication) => (
          <Card key={publication.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* 论文图片 */}
              <div className="w-full md:w-2/3 flex-shrink-0">
                <div className="relative h-48 sm:h-56 md:h-full p-4 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                  <div className="relative w-full max-w-sm h-40 sm:h-48 md:w-84 md:h-60">
                    <Image
                      src={publication.image}
                      alt={publication.title}
                      fill
                      className="object-contain rounded"
                    />
                  </div>
                </div>
              </div>

              {/* 论文信息 */}
              <div className="w-full md:w-3/4 p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div className="flex-1 mb-2 sm:mb-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {publication.title}
                    </h3>
                    
                    {/* 作者列表 */}
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-2">
                      {publication.authors.map((author, index) => (
                        <span key={index}>
                          {author === '您的姓名' ? (
                            <strong className="text-blue-600 dark:text-blue-400">{author}</strong>
                          ) : (
                            author
                          )}
                          {index < publication.authors.length - 1 && ', '}
                        </span>
                      ))}
                    </p>

                    {/* 会议/期刊信息 */}
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                      <em>{publication.venue}</em> ({publication.year})
                    </p>
                  </div>

                  {/* 类型标签 */}
                  <span className={`px-2 py-1 rounded text-xs font-medium sm:ml-4 self-start ${getTypeColor(publication.type)}`}>
                    {publication.type === 'journal' ? 'Journal' : 'Conference'}
                  </span>
                </div>

                {/* 摘要 */}
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  {publication.abstract}
                </p>

                {/* 链接 */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {publication.links.paper && (
                    <a
                      href={publication.links.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Paper
                    </a>
                  )}
                  
                  {publication.links.project && (
                    <a
                      href={publication.links.project}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0 9c-1.657 0-3-4.03-3-9s1.343-9 3-9m0 18c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9l9-9" />
                      </svg>
                      Project
                    </a>
                  )}
                  
                  {publication.links.code && (
                    <a
                      href={publication.links.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 查看更多/收起 */}
      {filteredPublications.length > 3 && (
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showAll ? 'Show Less' : `View All Papers (${filteredPublications.length})`}
            <svg className={`w-4 h-4 ml-2 transition-transform ${showAll ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </Section>
  );
} 