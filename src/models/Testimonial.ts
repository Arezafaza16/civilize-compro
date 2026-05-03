import mongoose, { Schema } from 'mongoose';
import type { ITestimonial } from '@/types';

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  content: { type: String, required: true },
  avatar: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
