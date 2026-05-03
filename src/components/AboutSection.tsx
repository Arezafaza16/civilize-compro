'use client';

import AnimateOnScroll from '@/components/animations/AnimateOnScroll';
import TextReveal from '@/components/animations/TextReveal';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ICompanyInfo } from '@/types';

interface AboutSectionProps {
  company: ICompanyInfo;
}

export default function AboutSection({ company }: AboutSectionProps) {
  const info = company || {
    name: 'Civilize',
    about: 'Civilize adalah perusahaan konstruksi yang didirikan dengan visi untuk membangun masa depan yang lebih baik.',
    vision: 'Menjadi perusahaan konstruksi terdepan di Asia Tenggara.',
    mission: [
      'Memberikan hasil konstruksi berkualitas tinggi tepat waktu.',
      'Menerapkan praktik ramah lingkungan.',
      'Mengutamakan keselamatan dan kesehatan kerja.'
    ],
    certifications: ['ISO 9001:2015', 'ISO 14001:2015', 'OHSAS 18001'],
  };
  return (
    <section id="tentang" className="section-padding bg-white" aria-labelledby="tentang-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div>
            <AnimateOnScroll animation="fade-right">
              <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-2 block">Tentang Kami</span>
            </AnimateOnScroll>

            <TextReveal
              text="Mitra Konstruksi Terpercaya di Indonesia"
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6 section-title-accent"
            />

            <AnimateOnScroll animation="fade-up" delay={0.2}>
              <p className="text-muted text-lg leading-relaxed mb-8">
                {info.about}
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={0.3}>
              <div className="space-y-4 mb-8">
                {info.mission.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-foreground/80 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

            {/* Certifications */}
            <AnimateOnScroll animation="fade-up" delay={0.4}>
              <div className="flex flex-wrap gap-2 mb-8">
                {info.certifications.slice(0, 4).map((cert, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 bg-surface text-foreground/70 px-3 py-1.5 rounded-full text-xs font-medium border border-border"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    {cert.split(' - ')[0]}
                  </span>
                ))}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={0.1}>
              <Link
                href="/tentang"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-colors group mt-2"
              >
                Selengkapnya Tentang Kami
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimateOnScroll>
          </div>

          {/* Image */}
          <AnimateOnScroll animation="fade-left" delay={0.2}>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                  alt="Tim Civilize sedang bekerja di proyek konstruksi"
                  width={800}
                  height={600}
                  className="w-full h-[500px] object-cover"
                />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-[240px] border border-border">
                <div className="text-3xl font-bold text-primary font-heading mb-1">25+</div>
                <p className="text-muted text-sm">Tahun pengalaman membangun kepercayaan & kualitas</p>
              </div>

              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary/20 rounded-2xl -z-10" />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
