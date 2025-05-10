import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request) {
  await connectDB();
  const { email } = await request.json();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Pleas enter valid credentials' }, { status: 400 });
    }
    //creates token for authentication and for localstorage
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return NextResponse.json({ token, user: { id: user._id, name: user.name, email } });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}