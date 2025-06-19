'use client';

import React, { useState, useEffect } from 'react';
import { CanvasPrintView } from '@/components/canvas-print-view';
import { CanvasSection, fetchCanvasSections } from '@/lib/canvas-data';
import { Loader2 } from 'lucide-react';

export default function PrintPage() {
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

  // Auto-trigger print dialog after content loads
  useEffect(() => {
    if (!loading && sections.length > 0) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        window.print();
      }, 1000);
    }
  }, [loading, sections]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading Canvas for Print
          </h2>
          <p className="text-gray-600">
            Please wait while we prepare your business model canvas...
          </p>
        </div>
      </div>
    );
  }

  if (error || sections.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
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

  return <CanvasPrintView sections={sections} />;
}
