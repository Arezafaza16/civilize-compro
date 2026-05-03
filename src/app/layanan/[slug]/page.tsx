import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import CompanyInfo from '@/models/CompanyInfo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await dbConnect();
  const slug = (await params).slug;
  const service = await Service.findOne({ slug }).lean();
  
  if (!service) return { title: 'Layanan Tidak Ditemukan' };

  return {
    title: `${service.title} | Layanan Civilize`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  await dbConnect();
  const slug = (await params).slug;
  const service = await Service.findOne({ slug }).lean();
  const companyInfo = await CompanyInfo.findOne().lean();

  if (!service) return notFound();

  const safeCompany = JSON.parse(JSON.stringify(companyInfo));

  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb 
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Layanan', href: '/#layanan' },
              { label: service.title }
            ]} 
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="relative h-[280px] sm:h-[350px] lg:h-[600px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="py-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-foreground mb-4 sm:mb-6">
                {service.title}
              </h1>
              
              <div className="prose prose-lg text-muted mb-10">
                <p className="text-xl font-medium text-secondary mb-6">{service.description}</p>
                <div dangerouslySetInnerHTML={{ __html: service.longDescription || `<p>${service.description}</p>` }} />
              </div>

              {service.features && service.features.length > 0 && (
                <div className="bg-surface-alt p-8 rounded-2xl border border-border/50 mb-10">
                  <h3 className="text-2xl font-bold font-heading mb-6">Fitur Layanan</h3>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {service.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-muted">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/#kontak" 
                  className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold transition-colors inline-flex items-center gap-2"
                >
                  Konsultasi Sekarang
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/#proyek" 
                  className="bg-surface hover:bg-surface-alt text-foreground border border-border px-8 py-4 rounded-xl font-bold transition-colors inline-flex items-center gap-2"
                >
                  Lihat Portofolio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer companyInfo={safeCompany} />
    </>
  );
}
