// app/api/auth/resend-otp/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { sendOtpEmail } from '@/lib/email';

export async function POST(request) {
  try {
    await dbConnect();
    const { email } = await request.json();

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

    // Generate new OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update user with new OTP
    user.otp = {
      code: otpCode,
      expiresAt: otpExpires,
    };
    await user.save();

    // Send OTP email
    await sendOtpEmail(email, otpCode);

    return NextResponse.json(
      { message: 'OTP sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Resend OTP error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}