'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const Tracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    const track = async () => {
      let visitorId = localStorage.getItem('visitorId');
      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem('visitorId', visitorId);
      }

      await fetch('/api/stats/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: pathname,
          visitorId,
          userAgent: navigator.userAgent,
          referrer: document.referrer || 'direct'
        })
      });
    };
    track();
  }, [pathname]);

  return null;
};