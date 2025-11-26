// app/login/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { GalleryVerticalEnd } from "lucide-react"

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState('learner');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');

    if (isSignup) {
      const result = await signup({ name, email, password, role });
      if (result.success) {
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        alert(result.error);
      }
    } else {
      const result = await login(email, password);
      if (result.success) {
        if (result.user.role === 'helper') {
          router.push('/dashboard/helper');
        } else {
          router.push('/dashboard/learner');
        }
      } else {
        alert(result.error);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          LearnSync
        </a>
        
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-2xl font-bold">
                {isSignup ? 'Create an account' : 'Welcome back'}
              </h1>
              <p className="text-muted-foreground text-center text-sm">
                {isSignup 
                  ? 'Enter your details to create your account' 
                  : 'Enter your email to sign in to your account'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {isSignup && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>

              {isSignup && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">
                    I want to join as a
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="role"
                        value="learner"
                        checked={role === 'learner'}
                        onChange={(e) => setRole(e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-sm">Learner</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="role"
                        value="helper"
                        checked={role === 'helper'}
                        onChange={(e) => setRole(e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-sm">Helper</span>
                    </label>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isSignup ? 'Creating account...' : 'Signing in...'}
                  </>
                ) : (
                  isSignup ? 'Create Account' : 'Sign In'
                )}
              </button>

              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-primary hover:underline"
                >
                  {isSignup
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Sign up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}