'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Stop observing once revealed — no need to re-trigger
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0,
        // Slightly generous margin so elements just below fold pre-reveal,
        // preventing scroll-height miscalculation on iOS
        rootMargin: '0px 0px 20px 0px'
      }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => {
      // Immediately reveal elements already in the viewport (above fold)
      // This prevents invisible/shifted elements from breaking scroll layout on refresh
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-revealed');
      } else {
        observer.observe(el);
      }
    });
    
    return () => {
      observer.disconnect();
    };
  }, [pathname]); // Re-run when pathname changes

  return null;
}
