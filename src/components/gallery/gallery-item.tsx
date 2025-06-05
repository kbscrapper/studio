"use client";

import type { Design } from '@/types/design';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { FileText, Image as ImageIcon } from 'lucide-react';

interface GalleryItemProps {
  design: Design;
  onItemClick: (design: Design) => void;
}

export function GalleryItem({ design, onItemClick }: GalleryItemProps) {
  return (
    <Card 
      className="overflow-hidden bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col group rounded-lg"
      onClick={() => onItemClick(design)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onItemClick(design);}}
      aria-label={`View details for ${design.title}`}
    >
      <CardHeader className="p-0"> {/* Adjusted padding for image to fill better */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted group-hover:opacity-90 transition-opacity">
          {design.fileType === 'image' ? (
             <Image
                src={design.thumbnailUrl || design.fileUrl}
                alt={design.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={design.aiHint || 'design project image'}
                className="transition-transform duration-300 group-hover:scale-105"
              />
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-secondary/30 p-4">
              {/* <FileText className="w-12 h-12 text-muted-foreground" /> */}
              <span className="mt-2 text-sm text-muted-foreground">{design.title} (PDF)</span>
            </div>
          )}
           {/* File type badge removed for cleaner look as per prototype
           <div className="absolute top-2 right-2">
            {design.fileType === 'image' ? (
              <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm">
                <ImageIcon className="h-3 w-3 mr-1" /> Image
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm">
                <FileText className="h-3 w-3 mr-1" /> PDF
              </Badge>
            )}
          </div>
          */}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <CardTitle className="font-headline text-lg mb-1 leading-tight group-hover:text-primary transition-colors">{design.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-3">
            {design.description}
          </CardDescription>
        </div>
        {/* Category badge removed for cleaner look as per prototype
        {design.category && (
          <div className="mt-auto pt-2">
            <Badge variant="outline">{design.category}</Badge>
          </div>
        )}
        */}
      </CardContent>
    </Card>
  );
}
