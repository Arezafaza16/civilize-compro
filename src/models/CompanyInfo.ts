import mongoose, { Schema } from 'mongoose';
import type { ICompanyInfo } from '@/types';

const CompanyInfoSchema = new Schema<ICompanyInfo>({
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  about: { type: String, required: true },
  vision: { type: String, required: true },
  mission: [{ type: String }],
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  socialLinks: {
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    facebook: { type: String, default: '' },
    youtube: { type: String, default: '' },
  },
  certifications: [{ type: String }],
});

export default mongoose.models.CompanyInfo || mongoose.model<ICompanyInfo>('CompanyInfo', CompanyInfoSchema);
