'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CanvasSection, canvasColors } from '@/lib/canvas-data';
import { BusinessPurpose } from './business-purpose';

interface CanvasGridProps {
  sections: CanvasSection[];
}

interface SectionConfig {
  order: number;
  colSpan: number;
  title: string;
  isEmpty?: boolean;
}

export function CanvasGrid({ sections }: CanvasGridProps) {
  const getCardColor = (id: string) => {
    const colorKey = id as keyof typeof canvasColors;
    return canvasColors[colorKey] || 'bg-gray-50 border-gray-200';
  };

  // Create a map for easy section lookup
  const sectionMap = sections.reduce((map, section) => {
    map[section.order] = section;
    return map;
  }, {} as Record<number, CanvasSection>);

  const renderSection = (sectionConfig: SectionConfig) => {
    if (sectionConfig.isEmpty) {
      return <div key={`empty-${sectionConfig.order}`} className=""></div>;
    }

    const section = sectionMap[sectionConfig.order];
    if (!section) return null;

    // Define section-specific questions based on the reference image
    const sectionQuestions: Record<number, string> = {
      1: 'What are the problems that we are trying to solve for our customer segment?',
      2: 'Who are our customers and why would they use our solution?',
      3: 'How do we reach our customers and let them know about our solution?',
      4: 'How do we get, keep & grow our customers?',
      5: 'How do we make money from our solution?',
      6: 'What are the most important assets required to make the business model work?',
      7: 'What are the most important activities required to make the business model work?',
      8: 'Who are the key partners and suppliers needed to make the business model work?',
      9: 'What are the costs to operate the business model?',
    };

    return (
      <Card
        key={section.id}
        className={`h-[550px] ${getCardColor(section.id)} ${
          sectionConfig.colSpan === 2
            ? 'col-span-2'
            : sectionConfig.colSpan === 2.5
            ? 'col-span-2'
            : ''
        } shadow-sm hover:shadow-md transition-shadow`}
        style={
          sectionConfig.colSpan === 2.5 ? { gridColumn: 'span 2 / span 2' } : {}
        }
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">
              {section.order}
            </span>
            {section.title}
          </CardTitle>
          {sectionQuestions[section.order] && (
            <div className="bg-yellow-100 border border-yellow-200 rounded p-2 mt-2">
              <p className="text-xs text-yellow-800 font-medium">
                💡 {sectionQuestions[section.order]}
              </p>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px] px-6">
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-xl font-bold mb-4 text-gray-800">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-lg font-semibold mb-3 text-gray-700">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-base font-medium mb-2 text-gray-600">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-3 text-sm text-gray-600 leading-relaxed">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 space-y-1">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="text-sm text-gray-600 flex items-start">
                      <span className="mr-2">•</span>
                      <span>{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-800">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-gray-700">{children}</em>
                  ),
                  hr: () => <hr className="my-4 border-gray-300" />,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {section.content}
              </ReactMarkdown>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 max-w-10xl mx-auto">
      <BusinessPurpose />

      {/* Traditional Business Model Canvas Layout */}
      <div className="space-y-4">
        {/* Top Row - Key Partners, Key Activities, Value Proposition, Customer Relationships, Customer Segments */}
        <div className="grid grid-cols-5 gap-4">
          {renderSection({ order: 8, colSpan: 1, title: 'Key Partners' })}
          {renderSection({ order: 6, colSpan: 1, title: 'Key Activities' })}
          {renderSection({ order: 1, colSpan: 1, title: 'Value Proposition' })}
          {renderSection({
            order: 4,
            colSpan: 1,
            title: 'Customer Relationships',
          })}
          {renderSection({ order: 2, colSpan: 1, title: 'Customer Segments' })}
        </div>

        {/* Middle Row - Key Resources spans 2 cols, Value Prop continues, Channels spans 2 cols */}
        <div className="grid grid-cols-5 gap-4">
          {renderSection({ order: 7, colSpan: 2, title: 'Key Resources' })}
          <div className="bg-blue-25 border border-blue-100 rounded-lg opacity-50"></div>{' '}
          {/* Visual continuation of Value Proposition */}
          {renderSection({ order: 3, colSpan: 2, title: 'Channels' })}
        </div>

        {/* Bottom Row - Cost Structure and Revenue Streams */}
        <div className="grid grid-cols-2 gap-4">
          {renderSection({ order: 9, colSpan: 1, title: 'Cost Structure' })}
          {renderSection({ order: 5, colSpan: 1, title: 'Revenue Streams' })}
        </div>
      </div>
    </div>
  );
}
