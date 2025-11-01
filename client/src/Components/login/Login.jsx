/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { Input, Button } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetStatus } from '../../Slice/AuthSlice';
import { useForm } from 'react-hook-form';

//  Custom Toast Component
function Toast({ message, type, onClose, showClose = false }) {
  if (!message) return null;

  const styleMap = {
    success:
      'bg-gradient-to-r from-green-400 to-emerald-600 text-white border border-green-300 shadow-lg shadow-emerald-200/50',
    error:
      'bg-gradient-to-r from-red-500 to-rose-600 text-white border border-red-300 shadow-lg shadow-red-200/50',
    warning:
      'bg-gradient-to-r from-yellow-400 to-amber-500 text-black border border-yellow-200 shadow-lg shadow-amber-100/70',
  };

  const bgColor = styleMap[type] || styleMap.warning;

  return (
    <div
      className={`${bgColor} fixed top-6 left-1/2 transform -translate-x-1/2 px-8 py-4 rounded-2xl text-lg font-semibold tracking-wide transition-all duration-300 animate-fadeIn z-50 flex items-center justify-center min-w-[320px]`}
    >
      <span>{message}</span>
      {showClose && (
        <button
          onClick={onClose}
          className="ml-4 font-bold text-xl leading-none hover:opacity-75 transition"
        >
          ✖
        </button>
      )}
    </div>
  );
}

// Card Components
const Card = ({ children, className = '' }) => (
  <div
    className={`bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-orange-100 ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-10 ${className}`}>{children}</div>
);

// Main login
export default function LoginComp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, loading, user } = useSelector((state) => state.auth);
  const [toast, setToast] = useState({ message: '', type: '' });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '', password: '' } });

  const onSubmit = async (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (status === 'loggedIn' && user) {
      setToast({ message: 'Successfully logged in 🎉', type: 'success' });
      setTimeout(() => {
        navigate('/menu');
        dispatch(resetStatus());
        setToast({ message: '', type: '' });
      }, 2000);
    }

    if (status === 'loginFail') {
      setToast({ message: 'Invalid email or password ❌', type: 'error' });
      setTimeout(() => {
        dispatch(resetStatus());
        setToast({ message: '', type: '' });
      }, 2500);
    }

    if (status === 'error') {
      setToast({
        message: 'Something went wrong. Please try again later.',
        type: 'error',
      });
      setTimeout(() => {
        dispatch(resetStatus());
        setToast({ message: '', type: '' });
      }, 2500);
    }
  }, [status, user, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-100 to-orange-200 p-6">
      {/* Custom Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: '' })}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <Card>
          <CardContent>
            <div className="flex flex-col items-center mb-8">
              <h1 className="text-4xl font-extrabold text-orange-600 drop-shadow-sm">
                Urban Eats
              </h1>
              <p className="text-gray-500 mt-2 text-center">
                Welcome back! Log in to continue.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                icon={Mail}
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email',
                  },
                })}
              />
              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                })}
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={loading || isSubmitting}
                className="w-full mt-2"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </Button>
            </form>

            <div className="flex flex-col items-center mt-8 space-y-3 text-sm">
              <Link
                to="/forgot-password"
                className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
              >
                Forgot your password?
              </Link>
              <p className="text-gray-500">
                Don’t have an account?{' '}
                <Link
                  to="/user/signup"
                  className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
