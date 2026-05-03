'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, ChevronUp, Link as LinkIcon } from 'lucide-react';
import type { ICompanyInfo } from '@/types';

interface FooterProps {
  companyInfo: ICompanyInfo | null;
}

export default function Footer({ companyInfo }: FooterProps) {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const socialLinks = [
    { icon: LinkIcon, href: companyInfo?.socialLinks?.instagram || '#', label: 'Instagram' },
    { icon: LinkIcon, href: companyInfo?.socialLinks?.linkedin || '#', label: 'LinkedIn' },
    { icon: LinkIcon, href: companyInfo?.socialLinks?.facebook || '#', label: 'Facebook' },
    { icon: LinkIcon, href: companyInfo?.socialLinks?.youtube || '#', label: 'YouTube' },
  ];

  const quickLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Tentang Kami', href: '/#tentang' },
    { label: 'Layanan', href: '/#layanan' },
    { label: 'Proyek', href: '/#proyek' },
    { label: 'Tim Kami', href: '/#tim' },
    { label: 'Kontak', href: '/#kontak' },
  ];

  const services = [
    { label: 'Konstruksi Komersial', href: '/layanan/konstruksi-komersial' },
    { label: 'Konstruksi Residensial', href: '/layanan/konstruksi-residensial' },
    { label: 'Manajemen Proyek', href: '/layanan/manajemen-proyek' },
    { label: 'Desain Interior', href: '/layanan/desain-interior' },
    { label: 'Renovasi', href: '/layanan/renovasi' },
  ];

  return (
    <footer className="bg-secondary-dark text-white pt-20 pb-10" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block text-3xl font-bold text-white font-heading tracking-tight">
              Civilize<span className="text-primary">.</span>
            </Link>
            <p className="text-zinc-400 leading-relaxed pr-4">
              {companyInfo?.tagline || 'Membangun masa depan dan mewujudkan impian melalui konstruksi inovatif dan berkualitas tinggi.'}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:bg-primary hover:text-white hover:border-primary transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-6 relative inline-block">
              Tautan Cepat
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-zinc-400 hover:text-primary hover:translate-x-1 inline-block transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-6 relative inline-block">
              Layanan Kami
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-zinc-400 hover:text-primary hover:translate-x-1 inline-block transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-6 relative inline-block">
              Hubungi Kami
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-400">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{companyInfo?.address || 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta, Indonesia 10220'}</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>{companyInfo?.phone || '+62 21 1234 5678'}</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>{companyInfo?.email || 'info@civilize.com'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm" suppressHydrationWarning>
            &copy; {currentYear} Civilize Construction. Hak Cipta Dilindungi Undang-Undang.
          </p>
          
          <a 
            href="#top" 
            className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            aria-label="Kembali ke atas"
          >
            <ChevronUp className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
