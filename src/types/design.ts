export interface Design {
  id: string;
  title: string;
  description: string;
  uploadDate: string;
  fileUrl: string; // URL to image or PDF. Can be a data URI for AI if needed.
  fileType: 'image' | 'pdf';
  thumbnailUrl?: string;
  category?: string; // Optional for filtering
  aiHint?: string; // For placeholder image generation
}
