import mongoose, { Schema } from 'mongoose';
import type { ITeamMember } from '@/types';

const TeamMemberSchema = new Schema<ITeamMember>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  fullBio: { type: String, required: true },
  image: { type: String, required: true },
  certifications: [{ type: String }],
  experience: { type: String, required: true },
  order: { type: Number, required: true, default: 0 },
});

export default mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);
