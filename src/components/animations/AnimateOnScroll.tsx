'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AnimationType = 'fade-up' | 'fade-left' | 'fade-right' | 'fade-down' | 'scale' | 'fade';

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  stagger?: number;
  once?: boolean;
}

export default function AnimateOnScroll({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.8,
  className = '',
  stagger = 0,
  once = true,
}: AnimateOnScrollProps) {
  const container = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useGSAP(() => {
    if (!container.current || !hasMounted) return;

    const getAnimation = () => {
      switch (animation) {
        case 'fade-up':
          return { y: 40, opacity: 0 };
        case 'fade-down':
          return { y: -40, opacity: 0 };
        case 'fade-left':
          return { x: 60, opacity: 0 };
        case 'fade-right':
          return { x: -60, opacity: 0 };
        case 'scale':
          return { scale: 0.9, opacity: 0 };
        case 'fade':
          return { opacity: 0 };
        default:
          return { y: 40, opacity: 0 };
      }
    };

    const fromVars = getAnimation();
    const targets = stagger > 0 ? container.current.children : container.current;

    gsap.from(targets, {
      ...fromVars,
      duration,
      delay,
      stagger: stagger > 0 ? stagger : undefined,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 85%',
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    });
  }, { scope: container, dependencies: [hasMounted] });

  return (
    <div ref={container} className={className} suppressHydrationWarning>
      {children}
    </div>
  );
}
