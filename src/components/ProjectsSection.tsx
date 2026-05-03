'use client';

import { useState } from 'react';
import AnimateOnScroll from '@/components/animations/AnimateOnScroll';
import TextReveal from '@/components/animations/TextReveal';
import { MapPin, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { IProject } from '@/types';

const categories = ['Semua', 'Komersial', 'Residensial', 'Infrastruktur', 'Renovasi'];

interface ProjectsSectionProps {
  projects: IProject[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filteredProjects = activeCategory === 'Semua'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="proyek" className="section-padding bg-white" aria-labelledby="proyek-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <AnimateOnScroll animation="fade-up">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-2 block">Proyek Kami</span>
          </AnimateOnScroll>
          <TextReveal
            text="Proyek Unggulan yang Membanggakan"
            as="h2"
            className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4 section-title-accent-center"
          />
          <AnimateOnScroll animation="fade-up" delay={0.2}>
            <p className="text-muted text-lg mt-6">
              Setiap proyek kami mencerminkan komitmen terhadap kualitas, inovasi, dan kepuasan klien.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Category Filters */}
        <AnimateOnScroll animation="fade-up" delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-surface text-muted hover:bg-primary/10 hover:text-primary border border-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <AnimateOnScroll key={project.slug} animation="scale" delay={0.1}>
              <Link
                href={`/proyek/${project.slug}`}
                className="group block bg-white rounded-xl overflow-hidden border border-border card-hover"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt={`Proyek ${project.title} oleh Civilize`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <span className="inline-flex items-center gap-1.5 text-white font-semibold text-sm">
                      Lihat Detail
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                  <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 font-heading group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex items-center gap-1.5 text-muted text-xs">
                    <MapPin className="w-3.5 h-3.5" />
                    {project.location} • {project.year}
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

        {/* View All Button */}
        <AnimateOnScroll animation="fade-up" delay={0.4}>
          <div className="text-center mt-12">
            <a
              href="#proyek"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Lihat Semua Proyek
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
