import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get('movieId');

  if (!movieId) {
    return NextResponse.json({ message: 'Movie ID is required' }, { status: 400 });
  }

  try {
  
    const bookings = await Booking.find({ movieId }).select('seats');
    const bookedSeats = bookings.flatMap((booking) => booking.seats);
    return NextResponse.json(bookedSeats);
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}


export async function POST(request) {
  await connectDB();
  const { movieId, seats } = await request.json();
  const token = request.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // to verify if there is a valid token with JWT_SECRET so that we can get userId fir POST
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Setting price per seat at Rs 20(Implementing auto calculation of total price) 
    const totalPrice = seats.length * 20;

    // Create and save booking
    const booking = new Booking({
      userId,
      movieId,
      seats,
      totalPrice,
    });
    await booking.save();

    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}