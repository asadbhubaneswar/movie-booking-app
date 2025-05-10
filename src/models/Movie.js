import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
});

export default mongoose.models.Movie || mongoose.model('Movie', movieSchema);