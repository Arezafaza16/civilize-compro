import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import CompanyInfo from '@/models/CompanyInfo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { MapPin, Calendar, Building2, Wallet } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await dbConnect();
  const slug = (await params).slug;
  const project = await Project.findOne({ slug }).lean();
  
  if (!project) return { title: 'Proyek Tidak Ditemukan' };

  return {
    title: `${project.title} | Portofolio Civilize`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  await dbConnect();
  const slug = (await params).slug;
  const project = await Project.findOne({ slug }).lean();
  const companyInfo = await CompanyInfo.findOne().lean();

  if (!project) return notFound();

  const safeCompany = JSON.parse(JSON.stringify(companyInfo));

  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb 
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Proyek', href: '/#proyek' },
              { label: project.title }
            ]} 
          />

          {/* Hero Image */}
          <div className="mt-8 relative h-[50vh] lg:h-[70vh] w-full rounded-3xl overflow-hidden shadow-2xl mb-12">
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
              <span className="inline-block bg-primary text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4 w-max">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-4">
                {project.title}
              </h1>
              <p className="text-zinc-300 text-lg md:text-xl max-w-3xl">
                {project.description}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Quick Specs */}
            <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-lg border border-border/50 sticky top-32">
              <h3 className="text-2xl font-bold font-heading mb-8">Informasi Proyek</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Klien</p>
                    <p className="font-bold text-foreground">{project.client}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Lokasi</p>
                    <p className="font-bold text-foreground">{project.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Tahun & Durasi</p>
                    <p className="font-bold text-foreground">{project.year} ({project.duration})</p>
                  </div>
                </div>

                {project.value && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center shrink-0">
                      <Wallet className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1">Nilai Proyek</p>
                      <p className="font-bold text-foreground">{project.value}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Content & Gallery */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-border/50 mb-10">
                <h2 className="text-3xl font-bold font-heading mb-6">Detail & Latar Belakang</h2>
                <div 
                  className="prose prose-lg text-muted max-w-none"
                  dangerouslySetInnerHTML={{ __html: project.longDescription || `<p>${project.description}</p>` }}
                />
              </div>

              {project.images.length > 1 && (
                <div>
                  <h3 className="text-2xl font-bold font-heading mb-6">Galeri Proyek</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {project.images.slice(1).map((img: string, idx: number) => (
                      <div key={idx} className="relative h-64 rounded-2xl overflow-hidden shadow-md">
                        <Image
                          src={img}
                          alt={`${project.title} - Galeri ${idx + 1}`}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer companyInfo={safeCompany} />
    </>
  );
}
