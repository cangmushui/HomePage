import React from 'react';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import personalData from '@/data/personal.json';

export default function About() {
  return (
    <Section id="about" title="About Me" subtitle="My background and expertise" className="bg-gradient-to-br from-amber-50/60 via-yellow-50/40 to-orange-50/30 dark:from-amber-900/20 dark:via-yellow-900/15 dark:to-orange-900/10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 研究兴趣 */}
        <Card className="p-6">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Research Interests</h3>
          </div>
          
          <div className="space-y-2">
            {personalData.interests.map((interest, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-700 dark:text-gray-300">{interest}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 教育背景 */}
        <Card className="p-6">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Education</h3>
          </div>
          
          <div className="space-y-4">
            {/* 教育背景 */}
            {personalData.education.map((edu, index) => (
              <div key={`edu-${index}`} className="border-l-2 border-blue-200 dark:border-blue-700 pl-4">
                <div className="flex items-start space-x-3">
                  {edu.logo && (
                    <div className="flex-shrink-0 mt-1">
                      <Image 
                        src={edu.logo} 
                        alt={`${edu.institution} logo`}
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{edu.field}</p>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{edu.institution}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{edu.period}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 工作经历 */}
        <Card className="p-6">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6m8 0H8m0 0h-.01M8 6h.01M8 10h.01M8 10h.01M8 14h.01M8 14h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Work Experience</h3>
          </div>
          
          <div className="space-y-4">
            {/* 工作经历 */}
            {personalData.experience && personalData.experience.map((exp, index) => (
              <div key={`exp-${index}`} className="border-l-2 border-purple-200 dark:border-purple-700 pl-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">{exp.position}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{exp.description}</p>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">{exp.company}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{exp.period}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Section>
  );
} 