import { LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 text-primary-foreground hover:text-primary-foreground/90 transition-colors">
      <LayoutGrid className="h-7 w-7 text-primary" />
      <span className="font-headline text-xl font-semibold">DesignCraft Studio</span>
    </Link>
  );
}
