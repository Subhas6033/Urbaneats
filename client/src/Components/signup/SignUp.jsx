/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input } from '../index';
import { Mail, Lock, User, Phone, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendOtp,
  verifyOtp,
  signup,
  resetAuthState,
} from '../../Slice/AuthSlice';

export default function SignupPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select individual states from Redux
  const {
    sendOtp: { loading: otpLoading, status: otpStatus, error: otpError },
    verifyOtp: {
      loading: verifyLoading,
      status: verifyStatus,
      error: verifyError,
    },
    signup: {
      loading: signupLoading,
      status: signupStatus,
      error: signupError,
    },
  } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const emailValue = watch('email');
  const userNameValue = watch('userName');

  // 🟠 OTP STATUS EFFECT
  useEffect(() => {
    if (otpStatus === 'otpSent') {
      setOtpSent(true);
      setResendTimer(60);
      setTimeout(() => dispatch(resetAuthState('sendOtp')), 3000);
    } else if (otpError === 'otpFail' || otpError === 'duplicateEmail') {
      setTimeout(() => dispatch(resetAuthState('sendOtp')), 3000);
    }
  }, [otpStatus, otpError, dispatch]);

  // 🟢 VERIFY STATUS EFFECT
  useEffect(() => {
    if (verifyStatus === 'otpVerified') {
      setIsOtpVerified(true);
      setTimeout(() => dispatch(resetAuthState('verifyOtp')), 3000);
    } else if (verifyError === 'otpInvalid') {
      setTimeout(() => dispatch(resetAuthState('verifyOtp')), 3000);
    }
  }, [verifyStatus, verifyError, dispatch]);

  // 🟣 SIGNUP STATUS EFFECT
  useEffect(() => {
    if (signupStatus === 'success') {
      setTimeout(() => {
        navigate('/');
        dispatch(resetAuthState('signup'));
      }, 2000);
    } else if (signupError) {
      setTimeout(() => dispatch(resetAuthState('signup')), 3000);
    }
  }, [signupStatus, signupError, navigate, dispatch]);

  // 🔁 Resend OTP countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setInterval(
        () => setResendTimer((prev) => prev - 1),
        1000
      );
      return () => clearInterval(timerId);
    }
  }, [resendTimer]);

  // 📨 Send OTP
  const handleSendOtp = async () => {
    await dispatch(sendOtp({ userName: userNameValue, email: emailValue }));
  };

  // 🔐 Verify OTP
  const handleVerifyOtp = async () => {
    await dispatch(verifyOtp({ otp }));
  };

  // 🔁 Resend OTP
  const handleResendOtp = async () => {
    await dispatch(sendOtp({ userName: userNameValue, email: emailValue }));
    setOtp('');
    setResendTimer(60);
  };

  // 🧾 Submit Signup
  const onSubmit = async (data) => {
    try {
      const { userName, email, mobileNumber, password } = data;
      await dispatch(
        signup({ userName, email, mobileNumber, password })
      ).unwrap();
      reset();
    } catch (err) {
      console.error('Signup failed:', err);
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

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="userName"
              type="text"
              label="Name"
              placeholder="Your full name"
              icon={User}
              {...register('userName', { required: 'Name is required' })}
              error={errors.userName?.message}
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

            {/* OTP Section */}
            {!otpSent ? (
              <Button
                type="button"
                className="w-full bg-orange-500 text-white"
                onClick={handleSendOtp}
                disabled={!emailValue || !userNameValue || otpLoading}
              >
                {otpLoading ? 'Sending...' : 'Send OTP'}
              </Button>
            ) : (
              <div>
                {!isOtpVerified && (
                  <Input
                    id="otp"
                    type="text"
                    label="Enter OTP"
                    placeholder="6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                )}
                <div className="flex gap-2 mt-2">
                  <Button
                    type="button"
                    className={`flex-1 flex items-center justify-center gap-2 ${
                      isOtpVerified ? 'bg-green-600' : 'bg-green-500'
                    } text-white`}
                    onClick={handleVerifyOtp}
                    disabled={verifyLoading || isOtpVerified}
                  >
                    {isOtpVerified ? (
                      <Check className="w-5 h-5" />
                    ) : verifyLoading ? (
                      'Verifying...'
                    ) : (
                      'Verify OTP'
                    )}
                  </Button>
                  {!isOtpVerified && (
                    <Button
                      type="button"
                      className="flex-1 bg-orange-500 text-white"
                      onClick={handleResendOtp}
                      disabled={resendTimer > 0 || otpLoading}
                    >
                      {resendTimer > 0
                        ? `Resend in ${resendTimer}s`
                        : 'Resend OTP'}
                    </Button>
                  )}
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
              disabled={signupLoading || !isOtpVerified}
            >
              {signupLoading ? 'Signing Up...' : 'Sign Up'}
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

        {/* ✅ STATUS MODAL */}
        <AnimatePresence>
          {(otpStatus ||
            otpError ||
            verifyStatus ||
            verifyError ||
            signupStatus ||
            signupError) && (
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
                className="p-6 rounded-2xl shadow-2xl text-center font-medium max-w-sm w-full mx-4 bg-white border border-gray-200 text-gray-700"
              >
                {/* OTP Status */}
                {otpStatus === 'otpSent' && (
                  <p className="text-green-600 font-semibold">
                    ✅ OTP sent successfully! Please check your inbox.
                  </p>
                )}
                {otpError === 'otpFail' && (
                  <p className="text-red-600 font-semibold">
                    ❌ Failed to send OTP. Try again later.
                  </p>
                )}
                {otpError === 'duplicateEmail' && (
                  <p className="text-yellow-600 font-semibold">
                    ⚠️ Email already exists. Please log in instead.
                  </p>
                )}

                {/* Verify Status */}
                {verifyStatus === 'otpVerified' && (
                  <p className="text-green-600 font-semibold">
                    🎉 OTP Verified! You can now sign up.
                  </p>
                )}
                {verifyError === 'otpInvalid' && (
                  <p className="text-red-600 font-semibold">
                    ⚠️ Invalid OTP. Please try again.
                  </p>
                )}

                {/* Signup Status */}
                {signupStatus === 'success' && (
                  <p className="text-green-600 font-semibold">
                    🎉 Account created successfully! Redirecting...
                  </p>
                )}
                {signupError === 'duplicateEmail' && (
                  <p className="text-yellow-600 font-semibold">
                    ⚠️ Email already registered. Please log in.
                  </p>
                )}
                {signupError && signupError !== 'duplicateEmail' && (
                  <p className="text-red-600 font-semibold">
                    ❌ Signup failed. Please try again.
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
