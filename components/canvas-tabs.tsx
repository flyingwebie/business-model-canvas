'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CanvasSection, canvasColors } from '@/lib/canvas-data';
import { BusinessPurpose } from './business-purpose';

interface CanvasTabsProps {
  sections: CanvasSection[];
}

export function CanvasTabs({ sections }: CanvasTabsProps) {
  const getCardColor = (id: string) => {
    const colorKey = id as keyof typeof canvasColors;
    return canvasColors[colorKey] || 'bg-gray-50 border-gray-200';
  };

  // Define section-specific questions
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
    <div className="w-full mx-auto p-6">
      <BusinessPurpose />
      <Tabs defaultValue={sections[0]?.id} className="w-full">
        <div className="mb-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 gap-1 h-auto bg-gray-100 p-2 border-1 border-gray-200 rounded-lg">
            {sections.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="text-s p-3 h-auto text-center flex flex-col items-center gap-4 text-gray-400 data-[state=active]:bg-blue-500 data-[state=active]:shadow-sm data-[state=active]:text-white"
              >
                <span className="bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">
                  {section.order}
                </span>
                <span className="block font-medium leading-tight text-center">
                  {section.title.split(' ').slice(0, 2).join(' ')}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {sections.map((section) => (
          <TabsContent key={section.id} value={section.id}>
            <Card className={`${getCardColor(section.id)} shadow-sm`}>
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <span className="bg-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold text-gray-600">
                    {section.order}
                  </span>
                  {section.title}
                </CardTitle>
                {sectionQuestions[section.order] && (
                  <div className="bg-yellow-100 border border-yellow-200 rounded p-3 mt-3">
                    <p className="text-sm text-yellow-800 font-medium">
                      💡 {sectionQuestions[section.order]}
                    </p>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[70vh]">
                  <div className="prose prose-base max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-3xl font-bold mb-6 text-gray-800">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl font-medium mb-3 text-gray-600">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="mb-4 text-gray-600 leading-relaxed">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="mb-6 space-y-2">{children}</ul>
                        ),
                        li: ({ children }) => (
                          <li className="text-gray-600 flex items-start">
                            <span className="mr-3 mt-1">•</span>
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
                        hr: () => <hr className="my-6 border-gray-300" />,
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-blue-400 pl-6 italic text-gray-600 my-6 bg-blue-50 py-4 rounded-r">
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
