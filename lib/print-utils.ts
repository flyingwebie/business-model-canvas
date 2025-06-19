import { CanvasSection } from './canvas-data';

export const printCanvas = () => {
  window.print();
};

export const generateMarkdownReport = (sections: CanvasSection[]): string => {
  const sortedSections = sections.sort((a, b) => a.order - b.order);

  const businessInfo = `# Business Model Canvas

**Business name:** Flying Web Solutions
**Website:** www.flyingweb.ie
**Date:** 06/2025

## 🎯 Business Purpose

My company Flying Web Solutions provides web development and automation services. It solves the problem of businesses struggling with poor online presence and manual processes that limit growth. It delivers customized websites, lead generation systems, and AI workflows that return increased sales, improved conversion rates, and streamlined operations for entrepreneurs who want to scale their business model online.

---

`;

  const sectionsMarkdown = sortedSections
    .map((section) => {
      return `## ${section.order}. ${section.title}

${section.content}

---

`;
    })
    .join('');

  const footer = `
## Summary

This Business Model Canvas contains ${sections.length} key sections that outline the complete business model for Flying Web Solutions.

*Built with Next.js, TypeScript, and Shadcn/ui by Davide Del Gatto ❤️ Flying Web Solutions*
`;

  return businessInfo + sectionsMarkdown + footer;
};

export const downloadMarkdown = (sections: CanvasSection[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const markdownContent = generateMarkdownReport(sections);
      const blob = new Blob([markdownContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'business-model-canvas.md';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const copyMarkdownToClipboard = (
  sections: CanvasSection[]
): Promise<void> => {
  const markdownContent = generateMarkdownReport(sections);
  return navigator.clipboard.writeText(markdownContent);
};
