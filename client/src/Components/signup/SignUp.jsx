/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input } from '../index';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function SignupPage() {
  const [signupStatus, setSignupStatus] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0); // countdown timer
  const navigate = useNavigate();

  // Auto close modal after 3 seconds if success
  useEffect(() => {
    if (signupStatus !== null) {
      const timer = setTimeout(() => {
        if (signupStatus === 'success') {
          navigate('/');
        }
        setSignupStatus(null); // reset for all statuses
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [signupStatus, navigate]);

  // Countdown for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [resendTimer]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const emailValue = watch('email');
  const nameValue = watch('name');

  // 1️⃣ Send OTP
  const handleSendOtp = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/send-otp`,
        { userName: nameValue, email: emailValue },
        { withCredentials: true }
      );
      setOtpSent(true);
      setSignupStatus('otpSent');
      setResendTimer(60); // start countdown
    } catch (error) {
      console.error('Error sending OTP:', error);
      setSignupStatus('otpFail');
    }
  };

  // 2️⃣ Verify OTP
  const handleVerifyOtp = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/verify-otp`,
        { otp },
        { withCredentials: true }
      );
      setSignupStatus('otpVerified');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setSignupStatus('otpInvalid');
    }
  };

  // 3️⃣ Resend OTP
  const handleResendOtp = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/send-otp`,
        { userName: nameValue, email: emailValue },
        { withCredentials: true }
      );
      setSignupStatus('otpResent');
      setOtp(''); // reset OTP field
      setResendTimer(60); // lock for 60 seconds
    } catch (error) {
      console.error('Error resending OTP:', error);
      setSignupStatus('otpFail');
    }
  };

  // 4️⃣ Final Signup
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`,
        {
          userName: data.name,
          email: data.email,
          password: data.password,
          mobileNumber: data.mobileNumber,
        },
        { withCredentials: true }
      );
      setSignupStatus('success');
      reset();
    } catch (error) {
      console.error('Error while signing up:', error);

      if (error.response && error.response.status === 400) {
        const message = error.response.data.message || '';
        if (message.includes('email')) {
          setSignupStatus('duplicateEmail');
        } else if (message.includes('mobile')) {
          setSignupStatus('duplicateMobile');
        } else {
          setSignupStatus('fail');
        }
      } else {
        setSignupStatus('fail');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-orange-200 to-yellow-100 p-6">
      <motion.div className="w-full max-w-md">
        <div className="bg-white/90 rounded-2xl shadow-xl border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-center text-orange-600 mb-2">
            Urban Eats
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Fresh flavors, delivered to your doorstep.
          </p>

          {/* Signup Form */}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="name"
              type="text"
              label="Name"
              placeholder="Your full name"
              icon={User}
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message}
            />

            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              icon={Mail}
              {...register('email', { required: 'Email is required' })}
              error={errors.email?.message}
            />

            {/* OTP Flow */}
            {!otpSent ? (
              <Button
                type="button"
                className="w-full bg-orange-500 text-white"
                onClick={handleSendOtp}
                disabled={!emailValue || !nameValue}
              >
                Send OTP
              </Button>
            ) : (
              <div>
                <Input
                  id="otp"
                  type="text"
                  label="Enter OTP"
                  placeholder="6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <div className="flex gap-2 mt-2">
                  {/* Verify OTP Button */}
                  <Button
                    type="button"
                    className="flex-1 bg-green-500 text-white"
                    onClick={handleVerifyOtp}
                  >
                    Verify OTP
                  </Button>

                  {/* Resend OTP Button with countdown */}
                  <Button
                    type="button"
                    className="flex-1 bg-orange-500 text-white"
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0}
                  >
                    {resendTimer > 0
                      ? `Resend in ${resendTimer}s`
                      : 'Resend OTP'}
                  </Button>
                </div>
              </div>
            )}

            <Input
              id="mobileNumber"
              type="tel"
              label="Mobile Number"
              placeholder="Your mobile number"
              icon={Phone}
              {...register('mobileNumber', {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Enter a valid 10-digit number',
                },
              })}
              error={errors.mobileNumber?.message}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              icon={Lock}
              {...register('password', { required: 'Password is required' })}
              error={errors.password?.message}
            />

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
            >
              Sign Up
            </Button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{' '}
            <Link
              to="/user/login"
              className="text-orange-600 hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* ✅ Status Modal */}
        <AnimatePresence>
          {signupStatus && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-2xl shadow-2xl text-center font-medium max-w-sm w-full mx-4 ${
                  signupStatus === 'success' || signupStatus === 'otpVerified'
                    ? 'bg-green-50 border border-green-200 text-green-700'
                    : signupStatus === 'otpSent' || signupStatus === 'otpResent'
                      ? 'bg-blue-50 border border-blue-200 text-blue-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                }`}
              >
                {signupStatus === 'success' && (
                  <p className="text-lg font-semibold">
                    🎉 Successfully Signed Up! Welcome aboard.
                  </p>
                )}
                {signupStatus === 'duplicateEmail' && (
                  <p className="text-lg font-semibold">
                    ⚠️ User already exists with this email.
                  </p>
                )}
                {signupStatus === 'duplicateMobile' && (
                  <p className="text-lg font-semibold">
                    ⚠️ User already exists with this mobile number.
                  </p>
                )}
                {signupStatus === 'fail' && (
                  <p className="text-lg font-semibold">
                    ❌ Signup Failed. Please try again.
                  </p>
                )}
                {signupStatus === 'otpSent' && (
                  <p className="text-lg font-semibold">
                    📩 OTP sent to your email.
                  </p>
                )}
                {signupStatus === 'otpVerified' && (
                  <p className="text-lg font-semibold">
                    ✅ OTP Verified! Now you can sign up.
                  </p>
                )}
                {signupStatus === 'otpInvalid' && (
                  <p className="text-lg font-semibold">❌ Invalid OTP.</p>
                )}
                {signupStatus === 'otpResent' && (
                  <p className="text-lg font-semibold">
                    🔄 OTP resent to your email.
                  </p>
                )}
                {signupStatus === 'otpFail' && (
                  <p className="text-lg font-semibold">
                    ❌ Failed to send OTP. Try again later.
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
