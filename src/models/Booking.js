import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  seats: { type: [String], required: true },
  totalPrice: { type: Number, required: true },
});

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);