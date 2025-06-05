import type { Design } from '@/types/design';

// A small, real PNG data URI for testing AI (a 2x2 red square)
const sampleImageDataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAABNJREFUGFdjYGBgYPj///8/AAAAAAElFTkSuQmCC';


export const mockDesigns: Design[] = [
  {
    id: '1',
    title: 'Modern Villa Concept',
    description: 'A conceptual 3D model of a modern villa with sustainable features and a sleek aesthetic. Designed for a luxury real estate developer.',
    uploadDate: '2023-10-15',
    fileUrl: 'https://placehold.co/800x600/2E3192/FFFFFF.png', // Navy with white text
    fileType: 'image',
    thumbnailUrl: 'https://placehold.co/400x300/2E3192/FFFFFF.png',
    category: 'Architecture',
    aiHint: 'modern villa',
  },
  {
    id: '2',
    title: 'Mechanical Gear Assembly',
    description: 'Detailed 3D draft of a complex mechanical gear assembly for an industrial machine. Includes all parts and specifications.',
    uploadDate: '2023-11-01',
    fileUrl: 'https://placehold.co/800x600/707070/FFFFFF.png', // Gray
    fileType: 'image',
    thumbnailUrl: 'https://placehold.co/400x300/707070/FFFFFF.png',
    category: 'Mechanical',
    aiHint: 'gear assembly',
  },
  {
    id: '3',
    title: 'Product Casing Design',
    description: '3D model for an ergonomic product casing for a new electronic device. Focus on user comfort and manufacturability.',
    uploadDate: '2023-09-20',
    fileUrl: sampleImageDataUri, // Use the sample data URI for AI testing
    fileType: 'image',
    thumbnailUrl: 'https://placehold.co/400x300/A0A0A0/000000.png', // Light gray
    category: 'Product Design',
    aiHint: 'product casing',
  },
  {
    id: '4',
    title: 'Architectural Blueprint - Office',
    description: 'A detailed PDF blueprint for a new office building layout, including floor plans and electrical schematics.',
    uploadDate: '2023-12-05',
    fileUrl: 'placeholder.pdf', // Placeholder for PDF
    fileType: 'pdf',
    thumbnailUrl: 'https://placehold.co/400x300/EEEEEE/333333.png', // Very light gray, PDF icon like
    category: 'Blueprint',
    aiHint: 'office blueprint',
  },
  {
    id: '5',
    title: 'Urban Landscape Plan',
    description: '3D visualization of an urban park and recreational area, showcasing green spaces and pedestrian pathways.',
    uploadDate: '2024-01-10',
    fileUrl: 'https://placehold.co/800x600/4CAF50/FFFFFF.png', // Green
    fileType: 'image',
    thumbnailUrl: 'https://placehold.co/400x300/4CAF50/FFFFFF.png',
    category: 'Urban Planning',
    aiHint: 'urban park',
  },
  {
    id: '6',
    title: 'Interior Design - Living Room',
    description: 'Modern living room interior design concept with custom furniture and lighting solutions.',
    uploadDate: '2024-02-01',
    fileUrl: 'https://placehold.co/800x600/FFC107/000000.png', // Amber
    fileType: 'image',
    thumbnailUrl: 'https://placehold.co/400x300/FFC107/000000.png',
    category: 'Interior Design',
    aiHint: 'living room',
  },
];
