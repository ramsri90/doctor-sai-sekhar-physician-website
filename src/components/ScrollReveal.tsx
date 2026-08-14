'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Only run the fallback if the browser does NOT support native scroll-driven animations
    if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
            }
          }
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach((el) => {
        observer.observe(el);
      });
      
      return () => {
        elements.forEach((el) => observer.unobserve(el));
      };
    }
  }, [pathname]); // Re-run when pathname changes

  return null;
}
