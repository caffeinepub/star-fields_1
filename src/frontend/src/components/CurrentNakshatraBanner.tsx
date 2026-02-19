import { Link } from '@tanstack/react-router';
import { Moon, Sparkles } from 'lucide-react';
import { useCurrentNakshatra } from '../hooks/useCurrentNakshatra';

export default function CurrentNakshatraBanner() {
  const currentNakshatra = useCurrentNakshatra();

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-primary/30 rounded-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      
      <div className="relative">
        {/* Main Banner - Clickable Link */}
        <Link
          to="/nakshatras/$slug/$section"
          params={{ slug: currentNakshatra.slug, section: 'traits' }}
          className="block px-6 py-5 hover:bg-primary/5 transition-colors group"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="relative">
              <Moon className="w-8 h-8 text-primary animate-pulse" />
              <Sparkles className="w-4 h-4 text-primary absolute -top-1 -right-1" />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground font-medium mb-1">Moon is currently in</p>
              <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                {currentNakshatra.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Nakshatra {currentNakshatra.index} of 27 • Click to explore
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
