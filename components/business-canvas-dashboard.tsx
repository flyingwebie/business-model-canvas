'use client';

import React, { useState, useEffect } from 'react';
import { LayoutGrid, List, Loader2 } from 'lucide-react';
import { CanvasGrid } from './canvas-grid';
import { CanvasTabs } from './canvas-tabs';
import { CanvasSection, fetchCanvasSections } from '@/lib/canvas-data';
import Image from 'next/image';

export function BusinessCanvasDashboard() {
  const [viewMode, setViewMode] = useState<'grid' | 'tabs'>('grid');
  const [sections, setSections] = useState<CanvasSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSections() {
      try {
        setLoading(true);
        const data = await fetchCanvasSections();
        setSections(data);
        setError(null);
      } catch (err) {
        setError('Failed to load canvas sections');
        console.error('Error loading sections:', err);
      } finally {
        setLoading(false);
      }
    }

    loadSections();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading Canvas Sections
          </h2>
          <p className="text-gray-600">
            Please wait while we load your business model canvas...
          </p>
        </div>
      </div>
    );
  }

  if (error || sections.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'No Canvas Sections Found'}
          </h1>
          <p className="text-gray-600">
            Please make sure the markdown files are present in the
            &apos;areas&apos; directory.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.jpg"
                alt="Flying Web Solutions"
                width={64}
                height={64}
                className="rounded"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Business Model Canvas
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>
                    <strong>Business name:</strong> Flying Web Solutions
                  </span>
                  <span>
                    <strong>Website:</strong> www.flyingweb.ie
                  </span>
                  <span>
                    <strong>Date:</strong> 06/2025
                  </span>
                </div>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                <span>Grid View</span>
              </button>
              <button
                onClick={() => setViewMode('tabs')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'tabs'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="h-4 w-4" />
                <span>Tabs View</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full mx-auto">
        {viewMode === 'grid' ? (
          <CanvasGrid sections={sections} />
        ) : (
          <CanvasTabs sections={sections} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Business Model Canvas Dashboard - {sections.length} Canvas
              Sections
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Built with Next.js, TypeScript, and Shadcn/ui by Davide Del Gatto
              ❤️ Flying Web Solutions
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
