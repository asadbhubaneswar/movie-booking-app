import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request) {
  await connectDB();
  const { name, email } = await request.json();

  try {
    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    user = new User({ name, email });
    await user.save();
//creating token for user so that we can use it for authentication and localstorage
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return NextResponse.json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}