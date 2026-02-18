import { useState, useEffect } from 'react';
import { getCurrentNakshatra, type NakshatraInfo } from '../utils/nakshatraEngine';

const REFRESH_INTERVAL = 5 * 60 * 1000; // Refresh every 5 minutes

export function useCurrentNakshatra() {
  const [currentNakshatra, setCurrentNakshatra] = useState<NakshatraInfo>(() => 
    getCurrentNakshatra()
  );

  useEffect(() => {
    const updateNakshatra = () => {
      const nakshatra = getCurrentNakshatra();
      setCurrentNakshatra(nakshatra);
    };

    // Update immediately
    updateNakshatra();

    // Set up interval to refresh periodically
    const interval = setInterval(updateNakshatra, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return currentNakshatra;
}
