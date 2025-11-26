// app/verify-otp/page.js
"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function VerifyOtpPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const { verifyOtp } = useAuth();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    } else {
      router.push('/login');
    }
  }, [searchParams, router]);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      setIsLoading(false);
      return;
    }

    const result = await verifyOtp(email, otpString);
    
    if (result.success) {
      if (result.user.role === 'helper') {
        router.push('/dashboard/helper');
      } else {
        router.push('/dashboard/learner');
      }
    } else {
      setError(result.error);
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("OTP sent successfully!");
      } else {
        const error = await response.json();
        alert(error.message || "Failed to resend OTP");
      }
    } catch (error) {
      alert("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Verify Your Email</h1>
          <p className="mt-2 text-gray-600">
            We've sent a verification code to {email}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center">
              <label className="text-lg font-semibold mb-4">One-Time Password</label>
              
              <div className="flex gap-2 mb-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                    disabled={isLoading}
                  />
                ))}
              </div>
              
              <p className="text-sm text-gray-500 text-center">
                Please enter the 6-digit code sent to your email.
              </p>
              
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  'Verify Email'
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-blue-600 hover:text-blue-500 text-sm disabled:opacity-50"
                  disabled={isLoading}
                >
                  Didn't receive the code? Resend OTP
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="text-gray-600 hover:text-gray-500 text-sm disabled:opacity-50"
                  disabled={isLoading}
                >
                  Back to Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}