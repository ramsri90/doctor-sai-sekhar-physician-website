'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const checkInitialVisibility = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      const windowHeight = window.innerHeight;
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Reveal elements that are already near or inside the viewport
        if (rect.top <= windowHeight + 150) {
          el.classList.add('is-revealed');
        }
      });
    };

    // Run initial check immediately
    checkInitialVisibility();

    // Only run the observer if the browser does NOT support native scroll-driven animations
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
          threshold: 0,
          rootMargin: '0px 0px 150px 0px'
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

