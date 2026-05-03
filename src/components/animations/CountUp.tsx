'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({
  end,
  suffix = '',
  duration = 2,
  className = '',
}: CountUpProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !hasMounted) return;

    const counter = { value: 0 };

    gsap.to(counter, {
      value: end,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        setDisplayValue(Math.round(counter.value));
      },
    });
  }, { scope: containerRef, dependencies: [hasMounted] });

  return (
    <span ref={containerRef} className={className} suppressHydrationWarning>
      {displayValue}{suffix}
    </span>
  );
}
