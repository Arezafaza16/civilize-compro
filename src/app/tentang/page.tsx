import { Metadata } from 'next';
import Image from 'next/image';
import dbConnect from '@/lib/mongodb';
import CompanyInfo from '@/models/CompanyInfo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Award, CheckCircle2 } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  await dbConnect();
  const info = await CompanyInfo.findOne().lean();
  
  return {
    title: `Tentang Kami | ${info?.name || 'Civilize'}`,
    description: info?.about || 'Informasi tentang perusahaan kami.',
  };
}

export default async function TentangPage() {
  await dbConnect();
  const companyInfo = await CompanyInfo.findOne().lean();
  
  const info = companyInfo || {
    name: 'Civilize',
    about: 'Civilize adalah perusahaan konstruksi yang didirikan dengan visi untuk membangun masa depan yang lebih baik. Kami menggabungkan inovasi teknologi, keahlian teknik, dan praktik berkelanjutan.',
    vision: 'Menjadi perusahaan konstruksi terdepan di Asia Tenggara yang dikenal karena kualitas, inovasi, dan integritas.',
    mission: [
      'Memberikan hasil konstruksi berkualitas tinggi tepat waktu dan sesuai anggaran.',
      'Menerapkan praktik ramah lingkungan dan berkelanjutan dalam setiap proyek.',
      'Mengutamakan keselamatan dan kesehatan kerja bagi seluruh tim.',
      'Membangun hubungan jangka panjang dengan klien berdasarkan kepercayaan.'
    ],
    certifications: ['ISO 9001:2015', 'ISO 14001:2015', 'OHSAS 18001'],
  };

  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-foreground mb-6">Tentang <span className="text-primary">{info.name}</span></h1>
            <p className="text-xl text-muted leading-relaxed">
              Kami adalah mitra tepercaya Anda dalam membangun struktur yang kuat, estetis, dan berkelanjutan.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-border">
            {/* Story Section */}
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-96 md:h-auto">
                <Image
                  src="/images/tentang-hero.png"
                  alt="Konstruksi Civilize"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <h2 className="text-3xl font-bold font-heading mb-6">Cerita Kami</h2>
                <div className="prose prose-lg text-muted">
                  <p>{info.about}</p>
                </div>
              </div>
            </div>

            {/* Vision Mission */}
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 lg:p-16 bg-surface-alt">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
                <h2 className="text-2xl font-bold font-heading mb-4 text-primary">Visi</h2>
                <p className="text-muted text-lg relative z-10">{info.vision}</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
                <h2 className="text-2xl font-bold font-heading mb-4 text-primary">Misi</h2>
                <ul className="space-y-3 relative z-10">
                  {info.mission.map((m: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-muted">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Certifications */}
            {info.certifications && info.certifications.length > 0 && (
              <div className="p-8 md:p-12 lg:p-16 text-center border-t border-border">
                <h2 className="text-2xl font-bold font-heading mb-8">Sertifikasi & Penghargaan</h2>
                <div className="flex flex-wrap justify-center gap-6">
                  {info.certifications.map((cert: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 bg-surface px-6 py-3 rounded-full border border-border/60">
                      <Award className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-foreground">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer companyInfo={JSON.parse(JSON.stringify(info))} />
    </>
  );
}
