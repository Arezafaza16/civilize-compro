'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  useScrollTrigger?: boolean;
  id?: string;
}

export default function TextReveal({
  text,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  useScrollTrigger = true,
  id,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !hasMounted) return;

    const words = containerRef.current.querySelectorAll('.word');

    const animationConfig: gsap.TweenVars = {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      delay,
      ease: 'power3.out',
    };

    if (useScrollTrigger) {
      animationConfig.scrollTrigger = {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      };
    }

    gsap.from(words, animationConfig);
  }, { scope: containerRef, dependencies: [hasMounted] });

  const wordsArray = text.split(' ');

  return (
    <div ref={containerRef} className="overflow-hidden" suppressHydrationWarning>
      <Tag className={className} id={id}>
        {wordsArray.map((word, index) => (
          <span
            key={index}
            className="word inline-block mr-[0.3em]"
          >
            {word}
          </span>
        ))}
      </Tag>
    </div>
  );
}
