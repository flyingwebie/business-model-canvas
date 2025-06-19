'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CanvasSection } from '@/lib/canvas-data';
import Image from 'next/image';

interface CanvasPrintViewProps {
  sections: CanvasSection[];
}

export function CanvasPrintView({ sections }: CanvasPrintViewProps) {
  // Sort sections by order for vertical display
  const sortedSections = sections.sort((a, b) => a.order - b.order);

  const renderSection = (section: CanvasSection) => {
    return (
      <div
        key={section.id}
        className="mb-4 border border-gray-300 rounded-lg bg-white p-4 shadow-sm"
      >
        <div className="mb-3">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-1">
            <span className="bg-blue-100 rounded-full w-7 h-7 flex items-center justify-center text-base font-bold text-blue-700">
              {section.order}
            </span>
            {section.title}
          </h2>
          <div className="h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full w-full"></div>
        </div>

        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-lg font-bold mb-2 text-gray-800">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-base font-semibold mb-2 text-gray-700 border-b border-gray-200 pb-1">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-sm font-medium mb-2 text-gray-600">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-2 text-sm text-gray-700 leading-relaxed">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="mb-3 space-y-1 pl-3">{children}</ul>
              ),
              li: ({ children }) => (
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="mr-2 text-blue-500 font-bold">•</span>
                  <span className="flex-1">{children}</span>
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900">
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em className="italic text-gray-800">{children}</em>
              ),
              hr: () => <hr className="my-3 border-gray-300" />,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-300 pl-3 italic text-gray-700 my-2 bg-blue-50 py-1 rounded-r">
                  {children}
                </blockquote>
              ),
            }}
          >
            {section.content}
          </ReactMarkdown>
        </div>
      </div>
    );
  };

  return (
    <div className="print-container bg-white p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 text-center border-b border-gray-300 pb-4 gap-4">
        <div className="flex justify-center items-center mb-3">
          <Image
            src="/logo.jpg"
            alt="Flying Web Solutions"
            width={80}
            height={80}
            className="rounded-lg shadow-md"
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Business Model Canvas
        </h1>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700 meta-info-container">
            <div>
              <strong>Business:</strong> Flying Web Solutions
            </div>
            <div>
              <strong>Website:</strong> www.flyingweb.ie
            </div>
            <div>
              <strong>Date:</strong> 06/2025
            </div>
          </div>
        </div>

        {/* Business Purpose */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-4xl mx-auto business-purpose-container">
          <h2 className="text-lg font-semibold text-green-800 mb-2 flex items-start justify-start gap-2">
            <span className="text-xl">🎯</span>
            Business Purpose
          </h2>
          <p className="text-sm text-left text-green-700 leading-relaxed">
            My company Flying Web Solutions provides web development and
            automation services. It solves the problem of businesses struggling
            with poor online presence and manual processes that limit growth. It
            delivers customized websites, lead generation systems, and AI
            workflows that return increased sales, improved conversion rates,
            and streamlined operations for entrepreneurs who want to scale their
            business model online.
          </p>
        </div>
      </div>

      {/* Canvas Sections - Vertical Layout */}
      <div className="space-y-6">
        <div className="text-left mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-1">
            Canvas Sections
          </h2>
          <p className="text-sm text-gray-600">
            Complete overview of all {sections.length} business model components
          </p>
        </div>

        {sortedSections.map((section) => renderSection(section))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-300 text-center">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-700 font-medium mb-1">
            Business Model Canvas - Complete Overview
          </p>
          <p className="text-xs text-gray-600 mb-1">
            {sections.length} Canvas Sections • Generated on{' '}
            {new Date().toLocaleDateString()}
          </p>
          <p className="text-xs text-gray-500">
            Built with Next.js, TypeScript, and Shadcn/ui by Davide Del Gatto ❤️
            Flying Web Solutions
          </p>
        </div>
      </div>
    </div>
  );
}
