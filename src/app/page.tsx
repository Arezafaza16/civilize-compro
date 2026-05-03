import dbConnect from '@/lib/mongodb';
import HeroSlide from '@/models/HeroSlide';
import Stat from '@/models/Stat';
import CompanyInfo from '@/models/CompanyInfo';
import Service from '@/models/Service';
import Project from '@/models/Project';
import Testimonial from '@/models/Testimonial';
import TeamMember from '@/models/TeamMember';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import WhyUsSection from '@/components/WhyUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import JsonLd, { organizationJsonLd } from '@/components/SEO';

// Revalidate page every hour for ISR
export const revalidate = 3600;

export default async function Home() {
  await dbConnect();

  // Parallel fetch all data for homepage
  const [
    heroSlides,
    stats,
    companyInfo,
    services,
    projects,
    testimonials,
    team
  ] = await Promise.all([
    HeroSlide.find().sort('order').lean(),
    Stat.find().lean(),
    CompanyInfo.findOne().lean(),
    Service.find().sort('order').lean(),
    Project.find({ featured: true }).lean(),
    Testimonial.find().lean(),
    TeamMember.find().sort('order').lean()
  ]);

  // Convert ObjectIds to strings to avoid hydration issues
  const safeJson = (data: any) => JSON.parse(JSON.stringify(data));

  return (
    <>
      <JsonLd data={organizationJsonLd({
        name: companyInfo?.name || 'Civilize',
        description: companyInfo?.tagline || 'Perusahaan Konstruksi Terpercaya',
        phone: companyInfo?.phone || '',
        email: companyInfo?.email || '',
        address: companyInfo?.address || '',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://civilize.com'
      })} />
      
      <Navbar />
      
      <main>
        <HeroSection slides={safeJson(heroSlides)} />
        <StatsBar stats={safeJson(stats)} />
        <AboutSection company={safeJson(companyInfo)} />
        <ServicesSection services={safeJson(services)} />
        <WhyUsSection />
        <ProjectsSection projects={safeJson(projects)} />
        <TestimonialsSection testimonials={safeJson(testimonials)} />
        <TeamSection team={safeJson(team)} />
        <ContactSection companyInfo={safeJson(companyInfo)} />
      </main>

      <Footer companyInfo={safeJson(companyInfo)} />
    </>
  );
}
