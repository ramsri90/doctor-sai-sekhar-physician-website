"use client";

import { useEffect, useRef, useState } from "react";

interface Counter {
  id: number;
  title: string;
  count: string;
}

interface CounterSectionProps {
  initialCounters: Counter[];
}

export default function AnimatedCounterSection({ initialCounters }: CounterSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayCounts, setDisplayCounts] = useState<string[]>(
    initialCounters.map(() => "0")
  );

  // Helper to parse count string (e.g. "1,00,000+" -> 100000, "50,000+" -> 50000)
  const parseCount = (countStr: string): { target: number; suffix: string } => {
    const numericStr = countStr.replace(/,/g, "").replace(/\+/g, "");
    const target = parseInt(numericStr, 10);
    const hasPlus = countStr.includes("+");
    return {
      target: isNaN(target) ? 0 : target,
      suffix: hasPlus ? "+" : ""
    };
  };

  // Format number back to Indian locale style (e.g. 100000 -> "1,00,000")
  const formatIndianNumber = (num: number): string => {
    const numStr = Math.floor(num).toString();
    if (numStr.length <= 3) return numStr;
    const lastThree = numStr.substring(numStr.length - 3);
    const otherNumbers = numStr.substring(0, numStr.length - 3);
    const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
    return formatted;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const duration = 2000; // Animation duration in ms
          const frameRate = 1000 / 60; // 60 FPS
          const totalFrames = duration / frameRate;
          let frame = 0;

          const countersData = initialCounters.map((c) => parseCount(c.count));

          const interval = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            
            // Ease-out quad function: f(t) = t * (2 - t)
            const easeProgress = progress * (2 - progress);

            const nextCounts = initialCounters.map((c, idx) => {
              const { target, suffix } = countersData[idx];
              const currentVal = target * easeProgress;
              
              if (frame >= totalFrames) {
                return formatIndianNumber(target) + suffix;
              }
              return formatIndianNumber(currentVal) + suffix;
            });

            setDisplayCounts(nextCounts);

            if (frame >= totalFrames) {
              clearInterval(interval);
            }
          }, frameRate);

          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [initialCounters, hasAnimated]);

  return (
    <section ref={sectionRef} className="counter-section">
      <div className="container counter-grid">
        {initialCounters.map((cnt, idx) => (
          <div key={cnt.id} className="counter-card">
            <span className="counter-number">{displayCounts[idx]}</span>
            <h4 className="counter-title">{cnt.title}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
