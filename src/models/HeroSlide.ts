import mongoose, { Schema } from 'mongoose';
import type { IHeroSlide } from '@/types';

const HeroSlideSchema = new Schema<IHeroSlide>({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  backgroundImage: { type: String, required: true },
  ctaText: { type: String, required: true },
  ctaLink: { type: String, required: true },
  order: { type: Number, required: true, default: 0 },
});

export default mongoose.models.HeroSlide || mongoose.model<IHeroSlide>('HeroSlide', HeroSlideSchema);
