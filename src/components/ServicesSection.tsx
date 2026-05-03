'use client';

import AnimateOnScroll from '@/components/animations/AnimateOnScroll';
import TextReveal from '@/components/animations/TextReveal';
import { ArrowRight, Building2, Home, Hammer, LandPlot, Paintbrush, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import type { IService } from '@/types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Home,
  Hammer,
  LandPlot,
  Paintbrush,
  ClipboardList,
};

interface ServicesSectionProps {
  services: IService[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="layanan" className="section-padding bg-surface" aria-labelledby="layanan-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimateOnScroll animation="fade-up">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-2 block">Layanan Kami</span>
          </AnimateOnScroll>
          <TextReveal
            text="Solusi Konstruksi Terlengkap untuk Setiap Kebutuhan"
            as="h2"
            className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4 section-title-accent-center"
          />
          <AnimateOnScroll animation="fade-up" delay={0.2}>
            <p className="text-muted text-lg mt-6">
              Dari perencanaan hingga serah terima, kami menyediakan layanan konstruksi menyeluruh dengan standar kualitas tertinggi.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Services Grid */}
        <AnimateOnScroll animation="fade-up" stagger={0.1}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || Building2;
              return (
                <Link
                  key={service.slug}
                  href={`/layanan/${service.slug}`}
                  className="group bg-white rounded-xl p-8 border border-border card-hover block"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white text-primary transition-all duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 font-heading group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                    Lihat Detail
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
