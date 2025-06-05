import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Briefcase, Mail } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Logo />
        <div className="ml-auto flex items-center space-x-4">
          <p className="hidden sm:block text-sm text-muted-foreground font-medium">
            Innovative 3D Design & Drafting Solutions
          </p>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin">
                <Briefcase className="mr-2 h-4 w-4" />
                Admin
              </Link>
            </Button>
            <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href="mailto:contact@draftport.example.com">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
