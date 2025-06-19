export interface CanvasSection {
  id: string;
  title: string;
  content: string;
  filename: string;
  order: number;
}

export async function fetchCanvasSections(): Promise<CanvasSection[]> {
  try {
    const response = await fetch('/api/canvas', {
      cache: 'no-store', // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const sections: CanvasSection[] = await response.json();
    return sections;
  } catch (error) {
    console.error('Error fetching canvas sections:', error);
    return [];
  }
}

export const canvasColors = {
  '1-1-value-proposition': 'bg-blue-50 border-blue-200',
  '2-2-customer-segments': 'bg-green-50 border-green-200',
  '3-3-channels': 'bg-purple-50 border-purple-200',
  '4-4-customer-relationship': 'bg-orange-50 border-orange-200',
  '5-5-revenue-streams': 'bg-yellow-50 border-yellow-200',
  '6-6-key-resources': 'bg-red-50 border-red-200',
  '7-7-key-activities': 'bg-indigo-50 border-indigo-200',
  '8-8-key-partnerships': 'bg-pink-50 border-pink-200',
  '9-9-cost-structure': 'bg-gray-50 border-gray-200',
} as const;
