'use client';

import AnimateOnScroll from '@/components/animations/AnimateOnScroll';
import TextReveal from '@/components/animations/TextReveal';
import { ShieldCheck, Clock, Users } from 'lucide-react';

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Jaminan Kualitas',
    description: 'Kami menggunakan material terbaik dan standar operasional ketat untuk memastikan hasil akhir yang sempurna dan tahan lama bagi setiap proyek.',
  },
  {
    icon: Clock,
    title: 'Tepat Waktu',
    description: 'Manajemen proyek profesional kami menjamin setiap tahapan konstruksi selesai sesuai dengan jadwal yang telah disepakati bersama.',
  },
  {
    icon: Users,
    title: 'Tim Ahli Berpengalaman',
    description: 'Didukung oleh tenaga ahli, insinyur, dan arsitek bersertifikat yang memiliki rekam jejak puluhan tahun di industri konstruksi.',
  },
];

export default function WhyUsSection() {
  return (
    <section className="section-padding bg-surface-alt relative overflow-hidden" aria-labelledby="whyus-heading">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimateOnScroll animation="fade-up">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-2 block">Keunggulan Kami</span>
          </AnimateOnScroll>
          <TextReveal
            text="Mengapa Memilih Civilize?"
            as="h2"
            id="whyus-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4 section-title-accent-center"
          />
          <AnimateOnScroll animation="fade-up" delay={0.2}>
            <p className="text-muted text-lg mt-6">
              Lebih dari sekadar kontraktor, kami adalah mitra strategis untuk mewujudkan visi pembangunan Anda dengan standar tertinggi.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <AnimateOnScroll key={reason.title} animation="fade-up" delay={index * 0.2}>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 card-hover text-center relative group">
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto bg-surface flex items-center justify-center rounded-xl mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-inner">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4 font-heading">{reason.title}</h3>
                    <p className="text-muted leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
