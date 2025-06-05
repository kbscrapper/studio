
import { Gallery } from '@/components/gallery/gallery';
import { mockDesigns } from '@/data/mock-designs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const featuredDesigns = mockDesigns.slice(0, 4);

  return (
    <>
      <section className="relative h-[calc(100vh-4rem)] min-h-[500px] md:min-h-[600px] flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Modern architectural design"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
          data-ai-hint="modern architecture"
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 container mx-auto px-4 py-12">
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-6">
            Transforming Visions into Reality
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10">
            DesignCraft Studio specializes in creating stunning 3D designs and precise drafts for architects, builders, and homeowners. Let us bring your project to life with our expertise and attention to detail.
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6" asChild>
            <Link href="/#featured-projects">Explore Our Work</Link>
          </Button>
        </div>
      </section>

      <section id="featured-projects" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Featured Projects
          </h2>
          <Gallery designs={featuredDesigns} />
        </div>
      </section>
      
      <section id="services" className="py-16 md:py-24 bg-card">
         <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6 text-card-foreground">Our Services</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                We offer a comprehensive range of 3D modeling, drafting, and visualization services tailored to your needs. (Service details would go here).
            </p>
         </div>
      </section>
      
      <section id="about" className="py-16 md:py-24 bg-background">
         <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6 text-foreground">About Us</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                DesignCraft Studio is passionate about innovation and quality in 3D design. (More about the company).
            </p>
         </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-card-foreground mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Let's discuss how we can turn your ideas into stunning visual realities.
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6" asChild>
            <Link href="mailto:contact@designcraft.example.com">Contact Us</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
