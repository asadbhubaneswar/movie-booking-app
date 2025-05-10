import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Movie from '@/models/Movie';

export async function GET() {
  await connectDB();
  try {
    const movies = await Movie.find();
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  const { title, description } = await request.json();
  try {
    const movie = new Movie({ title, description });
    await movie.save();
    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}