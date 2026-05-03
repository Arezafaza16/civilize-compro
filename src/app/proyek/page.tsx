import { Metadata } from 'next';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import CompanyInfo from '@/models/CompanyInfo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectFilter from '@/components/ProjectFilter';
import TextReveal from '@/components/animations/TextReveal';

export async function generateMetadata(): Promise<Metadata> {
  await dbConnect();
  const info = await CompanyInfo.findOne().lean();
  
  return {
    title: `Portofolio Proyek | ${info?.name || 'Civilize'}`,
    description: 'Jelajahi keseluruhan proyek unggulan yang membanggakan dari berbagai kategori komersial, residensial, infrastruktur, dan renovasi yang telah kami kerjakan.',
  };
}

// Safely serialize Mongoose lean documents to pure JSON for Client Components
const safeJson = (data: any) => JSON.parse(JSON.stringify(data));

export default async function ProyekPage() {
  await dbConnect();
  const [projectsRes, companyInfo] = await Promise.all([
    Project.find().sort({ year: -1, _id: -1 }).lean(),
    CompanyInfo.findOne().lean()
  ]);

  const projects = safeJson(projectsRes) || [];

  return (
    <>
      <Navbar />

      <main className="bg-surface custom-min-h">
        {/* Dynamic Dark Hero Banner matching Next.js App Router internal page standards */}
        <div className="bg-secondary text-white pt-40 pb-20 relative overflow-hidden">
          {/* Accent Shapes */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <TextReveal 
              text="Portofolio Kami" 
              as="h1" 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 sm:mb-6" 
            />
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Jelajahi deretan proyek unggulan yang membanggakan dari Civilize. Temukan bagaimana kami menerjemahkan visi menjadi struktur ikonik yang kokoh.
            </p>
          </div>
        </div>

        {/* Global Proyek Filter Content Grid */}
        <section className="section-padding bg-surface -mt-8 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProjectFilter projects={projects} />
          </div>
        </section>
      </main>

      <Footer companyInfo={safeJson(companyInfo)} />
    </>
  );
}
