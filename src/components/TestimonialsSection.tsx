'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AnimateOnScroll from '@/components/animations/AnimateOnScroll';
import TextReveal from '@/components/animations/TextReveal';
import { Quote, Star } from 'lucide-react';
import type { ITestimonial } from '@/types';

interface TestimonialSectionProps {
  testimonials: ITestimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="section-padding bg-zinc-900 text-white relative overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-primary/10 -skew-x-12 -translate-x-1/2 hidden sm:block" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimateOnScroll animation="fade-up">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-2 block">Testimoni Klien</span>
          </AnimateOnScroll>
          <TextReveal
            text="Apa Kata Mereka Tentang Kami?"
            as="h2"
            id="testimonials-heading"
            className="text-3xl sm:text-4xl font-bold leading-tight mb-4 section-title-accent-center"
          />
        </div>

        <div className="max-w-4xl mx-auto relative">
          <AnimateOnScroll animation="scale">
            <div className="bg-zinc-800/50 backdrop-blur-md border border-zinc-700 p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl relative">
              <Quote className="absolute top-6 right-6 w-20 h-20 text-white/5 rotate-180" />
              
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array( testimonials[currentIndex].rating )].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-base sm:text-xl md:text-2xl font-medium leading-relaxed mb-6 sm:mb-8 italic text-zinc-200 min-h-[80px] sm:min-h-[120px] transition-opacity duration-500">
                  "{testimonials[currentIndex].content}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                    <Image
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-lg font-heading">{testimonials[currentIndex].name}</h4>
                    <p className="text-zinc-400 text-sm">{testimonials[currentIndex].role}, {testimonials[currentIndex].company}</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'bg-primary w-8' : 'bg-zinc-600 hover:bg-zinc-500'
                }`}
                aria-label={`Lihat testimoni ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
