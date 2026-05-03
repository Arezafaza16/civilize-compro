'use client';

import CountUp from '@/components/animations/CountUp';
import AnimateOnScroll from '@/components/animations/AnimateOnScroll';
import type { IStat } from '@/types';
import { Award, Building2, Users, ThumbsUp } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'Tahun Pengalaman': <Award className="w-6 h-6" />,
  'Proyek Selesai': <Building2 className="w-6 h-6" />,
  'Tim Profesional': <Users className="w-6 h-6" />,
  'Kepuasan Klien': <ThumbsUp className="w-6 h-6" />,
};

interface StatsBarProps {
  stats: IStat[];
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="bg-secondary py-16 relative overflow-hidden" aria-label="Statistik perusahaan">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, #D4A853 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimateOnScroll animation="fade-up" stagger={0.1}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/20 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {iconMap[stat.label] || <Building2 className="w-6 h-6" />}
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 font-heading">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/60 text-sm sm:text-base font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
