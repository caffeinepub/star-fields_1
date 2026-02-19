import { Link } from '@tanstack/react-router';
import { Moon, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useCurrentNakshatra } from '../hooks/useCurrentNakshatra';
import { getPadaInfo } from '../utils/padaData';

export default function CurrentNakshatraBanner() {
  const currentNakshatra = useCurrentNakshatra();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const padaInfo = getPadaInfo(currentNakshatra.name, currentNakshatra.padaNumber);

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
                Nakshatra {currentNakshatra.index} of 27 • Pada {currentNakshatra.padaNumber} • Click to explore
              </p>
            </div>
          </div>
        </Link>

        {/* Pada Details Section */}
        {padaInfo && (
          <div className="border-t border-primary/20">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-primary/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <div className="text-left">
                  <p className="text-xs font-medium text-accent uppercase tracking-wider">
                    Current Lunar Climate
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">
                    Pada {padaInfo.padaNumber} • {padaInfo.navamsaSign} Navamsa • {padaInfo.title}
                  </p>
                </div>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            {/* Expanded Description */}
            {isExpanded && (
              <div className="px-6 pb-6 pt-2">
                <div className="bg-background/50 rounded-lg p-4 border border-primary/10">
                  <div className="flex items-start gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <p className="text-xs font-medium text-accent uppercase tracking-wider">
                      {padaInfo.degreeRange}
                    </p>
                  </div>
                  <div className="prose prose-sm prose-invert max-w-none">
                    {padaInfo.description.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-sm text-muted-foreground leading-relaxed mb-3 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
