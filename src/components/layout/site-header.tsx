import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Logo />
        <nav className="ml-auto flex items-center space-x-2 sm:space-x-4">
          <Button variant="link" size="sm" asChild className="text-foreground/80 hover:text-foreground hover:no-underline">
            <Link href="/#services">Services</Link>
          </Button>
          <Button variant="link" size="sm" asChild className="text-foreground/80 hover:text-foreground hover:no-underline">
            <Link href="/#featured-projects">Portfolio</Link>
          </Button>
          <Button variant="link" size="sm" asChild className="text-foreground/80 hover:text-foreground hover:no-underline">
            <Link href="/#about">About</Link>
          </Button>
          <Button variant="link" size="sm" asChild className="text-foreground/80 hover:text-foreground hover:no-underline">
            <Link href="mailto:contact@designcraft.example.com">Contact</Link>
          </Button>
          <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="mailto:quote@designcraft.example.com">Get a Quote</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
