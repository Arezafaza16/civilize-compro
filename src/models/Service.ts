import mongoose, { Schema } from 'mongoose';
import type { IService } from '@/types';

const ServiceSchema = new Schema<IService>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  icon: { type: String, required: true },
  image: { type: String, required: true },
  features: [{ type: String }],
  order: { type: Number, required: true, default: 0 },
});

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
