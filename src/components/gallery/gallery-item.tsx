"use client";

import type { Design } from '@/types/design';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Image as ImageIcon } from 'lucide-react';

interface GalleryItemProps {
  design: Design;
  onItemClick: (design: Design) => void;
}

export function GalleryItem({ design, onItemClick }: GalleryItemProps) {
  return (
    <Card 
      className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col group"
      onClick={() => onItemClick(design)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onItemClick(design);}}
      aria-label={`View details for ${design.title}`}
    >
      <CardHeader className="p-4">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-muted group-hover:opacity-90 transition-opacity">
          {design.fileType === 'image' ? (
             <Image
                src={design.thumbnailUrl || design.fileUrl}
                alt={design.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={design.aiHint || 'design thumbnail'}
                className="transition-transform duration-300 group-hover:scale-105"
              />
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-secondary/30">
              <FileText className="w-12 h-12 text-muted-foreground" />
              <span className="mt-2 text-xs text-muted-foreground">PDF Document</span>
            </div>
          )}
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
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow flex flex-col justify-between">
        <div>
          <CardTitle className="font-headline text-lg mb-1 leading-tight group-hover:text-primary transition-colors">{design.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {design.description}
          </CardDescription>
        </div>
        {design.category && (
          <div className="mt-auto">
            <Badge variant="outline">{design.category}</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
