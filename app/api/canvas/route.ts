import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export interface CanvasSection {
  id: string;
  title: string;
  content: string;
  filename: string;
  order: number;
}

async function getCanvasSections(): Promise<CanvasSection[]> {
  try {
    const areasDir = path.join(process.cwd(), 'areas');
    const files = await fs.readdir(areasDir);

    const markdownFiles = files.filter((file) => file.endsWith('.md')).sort(); // This will sort them by filename (1., 2., etc.)

    const sections: CanvasSection[] = [];

    for (const file of markdownFiles) {
      const filePath = path.join(areasDir, file);
      const content = await fs.readFile(filePath, 'utf8');

      // Extract title from filename or content
      const title = extractTitle(file, content);
      const order = extractOrder(file);

      sections.push({
        id: file.replace('.md', '').replace(/\s+/g, '-').toLowerCase(),
        title,
        content,
        filename: file,
        order,
      });
    }

    return sections.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error reading canvas sections:', error);
    return [];
  }
}

function extractTitle(filename: string, content: string): string {
  // Try to extract title from first H1 in content
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].replace(/🎯\s*/, '').trim();
  }

  // Fallback to filename
  return filename
    .replace(/^\d+\.\s*/, '') // Remove number prefix
    .replace('.md', '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function extractOrder(filename: string): number {
  const match = filename.match(/^(\d+)\./);
  return match ? parseInt(match[1], 10) : 999;
}

export async function GET() {
  try {
    const sections = await getCanvasSections();
    return NextResponse.json(sections);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to load canvas sections' },
      { status: 500 }
    );
  }
}
