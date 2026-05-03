export interface IHeroSlide {
  _id?: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
  order: number;
}

export interface IService {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  features: string[];
  order: number;
}

export interface IProject {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  longDescription: string;
  images: string[];
  client: string;
  location: string;
  year: number;
  duration: string;
  value: string;
  featured: boolean;
}

export interface IStat {
  _id?: string;
  value: number;
  label: string;
  suffix: string;
}

export interface ITestimonial {
  _id?: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface ITeamMember {
  _id?: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  fullBio: string;
  image: string;
  certifications: string[];
  experience: string;
  order: number;
}

export interface ICompanyInfo {
  _id?: string;
  name: string;
  tagline: string;
  about: string;
  vision: string;
  mission: string[];
  phone: string;
  email: string;
  address: string;
  socialLinks: {
    instagram: string;
    linkedin: string;
    facebook: string;
    youtube: string;
  };
  certifications: string[];
}

export interface IContactSubmission {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt?: Date;
}
