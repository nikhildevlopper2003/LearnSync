// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { sendOtpEmail } from '@/lib/email';

export async function POST(request) {
  try {
    await dbConnect();
    const { name, email, password, role } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      otp: {
        code: otpCode,
        expiresAt: otpExpires,
      },
    });

    // Send OTP email
    await sendOtpEmail(email, otpCode);

    return NextResponse.json(
      { message: 'User created successfully. Please check your email for verification code.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}