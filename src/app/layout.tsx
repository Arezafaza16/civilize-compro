import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Civilize Construction",
    default: "Civilize - Membangun Masa Depan & Impian",
  },
  description: "Perusahaan konstruksi terkemuka yang menawarkan layanan konstruksi komersial, residensial, infrastruktur, dan desain interior.",
  openGraph: {
    title: "Civilize Construction",
    description: "Perusahaan konstruksi terkemuka yang menawarkan layanan konstruksi komersial, residensial, infrastruktur, dan desain interior.",
    url: "https://civilize.com",
    siteName: "Civilize Construction",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
