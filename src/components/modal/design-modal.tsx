"use client";

import type { Design } from '@/types/design';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { AIPaletteSuggester } from '@/components/ai/ai-palette-suggester';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, FileText } from 'lucide-react';

interface DesignModalProps {
  design: Design | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DesignModal({ design, isOpen, onClose }: DesignModalProps) {
  if (!design) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-headline text-2xl text-primary">{design.title}</DialogTitle>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground pt-1">
            <CalendarDays className="h-4 w-4" />
            <span>Uploaded: {new Date(design.uploadDate).toLocaleDateString()}</span>
            {design.category && <Badge variant="secondary">{design.category}</Badge>}
          </div>
        </DialogHeader>

        <ScrollArea className="flex-grow overflow-y-auto px-6">
          <div className="my-4">
            {design.fileType === 'image' ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                <Image
                  src={design.fileUrl}
                  alt={design.title}
                  layout="fill"
                  objectFit="contain"
                  data-ai-hint={design.aiHint || 'design image'}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-muted/50 rounded-lg border border-dashed p-8 text-center">
                <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">PDF Document</h3>
                <p className="text-sm text-muted-foreground">'{design.title}.pdf'</p>
                <p className="text-xs text-muted-foreground mt-2">(Interactive PDF viewer would be implemented here)</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => alert('PDF download/view functionality to be added.')}>
                  Open PDF (placeholder)
                </Button>
              </div>
            )}
          </div>

          <DialogDescription className="text-base text-foreground leading-relaxed whitespace-pre-wrap">
            {design.description}
          </DialogDescription>

          {design.fileType === 'image' && <AIPaletteSuggester design={design} />}
        
        </ScrollArea>
        
        <DialogFooter className="p-6 pt-0 sm:justify-end border-t mt-auto">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
