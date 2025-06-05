"use client";

import { useState } from 'react';
import type { Design } from '@/types/design';
import { GalleryItem } from './gallery-item';
import { DesignModal } from '@/components/modal/design-modal';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Button } from '@/components/ui/button';
// import { Search, XIcon } from 'lucide-react';

interface GalleryProps {
  designs: Design[];
}

export function Gallery({ designs: initialDesigns }: GalleryProps) {
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [searchTerm, setSearchTerm] = useState('');
  // const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleItemClick = (design: Design) => {
    setSelectedDesign(design);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDesign(null);
  };

  // const categories = ['all', ...new Set(initialDesigns.map(d => d.category).filter(Boolean) as string[])];

  // const filteredDesigns = initialDesigns.filter(design => {
  //   const matchesSearchTerm = design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                             design.description.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesCategory = selectedCategory === 'all' || design.category === selectedCategory;
  //   return matchesSearchTerm && matchesCategory;
  // });
  
  // const clearFilters = () => {
  //   setSearchTerm('');
  //   setSelectedCategory('all');
  // };
  
  const filteredDesigns = initialDesigns; // For homepage, show all passed designs

  return (
    <div className="container mx-auto px-4">
      {/* Filter UI removed for homepage context
      <div className="mb-8 p-6 bg-card rounded-xl shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <label htmlFor="search-designs" className="block text-sm font-medium text-muted-foreground mb-1">Search Designs</label>
            <div className="relative">
              <Input
                id="search-designs"
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-muted-foreground mb-1">Filter by Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category-filter">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {(searchTerm || selectedCategory !== 'all') && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="mt-4 text-primary hover:text-primary/80">
                <XIcon className="mr-2 h-4 w-4" />
                Clear Filters
            </Button>
        )}
      </div>
      */}

      {filteredDesigns.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredDesigns.map((design) => (
            <GalleryItem key={design.id} design={design} onItemClick={handleItemClick} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          {/* <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" /> */}
          <h3 className="text-xl font-semibold text-foreground">No Designs Found</h3>
          <p className="text-muted-foreground mt-2">Check back later for new projects.</p>
        </div>
      )}

      {selectedDesign && (
        <DesignModal
          design={selectedDesign}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
