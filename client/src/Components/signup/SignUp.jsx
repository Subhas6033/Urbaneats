/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input } from '../index';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function SignupPage() {
  // Signup status: "success" | "duplicateEmail" | "duplicateMobile" | "fail" | null
  const [signupStatus, setSignupStatus] = useState(null);
  const navigate = useNavigate();

  // Auto close modal after 3 seconds
  useEffect(() => {
    if (signupStatus !== null) {
      const timer = setTimeout(() => {
        if (signupStatus === 'success') {
          navigate('/');
        }
        setSignupStatus(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [signupStatus, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Submit handler
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/user/signup',
        {
          userName: data.name,
          email: data.email,
          password: data.password,
          mobileNumber: data.mobileNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      console.log('Signup successful:', res.data);
      setSignupStatus('success');
      reset();
    } catch (error) {
      console.error('Error While Submitting the form', error);

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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Signup Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center text-orange-600 mb-2">
              Urban Eats
            </h1>
            <p className="text-center text-gray-500 mb-6">
              Fresh flavors, delivered to your doorstep.
            </p>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {/* User Name */}
              <Input
                id="name"
                type="text"
                label="Name"
                placeholder="Your full name"
                icon={User}
                {...register('name', { required: 'Name is required' })}
                error={errors.name?.message}
              />

              {/* Email */}
              <Input
                id="email"
                type="email"
                label="Email"
                placeholder="you@example.com"
                icon={Mail}
                {...register('email', { required: 'Email is required' })}
                error={errors.email?.message}
              />
              {/* Mobile */}
              <Input
                id="mobileNumber"
                type="tel"
                label="Mobile Number"
                placeholder="Your mobile number"
                icon={Phone}
                {...register('mobileNumber', {
                  // required: 'Mobile number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Enter a valid 10-digit number',
                  },
                })}
                error={errors.mobileNumber?.message}
              />
              {/* Password */}
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
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md"
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
        </div>

        {/* ✅ Signup Status Modal */}
        <AnimatePresence>
          {signupStatus !== null && (
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
                  signupStatus === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-700'
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
