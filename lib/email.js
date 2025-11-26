// lib/email.js - COMPLETELY NEW FILE
export async function sendOtpEmail(email, otpCode) {
  try {
    // For development, just log the OTP to console
    console.log('══════════════════════════════════════');
    console.log('📧 OTP EMAIL (Development Mode)');
    console.log('To:', email);
    console.log('OTP Code:', otpCode);
    console.log('══════════════════════════════════════');
    
    // Simulate email delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return true;
  } catch (error) {
    console.error('Email simulation error:', error);
    return true; // Still return true for development
  }
}