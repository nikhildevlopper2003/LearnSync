import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(request) {
  try {
    await dbConnect();
    const { email, otp } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { message: 'User already verified' },
        { status: 400 }
      );
    }

    if (!user.otp || user.otp.code !== otp) {
      return NextResponse.json(
        { message: 'Invalid OTP' },
        { status: 400 }
      );
    }

    if (new Date() > user.otp.expiresAt) {
      return NextResponse.json(
        { message: 'OTP has expired' },
        { status: 400 }
      );
    }

    // Mark user as verified and clear OTP
    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user.toObject();
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}