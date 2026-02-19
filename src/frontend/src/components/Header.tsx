import { Link } from '@tanstack/react-router';
import { Moon } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/nakshatras" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Moon className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Star Field Explorer</h1>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to="/nakshatras"
              className="text-sm font-medium hover:text-primary transition-colors"
              activeProps={{ className: 'text-primary' }}
            >
              Nakshatras
            </Link>
            <Link
              to="/admin"
              className="text-sm font-medium hover:text-primary transition-colors"
              activeProps={{ className: 'text-primary' }}
            >
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
