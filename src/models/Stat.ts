import mongoose, { Schema } from 'mongoose';
import type { IStat } from '@/types';

const StatSchema = new Schema<IStat>({
  value: { type: Number, required: true },
  label: { type: String, required: true },
  suffix: { type: String, required: true },
});

export default mongoose.models.Stat || mongoose.model<IStat>('Stat', StatSchema);
