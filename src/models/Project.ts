import mongoose, { Schema } from 'mongoose';
import type { IProject } from '@/types';

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  images: [{ type: String }],
  client: { type: String, required: true },
  location: { type: String, required: true },
  year: { type: Number, required: true },
  duration: { type: String, required: true },
  value: { type: String, required: true },
  featured: { type: Boolean, default: false },
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
