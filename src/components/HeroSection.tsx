'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import type { IHeroSlide } from '@/types';

interface HeroSectionProps {
  slides: IHeroSlide[];
}

export default function HeroSection({ slides }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);

  // Auto-advance slides with clean React Effect avoiding GSAP SSR mismatch
  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides]);

  if (!slides || slides.length === 0) return null;

  const slide = slides[current];

  return (
    <section 
      className="relative min-h-screen lg:h-screen lg:max-h-[1080px] flex items-center bg-surface overflow-hidden py-24 lg:py-0" 
      id="beranda"
      aria-label="Banner utama"
    >
      {/* Decorative background shape */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-primary/5 rounded-bl-[150px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* TEXT CONTENT (Left) */}
        <div className="max-w-2xl flex flex-col justify-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white border border-border shadow-sm rounded-full px-5 py-2 mb-8">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold tracking-wider text-foreground/80 uppercase">Civilize Construction</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-bold font-heading text-foreground leading-[1.15] mb-4 sm:mb-6">
            {slide.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted mb-6 sm:mb-10 leading-relaxed max-w-xl">
            {slide.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <a
              href={slide.ctaLink}
              className="group inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-8 py-4.5 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
            >
              {slide.ctaText}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Slider Controls — desktop only (below text) */}
          {slides.length > 1 && (
            <div className="hidden lg:flex items-center gap-8 mt-16 pt-8 border-t border-border/50">           
              <div className="flex gap-2.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2.5 rounded-full transition-all duration-500 shadow-sm ${
                      i === current ? 'w-10 bg-primary' : 'w-2.5 bg-border hover:bg-primary/50'
                    }`}
                    aria-label={`Ke slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* IMAGE/Showcase (Right) */}
        <div className="relative h-[300px] sm:h-[400px] lg:h-[650px] w-full rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-border/50">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={s.backgroundImage}
                alt={s.title}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}

          {/* Slider Controls — mobile only (overlay on image) */}
          {slides.length > 1 && (
            <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === current ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Ke slide ${i + 1}`}
                />
              ))}
            </div>
          )}
               
          {/* Floating Trust Metric overlaying the image */}
          <div className="absolute bottom-12 sm:bottom-10 left-6 sm:left-10 z-20 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg sm:text-xl font-bold text-primary">25+</span>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-foreground">Tahun Keunggulan</p>
              <p className="text-xs text-muted">Membangun Kepercayaan</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
