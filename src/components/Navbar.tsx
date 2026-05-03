'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { label: 'Beranda', href: '/#beranda' },
  { label: 'Tentang', href: '/#tentang' },
  { label: 'Layanan', href: '/#layanan' },
  { label: 'Proyek', href: '/#proyek' },
  { label: 'Tim', href: '/#tim' },
  { label: 'Kontak', href: '/#kontak' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const targetId = href.substring(2); // Remove '/#'
      // If we are on the homepage, scroll smoothly
      if (isHomePage) {
        e.preventDefault();
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          setMobileOpen(false);
        }
      }
      // If we're on another page, let the native link navigation take us to /#targetId
    }
  };

  // We always want the solid modern Navbar now because Hero Section is bright.
  const isSolid = true;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm py-0`}
      aria-label="Navigasi utama"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 items-center h-20 transition-all">
          {/* Logo */}
          <div className="justify-self-start">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary-dark transition-colors shadow-md">
                <span className="text-white font-bold text-xl font-heading">C</span>
              </div>
              <span className="text-2xl font-bold font-heading transition-colors text-secondary">
                Civilize
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center justify-center gap-8 justify-self-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:transition-all hover:after:w-full text-foreground/80 hover:text-primary after:bg-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button and Mobile Menu */}
          <div className="flex items-center gap-4 justify-self-end">
            <a
              href="/#kontak"
              onClick={(e) => handleNavClick(e, '/#kontak')}
              className="hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-all shadow-lg bg-primary hover:bg-primary-dark text-white hover:shadow-primary/25"
            >
              <Phone className="w-4 h-4" />
              Minta Penawaran
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 transition-colors text-foreground hover:text-primary"
              aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t border-border shadow-xl transition-all duration-300 ${
          mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                handleNavClick(e, link.href);
                setMobileOpen(false);
              }}
              className="block py-3 text-foreground/80 hover:text-primary hover:pl-2 transition-all font-medium border-b border-border/50 last:border-none"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#kontak"
            onClick={(e) => {
              handleNavClick(e, '/#kontak');
              setMobileOpen(false);
            }}
            className="flex items-center justify-center gap-2 mt-4 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium text-center transition-colors"
          >
            <Phone className="w-4 h-4" />
            Minta Penawaran
          </a>
        </div>
      </div>
    </nav>
  );
}
