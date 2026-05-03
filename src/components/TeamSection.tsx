'use client';

import Image from 'next/image';
import Link from 'next/link';
import AnimateOnScroll from '@/components/animations/AnimateOnScroll';
import TextReveal from '@/components/animations/TextReveal';
import type { ITeamMember } from '@/types';

interface TeamSectionProps {
  team: ITeamMember[];
}

export default function TeamSection({ team }: TeamSectionProps) {
  if (!team || team.length === 0) return null;

  return (
    <section id="tim" className="section-padding bg-white" aria-labelledby="team-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimateOnScroll animation="fade-up">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-2 block">Tim Kami</span>
          </AnimateOnScroll>
          <TextReveal
            text="Para Ahli di Balik Kesuksesan Kami"
            as="h2"
            id="team-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4 section-title-accent-center"
          />
          <AnimateOnScroll animation="fade-up" delay={0.2}>
            <p className="text-muted text-lg mt-6">
              Keahlian dan dedikasi tim kami adalah pondasi utama dalam menciptakan bangunan berkualitas dan layanan terbaik bagi klien kami.
            </p>
          </AnimateOnScroll>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <AnimateOnScroll key={member.slug} animation="fade-up" delay={index * 0.1}>
              <div className="group relative rounded-2xl overflow-hidden bg-surface-alt border border-border transition-all duration-300 hover:shadow-xl">
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark via-secondary/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Hover Bio Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white/90 text-sm mb-4 line-clamp-3">
                      {member.bio}
                    </p>
                    <Link 
                      href={`/tim/${member.slug}`}
                      className="text-primary font-semibold text-sm uppercase tracking-wider hover:text-white transition-colors"
                    >
                      Lihat Profil &rarr;
                    </Link>
                  </div>
                </div>
                
                <div className="p-6 bg-white relative z-10 -translate-y-4 mx-4 rounded-xl shadow-lg text-center group-hover:-translate-y-6 transition-transform duration-300 min-h-[88px] flex flex-col justify-center">
                  <h3 className="font-bold text-lg text-foreground font-heading line-clamp-1" title={member.name}>{member.name}</h3>
                  <p className="text-primary text-sm font-medium line-clamp-1" title={member.role}>{member.role}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
