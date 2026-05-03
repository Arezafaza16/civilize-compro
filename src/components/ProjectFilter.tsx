'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Calendar, Building2 } from 'lucide-react';
import AnimateOnScroll from '@/components/animations/AnimateOnScroll';
import type { IProject } from '@/types';

interface ProjectFilterProps {
  projects: IProject[];
}

const categories = ['Semua', 'Komersial', 'Residensial', 'Infrastruktur', 'Renovasi'];

export default function ProjectFilter({ projects }: ProjectFilterProps) {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filteredProjects = activeCategory === 'Semua' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === category
                ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                : 'bg-white text-muted hover:bg-neutral-100 border border-border border-b-2 hover:-translate-y-0.5 hover:text-foreground'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 min-h-[500px]">
        {filteredProjects.map((project, index) => (
          <AnimateOnScroll key={project.slug} animation="fade-up" delay={index * 0.1}>
            <Link
              href={`/proyek/${project.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden border border-border card-hover h-full flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.images[0] || '/images/placeholder.jpg'}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-primary shadow-sm border border-white/20">
                    {project.category}
                  </span>
                </div>
                {/* Fallback elegant overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold font-heading text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs font-medium text-muted mb-4 border-t border-border/50 pt-4">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" />
                    {project.year}
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-wide mt-auto group-hover:gap-3 transition-all">
                  VIEW PROJECT
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </AnimateOnScroll>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <Building2 className="w-16 h-16 text-border mx-auto mb-4" />
          <p className="text-muted text-lg">Belum ada proyek dalam kategori ini.</p>
        </div>
      )}
    </div>
  );
}
