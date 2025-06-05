
"use client";

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from '@/components/ui/dialog';
import type { Design } from '@/types/design';

const designFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  fileUrl: z.string().url({ message: "Please enter a valid URL for the file." }).or(z.literal('')).transform(val => val === '' ? `https://placehold.co/800x600/374151/9CA3AF.png?text=Placeholder` : val), // Darker placeholder
  fileType: z.enum(['image', 'pdf']),
  thumbnailUrl: z.string().url({ message: "Please enter a valid URL for the thumbnail." }).optional().or(z.literal('')),
  category: z.string().optional(),
  aiHint: z.string().optional(),
});

export type DesignFormValues = z.infer<typeof designFormSchema>;

interface DesignFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DesignFormValues) => void;
  initialData?: Design | null;
}

const defaultImagePlaceholder = "https://placehold.co/800x600/374151/9CA3AF.png?text=Placeholder"; // Darker placeholder
const defaultPdfFileUrl = "placeholder.pdf";

export function DesignForm({ isOpen, onClose, onSubmit, initialData }: DesignFormProps) {
  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting }, watch } = useForm<DesignFormValues>({
    resolver: zodResolver(designFormSchema),
    defaultValues: {
      title: '',
      description: '',
      fileUrl: '',
      fileType: 'image',
      thumbnailUrl: '',
      category: '',
      aiHint: '',
    }
  });

  const currentFileType = watch('fileType');

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        fileUrl: initialData.fileUrl === defaultPdfFileUrl && initialData.fileType === 'pdf' ? '' : initialData.fileUrl,
        fileType: initialData.fileType,
        thumbnailUrl: initialData.thumbnailUrl,
        category: initialData.category,
        aiHint: initialData.aiHint,
      });
    } else {
      reset({
        title: '',
        description: '',
        fileUrl: '',
        fileType: 'image',
        thumbnailUrl: '',
        category: '',
        aiHint: '',
      });
    }
  }, [initialData, reset, isOpen]);
  
  const handleFormSubmit = (data: DesignFormValues) => {
    let submissionData = { ...data };
    if (submissionData.fileType === 'image' && !submissionData.fileUrl) {
      submissionData.fileUrl = defaultImagePlaceholder;
    } else if (submissionData.fileType === 'pdf' && !submissionData.fileUrl) {
      submissionData.fileUrl = defaultPdfFileUrl;
    }
    
    if (submissionData.fileType === 'image' && !submissionData.thumbnailUrl && submissionData.fileUrl?.startsWith('https://placehold.co')) {
        submissionData.thumbnailUrl = submissionData.fileUrl.replace(/(\/\d+x\d+)/, '/400x300');
    } else if (submissionData.fileType === 'pdf' && !submissionData.thumbnailUrl) {
        submissionData.thumbnailUrl = `https://placehold.co/400x300/374151/9CA3AF.png?text=PDF`; // Darker placeholder
    }

    onSubmit(submissionData);
  };


  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col bg-card border-border text-card-foreground">
        <DialogHeader>
          <DialogTitle className="font-headline text-xl text-primary">
            {initialData ? 'Edit Design' : 'Add New Design'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {initialData ? 'Update the details of your design.' : 'Fill in the details for the new design.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex-grow overflow-y-auto space-y-6 p-1 pr-3">
          <div>
            <Label htmlFor="title" className="text-card-foreground">Title</Label>
            <Input id="title" {...register('title')} placeholder="e.g., Modern Villa Concept" className="bg-input border-border focus:ring-primary text-foreground"/>
            {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="description" className="text-card-foreground">Description</Label>
            <Textarea id="description" {...register('description')} placeholder="A detailed description of the design..." rows={4} className="bg-input border-border focus:ring-primary text-foreground"/>
            {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fileType" className="text-card-foreground">File Type</Label>
              <Controller
                name="fileType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="fileType" className="bg-input border-border focus:ring-primary text-foreground">
                      <SelectValue placeholder="Select file type" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border text-popover-foreground">
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.fileType && <p className="text-sm text-destructive mt-1">{errors.fileType.message}</p>}
            </div>
             <div>
              <Label htmlFor="category" className="text-card-foreground">Category</Label>
              <Input id="category" {...register('category')} placeholder="e.g., Architecture, Product Design" className="bg-input border-border focus:ring-primary text-foreground"/>
              {errors.category && <p className="text-sm text-destructive mt-1">{errors.category.message}</p>}
            </div>
          </div>
          
          <div>
            <Label htmlFor="fileUrl" className="text-card-foreground">
              File URL {currentFileType === 'image' ? '(e.g., https://placehold.co/800x600.png)' : '(e.g., placeholder.pdf or link to PDF)'}
            </Label>
            <Input 
              id="fileUrl" 
              {...register('fileUrl')} 
              placeholder={currentFileType === 'image' ? defaultImagePlaceholder : 'Enter PDF URL or leave blank for default'}
              className="bg-input border-border focus:ring-primary text-foreground"
            />
            {errors.fileUrl && <p className="text-sm text-destructive mt-1">{errors.fileUrl.message}</p>}
            <p className="text-xs text-muted-foreground mt-1">
                If blank for image, a default placeholder will be used. For PDF, a default string will be used.
            </p>
          </div>

          {currentFileType === 'image' && (
            <div>
              <Label htmlFor="thumbnailUrl" className="text-card-foreground">Thumbnail URL (Optional)</Label>
              <Input id="thumbnailUrl" {...register('thumbnailUrl')} placeholder="e.g., https://placehold.co/400x300.png" className="bg-input border-border focus:ring-primary text-foreground"/>
              {errors.thumbnailUrl && <p className="text-sm text-destructive mt-1">{errors.thumbnailUrl.message}</p>}
              <p className="text-xs text-muted-foreground mt-1">If blank, will try to use File URL or a default PDF icon thumbnail.</p>
            </div>
          )}
          
          <div>
            <Label htmlFor="aiHint" className="text-card-foreground">AI Hint (Optional, for image placeholders)</Label>
            <Input id="aiHint" {...register('aiHint')} placeholder="e.g., modern villa, gear assembly (max 2 words)" className="bg-input border-border focus:ring-primary text-foreground"/>
            {errors.aiHint && <p className="text-sm text-destructive mt-1">{errors.aiHint.message}</p>}
             <p className="text-xs text-muted-foreground mt-1">Used by AI to generate relevant placeholder images if File URL is a placeholder.co link without specific content.</p>
          </div>
          
          <DialogFooter className="pt-4 mt-auto sticky bottom-0 bg-card pb-1">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={onClose} className="border-border hover:bg-muted/50 text-foreground">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {isSubmitting ? (initialData ? 'Saving...' : 'Adding...') : (initialData ? 'Save Changes' : 'Add Design')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
