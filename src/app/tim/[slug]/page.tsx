import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import TeamMember from '@/models/TeamMember';
import CompanyInfo from '@/models/CompanyInfo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { GraduationCap, Award, BriefcaseBusiness } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await dbConnect();
  const slug = (await params).slug;
  const member = await TeamMember.findOne({ slug }).lean();
  
  if (!member) return { title: 'Anggota Tim Tidak Ditemukan' };

  return {
    title: `${member.name} | Tim Civilize`,
    description: member.bio,
  };
}

export default async function TeamDetailPage({ params }: Props) {
  await dbConnect();
  const slug = (await params).slug;
  const member = await TeamMember.findOne({ slug }).lean();
  const companyInfo = await CompanyInfo.findOne().lean();

  if (!member) return notFound();

  const safeCompany = JSON.parse(JSON.stringify(companyInfo));

  return (
    <>
      <Navbar />
      
      <main className="pt-24 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb 
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Tim Kami', href: '/#tim' },
              { label: member.name }
            ]} 
          />

          <div className="mt-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-4 space-y-6">
              <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              
              <div className="bg-surface p-6 rounded-2xl border border-border/50">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <BriefcaseBusiness className="w-5 h-5 text-primary" /> Pengalaman
                </h3>
                <p className="text-muted font-medium">{member.experience}</p>
              </div>
            </div>

            <div className="lg:col-span-8 py-4">
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-4">
                  {member.name}
                </h1>
                <p className="text-xl md:text-2xl font-semibold text-primary">
                  {member.role}
                </p>
              </div>
              
              <div className="prose prose-lg text-muted mb-12">
                <p className="text-xl leading-relaxed text-secondary mb-6">{member.bio}</p>
                <div dangerouslySetInnerHTML={{ __html: member.fullBio || `<p>${member.bio}</p>` }} />
              </div>

              {member.certifications && member.certifications.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                    <GraduationCap className="w-8 h-8 text-primary" />
                    Sertifikasi & Afiliasi
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {member.certifications.map((cert: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 bg-surface p-4 rounded-xl border border-border/60">
                        <Award className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="font-medium text-foreground">{cert}</span>
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
