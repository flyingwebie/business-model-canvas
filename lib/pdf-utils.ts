import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { marked } from 'marked';
import { CanvasSection } from './canvas-data';

// Initialize pdfMake with fonts
pdfMake.vfs = pdfFonts.vfs;

// Convert markdown to HTML then to simple pdfMake content
function parseMarkdownContent(markdown: string): unknown[] {
  try {
    // Convert markdown to HTML using marked
    marked.setOptions({ async: false });
    const html = marked(markdown) as string;

    // Simple HTML to pdfMake converter
    return convertHtmlToPdfMake(html);
  } catch (error) {
    console.error('Error parsing markdown:', error);
    // Fallback to simple text
    return [{ text: markdown, style: 'paragraph' }];
  }
}

// Simple HTML to pdfMake converter
function convertHtmlToPdfMake(html: string): unknown[] {
  const content: unknown[] = [];

  // Split by common HTML tags and process
  const lines = html.split(/\n/).filter((line) => line.trim());

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed === '<p></p>') continue;

    // Handle horizontal rules
    if (trimmed === '<hr>') {
      content.push({
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 1,
            lineColor: '#D1D5DB',
          },
        ],
        margin: [0, 8, 0, 8],
      });
      continue;
    }

    // Handle headers
    if (trimmed.match(/^<h([1-3])>/)) {
      const level = parseInt(trimmed.match(/^<h([1-3])>/)![1]);
      const text = trimmed.replace(/<\/?h[1-3]>/g, '');
      const style =
        level === 1 ? 'contentH1' : level === 2 ? 'contentH2' : 'contentH3';

      content.push({
        text: cleanHtmlText(text),
        style: style,
        margin: [0, level === 1 ? 12 : 8, 0, 4],
      });
      continue;
    }

    // Handle list items
    if (trimmed.includes('<li>')) {
      const text = trimmed
        .replace(/<\/?li>/g, '')
        .replace(/<\/?ul>/g, '')
        .replace(/<\/?ol>/g, '');
      if (text.trim()) {
        content.push({
          text: [
            { text: '• ', style: 'bulletPoint' },
            ...parseInlineHtml(text),
          ],
          margin: [0, 2, 0, 2],
          style: 'listItem',
        });
      }
      continue;
    }

    // Handle paragraphs
    if (trimmed.includes('<p>') || !trimmed.includes('<')) {
      const text = trimmed.replace(/<\/?p>/g, '');
      if (text.trim()) {
        content.push({
          text: parseInlineHtml(text),
          style: 'paragraph',
          margin: [0, 0, 0, 6],
        });
      }
    }
  }

  return content;
}

// Parse inline HTML formatting
function parseInlineHtml(text: string): unknown[] {
  const parts: unknown[] = [];
  const currentText = text;

  // Handle bold text
  const boldRegex = /<strong>(.*?)<\/strong>/g;
  let lastIndex = 0;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index);
      if (beforeText) {
        parts.push({ text: cleanHtmlText(beforeText) });
      }
    }

    // Add the bold text
    parts.push({ text: cleanHtmlText(match[1]), bold: true });
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    if (remainingText) {
      parts.push({ text: cleanHtmlText(remainingText) });
    }
  }

  // If no formatting found, return simple text
  return parts.length > 0 ? parts : [{ text: cleanHtmlText(currentText) }];
}

// Clean HTML text by removing tags and decoding entities
function cleanHtmlText(text: string): string {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

export async function generateCanvasPDF(
  sections: CanvasSection[]
): Promise<void> {
  // Sort sections by order
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  // Create document content matching the print view
  const content = [
    // Header Section with Logo Box
    {
      table: {
        widths: ['*'],
        body: [
          [
            {
              stack: [
                {
                  text: 'FWS',
                  style: 'logoText',
                  alignment: 'center',
                  margin: [0, 5, 0, 0],
                },
                {
                  text: 'Flying Web Solutions',
                  style: 'companyName',
                  alignment: 'center',
                  margin: [0, 0, 0, 5],
                },
              ],
            },
          ],
        ],
      },
      layout: {
        fillColor: '#F8FAFC',
        hLineWidth: () => 1,
        vLineWidth: () => 1,
        hLineColor: () => '#E2E8F0',
        vLineColor: () => '#E2E8F0',
        paddingLeft: () => 8,
        paddingRight: () => 8,
        paddingTop: () => 8,
        paddingBottom: () => 8,
      },
      margin: [0, 0, 0, 15],
    },
    {
      text: 'Business Model Canvas',
      style: 'header',
      alignment: 'center',
      margin: [0, 0, 0, 15],
    },

    // Business Info Box
    {
      table: {
        widths: ['*', '*', '*'],
        body: [
          [
            { text: 'Business: Flying Web Solutions', style: 'businessInfo' },
            { text: 'Website: www.flyingweb.ie', style: 'businessInfo' },
            { text: 'Date: 06/2025', style: 'businessInfo' },
          ],
        ],
      },
      layout: {
        fillColor: '#F9FAFB',
        hLineWidth: () => 1,
        vLineWidth: () => 1,
        hLineColor: () => '#E5E7EB',
        vLineColor: () => '#E5E7EB',
      },
      margin: [0, 0, 0, 20],
    },

    // Business Purpose Section (green box with border)
    {
      table: {
        widths: ['*'],
        body: [
          [
            {
              stack: [
                {
                  text: 'TARGET Business Purpose',
                  style: 'purposeTitle',
                  margin: [0, 0, 0, 8],
                },
                {
                  text: 'My company Flying Web Solutions provides web development and automation services. It solves the problem of businesses struggling with poor online presence and manual processes that limit growth. It delivers customized websites, lead generation systems, and AI workflows that return increased sales, improved conversion rates, and streamlined operations for entrepreneurs who want to scale their business model online.',
                  style: 'businessPurpose',
                },
              ],
            },
          ],
        ],
      },
      layout: {
        fillColor: '#ECFDF5',
        hLineWidth: () => 1,
        vLineWidth: () => 1,
        hLineColor: () => '#10B981',
        vLineColor: () => '#10B981',
        paddingLeft: () => 12,
        paddingRight: () => 12,
        paddingTop: () => 10,
        paddingBottom: () => 10,
      },
      margin: [0, 0, 0, 25],
    },

    // Canvas Sections Header
    {
      text: 'Canvas Sections',
      style: 'sectionsHeader',
      margin: [0, 0, 0, 5],
    },
    {
      text: `Complete overview of all ${sections.length} business model components`,
      style: 'sectionsSubheader',
      margin: [0, 0, 0, 20],
    },

    // Individual Sections
    ...sortedSections
      .map((section, index) => [
        // Section Header with Number Badge
        {
          columns: [
            {
              width: 25,
              text: section.order.toString(),
              style: 'sectionNumber',
              alignment: 'center',
              margin: [0, 2, 0, 0],
            },
            {
              width: '*',
              text: section.title,
              style: 'sectionTitle',
              margin: [8, 0, 0, 0],
            },
          ],
          margin: [0, index > 0 ? 15 : 0, 0, 8],
        },

        // Blue gradient line (simulated with a line)
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 0,
              x2: 515,
              y2: 0,
              lineWidth: 2,
              lineColor: '#3B82F6',
            },
          ],
          margin: [0, 0, 0, 10],
        },

        // Section Content with border and padding
        {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  stack: parseMarkdownContent(section.content),
                  margin: [0, 0, 0, 0],
                },
              ],
            ],
          },
          layout: {
            fillColor: '#FFFFFF',
            hLineWidth: () => 1,
            vLineWidth: () => 1,
            hLineColor: () => '#D1D5DB',
            vLineColor: () => '#D1D5DB',
            paddingLeft: () => 12,
            paddingRight: () => 12,
            paddingTop: () => 10,
            paddingBottom: () => 10,
          },
          margin: [0, 0, 0, 15],
        },
      ])
      .flat(),

    // Footer Section with border
    {
      table: {
        widths: ['*'],
        body: [
          [
            {
              stack: [
                {
                  text: 'Business Model Canvas - Complete Overview',
                  style: 'footerTitle',
                  alignment: 'center',
                  margin: [0, 0, 0, 5],
                },
                {
                  text: `${
                    sections.length
                  } Canvas Sections • Generated on ${new Date().toLocaleDateString()}`,
                  style: 'footerSubtitle',
                  alignment: 'center',
                  margin: [0, 0, 0, 3],
                },
                {
                  text: 'Built with Next.js, TypeScript, and Shadcn/ui by Davide Del Gatto - Flying Web Solutions',
                  style: 'footerCredit',
                  alignment: 'center',
                },
              ],
            },
          ],
        ],
      },
      layout: {
        fillColor: '#F9FAFB',
        hLineWidth: () => 1,
        vLineWidth: () => 1,
        hLineColor: () => '#E5E7EB',
        vLineColor: () => '#E5E7EB',
        paddingLeft: () => 12,
        paddingRight: () => 12,
        paddingTop: () => 8,
        paddingBottom: () => 8,
        borderRadius: () => 10,
      },
      margin: [0, 20, 0, 0],
    },
  ];

  // Define the document
  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [30, 50, 30, 50],

    info: {
      title: 'Business Model Canvas - Flying Web Solutions',
      author: 'Flying Web Solutions',
      subject: 'Business Model Canvas',
    },

    content,

    styles: {
      logoText: {
        fontSize: 20,
        bold: true,
        color: '#3B82F6',
      },
      companyName: {
        fontSize: 14,
        bold: true,
        color: '#1F2937',
      },
      header: {
        fontSize: 24,
        bold: true,
        color: '#1F2937',
      },
      businessInfo: {
        fontSize: 10,
        color: '#374151',
      },
      purposeTitle: {
        fontSize: 14,
        bold: true,
        color: '#065F46',
      },
      businessPurpose: {
        fontSize: 11,
        color: '#047857',
        lineHeight: 1.4,
        margin: [0, 0, 0, 0],
      },
      sectionsHeader: {
        fontSize: 16,
        bold: true,
        color: '#1F2937',
      },
      sectionsSubheader: {
        fontSize: 11,
        color: '#6B7280',
      },
      sectionNumber: {
        fontSize: 12,
        bold: true,
        color: '#1D4ED8',
        background: '#DBEAFE',
        margin: [3, 3, 3, 3],
      },
      sectionTitle: {
        fontSize: 16,
        bold: true,
        color: '#1F2937',
      },
      sectionContent: {
        fontSize: 11,
        lineHeight: 1.4,
        color: '#374151',
        alignment: 'justify',
        margin: [10, 10, 10, 10],
      },
      contentH1: {
        fontSize: 16,
        bold: true,
        color: '#1F2937',
      },
      contentH2: {
        fontSize: 14,
        bold: true,
        color: '#151515',
      },
      contentH3: {
        fontSize: 12,
        bold: true,
        color: '#151515',
      },
      paragraph: {
        fontSize: 11,
        lineHeight: 1.4,
        color: '#374151',
        alignment: 'justify',
      },
      listItem: {
        fontSize: 11,
        lineHeight: 1.2,
        color: '#374151',
        margin: [15, 0, 0, 0],
        alignment: 'justify',
      },
      bulletPoint: {
        fontSize: 11,
        color: '#3B82F6',
        bold: true,
      },
      footerTitle: {
        fontSize: 11,
        bold: true,
        color: '#374151',
      },
      footerSubtitle: {
        fontSize: 9,
        color: '#6B7280',
      },
      footerCredit: {
        fontSize: 8,
        color: '#9CA3AF',
      },
    },
  };

  try {
    // @ts-expect-error - pdfMake createPdf types are complex
    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.download('Business-Model-Canvas-Flying-Web-Solutions.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}
