'use client';

import { useState } from 'react';
import AnimateOnScroll from '@/components/animations/AnimateOnScroll';
import TextReveal from '@/components/animations/TextReveal';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import type { ICompanyInfo } from '@/types';

interface ContactSectionProps {
  companyInfo: ICompanyInfo | null;
}

export default function ContactSection({ companyInfo }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontak" className="section-padding bg-surface" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimateOnScroll animation="fade-up">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-2 block">Hubungi Kami</span>
          </AnimateOnScroll>
          <TextReveal
            text="Mari Diskusikan Proyek Anda"
            as="h2"
            id="contact-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4 section-title-accent-center"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <AnimateOnScroll animation="fade-right">
            <div>
              <h3 className="text-2xl font-bold font-heading mb-6">Informasi Kontak</h3>
              <p className="text-muted mb-8 text-lg">
                Kami siap mendengarkan rencana pembangunan Anda. Tim kami akan segera merespons setiap pertanyaan atau permintaan penawaran harga.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Kantor Pusat</h4>
                    <p className="text-muted leading-relaxed">
                      {companyInfo?.address || 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta, Indonesia 10220'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Telepon</h4>
                    <p className="text-muted">{companyInfo?.phone || '+62 21 1234 5678'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email</h4>
                    <p className="text-muted">{companyInfo?.email || 'info@civilize.com'}</p>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="mt-10 rounded-2xl overflow-hidden border border-border h-64 bg-surface-alt">
                <iframe
                  title="Lokasi Civilize Construction"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2904810519393!2d106.81338531476882!3d-6.226110995494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e3d42fca55%3A0x484ee4e29e437406!2sJl.%20Jend.%20Sudirman%2C%20Jakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </AnimateOnScroll>

          {/* Contact Form */}
          <AnimateOnScroll animation="fade-left">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-border/50">
              <h3 className="text-2xl font-bold font-heading mb-6">Kirim Pesan</h3>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-xl">
                  Pesan Anda telah berhasil dikirim! Kami akan segera menghubungi Anda kembali.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl">
                  Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Nama Lengkap</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-surface-alt focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-surface-alt focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">No. Telepon / WhatsApp</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-surface-alt focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">Subjek</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-surface-alt focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">Pesan Detail</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-surface-alt focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
