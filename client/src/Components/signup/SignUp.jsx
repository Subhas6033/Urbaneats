/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input } from '../index';
import { Mail, Lock, User, Phone, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp, signup, resetStatus } from '../../Slice/AuthSlice';

export default function SignupPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const emailValue = watch('email');
  const userNameValue = watch('userName');

  // Handle status changes
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        if (status === 'success') navigate('/');
        if (status === 'otpVerified') setIsOtpVerified(true);
        dispatch(resetStatus());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, navigate, dispatch]);

  // Resend OTP countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setInterval(
        () => setResendTimer((prev) => prev - 1),
        1000
      );
      return () => clearInterval(timerId);
    }
  }, [resendTimer]);

  const handleSendOtp = async () => {
    setOtpLoading(true);
    try {
      await dispatch(sendOtp({ userName: userNameValue, email: emailValue }));
      setOtpSent(true);
      setResendTimer(60);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpLoading(true);
    try {
      await dispatch(verifyOtp({ otp }));
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setOtpLoading(true);
    try {
      await dispatch(sendOtp({ userName: userNameValue, email: emailValue }));
      setOtp('');
      setResendTimer(60);
    } finally {
      setOtpLoading(false);
    }
  };

  // Submit signup data
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
                    disabled={otpLoading || isOtpVerified}
                  >
                    {isOtpVerified ? (
                      <Check className="w-5 h-5" />
                    ) : otpLoading ? (
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
              disabled={loading || !isOtpVerified}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
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

        {/* Status Modal */}
        <AnimatePresence>
          {status && status !== 'otpVerified' && (
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
                className="p-6 rounded-2xl shadow-2xl text-center font-medium max-w-sm w-full mx-4
                  bg-red-50 border border-red-200 text-red-700"
              >
                {status === 'success' && (
                  <p className="text-lg font-semibold text-green-600">
                    🎉 Account created successfully! Redirecting to home...
                  </p>
                )}
                {status === 'fail' && (
                  <p className="text-lg font-semibold">
                    Signup failed. Please check your details and try again.
                  </p>
                )}
                {status === 'duplicateEmail' && (
                  <p className="text-lg font-semibold">
                    🚨 An account with this email already exists. Please log in
                    instead.
                  </p>
                )}
                {status === 'otpSent' && (
                  <p className="text-lg font-semibold">
                    ✅ OTP has been sent to your email. Please check your inbox.
                  </p>
                )}
                {status === 'otpInvalid' && (
                  <p className="text-lg font-semibold">
                    ⚠️ The OTP you entered is incorrect. Please try again.
                  </p>
                )}
                {status === 'otpFail' && (
                  <p className="text-lg font-semibold">
                    ❌ We couldn’t send the OTP. Please try again later.
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
