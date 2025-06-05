import { Gallery } from '@/components/gallery/gallery';
import { mockDesigns } from '@/data/mock-designs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
            Showcasing Your Vision in 3D
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore our portfolio of innovative 3D designs and drafts. We bring ideas to life with precision and creativity.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <a href="mailto:contact@draftport.example.com">Get in Touch</a>
          </Button>
        </div>
      </section>
      <Gallery designs={mockDesigns} />
    </>
  );
}
