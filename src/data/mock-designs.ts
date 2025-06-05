import type { Design } from '@/types/design';

const sampleRedSquareDataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAABNJREFUGFdjYGBgYPj///8/AAAAAElFTkSuQmCC';

export const mockDesigns: Design[] = [
  {
    id: '1',
    title: 'Contemporary Residence',
    description: 'A sleek and modern home design with clean lines and expansive windows, showcasing contemporary architectural principles.',
    uploadDate: '2023-10-15',
    fileUrl: 'https://placehold.co/800x450.png', 
    fileType: 'image',
    thumbnailUrl: 'https://placehold.co/600x338.png',
    category: 'Architecture',
    aiHint: 'modern house',
  },
  {
    id: '2',
    title: 'Interior Design Showcase',
    description: 'An elegant interior design rendering showcasing a living room with stylish furniture and a harmonious color palette.',
    uploadDate: '2023-11-01',
    fileUrl: 'https://placehold.co/800x450.png', 
    fileType: 'image',
    thumbnailUrl: 'https://placehold.co/600x338.png',
    category: 'Interior Design',
    aiHint: 'stylish interior',
  },
  {
    id: '3',
    title: 'Precision Drafting Services',
    description: 'Detailed architectural drafts and blueprints for a residential renovation project, emphasizing accuracy and clarity.',
    uploadDate: '2023-09-20',
    fileUrl: 'https://placehold.co/800x450.png', // Placeholder for a blueprint-like image
    fileType: 'image', // Could be PDF, but image for consistency in gallery
    thumbnailUrl: 'https://placehold.co/600x338.png',
    category: 'Drafting',
    aiHint: 'architectural blueprint',
  },
  {
    id: '4',
    title: 'Commercial Building Visualization',
    description: 'A 3D model and visualization of a commercial office building with realistic texturing and environmental lighting.',
    uploadDate: '2023-12-05',
    fileUrl: 'https://placehold.co/800x450.png', 
    fileType: 'image',
    thumbnailUrl: 'https://placehold.co/600x338.png',
    category: 'Commercial Architecture',
    aiHint: 'office building',
  },
  {
    id: '5', // This one uses the small data URI for AI palette testing if needed
    title: 'Product Casing Design',
    description: '3D model for an ergonomic product casing for a new electronic device. Focus on user comfort and manufacturability.',
    uploadDate: '2024-01-10',
    fileUrl: sampleRedSquareDataUri, 
    fileType: 'image',
    thumbnailUrl: 'https://placehold.co/600x338.png', 
    category: 'Product Design',
    aiHint: 'product casing',
  },
  {
    id: '6',
    title: 'Urban Landscape Plan',
    description: '3D visualization of an urban park and recreational area, showcasing green spaces and pedestrian pathways.',
    uploadDate: '2024-02-01',
    fileUrl: 'https://placehold.co/800x450.png',
    fileType: 'image',
    thumbnailUrl: 'https://placehold.co/600x338.png',
    category: 'Urban Planning',
    aiHint: 'urban park',
  },
];
