/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { Input, Button } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetAuthState, getUser } from '../../Slice/AuthSlice';
import { useForm } from 'react-hook-form';

// Toast Component
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

//  Card Components
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

//  Main Login Component
export default function LoginComp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const {
    login: { status: loginStatus, loading: loginLoading, error: loginError },
    getUser: { status: userStatus, error: userError },
    user,
  } = useSelector((state) => state.auth);

  const [toast, setToast] = useState({ message: '', type: '' });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '', password: '' } });

  //  Handle Login Submit
  const onSubmit = async (data) => {
    dispatch(login(data));
  };

  //  Handle toast + redirect
  useEffect(() => {
    if (loginStatus === 'success') {
      setToast({ message: 'Successfully logged in 🎉', type: 'success' });

      dispatch(getUser())
        .unwrap()
        .then((fetchedUser) => {
          setTimeout(() => {
            const encodedName = encodeURIComponent(fetchedUser?.userName || '');
            if (encodedName) {
              navigate(`/menu`);
            } else {
              navigate('/user/signup');
            }
            dispatch(resetAuthState('login'));
            setToast({ message: '', type: '' });
          }, 1500);
        })
        .catch((err) => {
          console.error('❌ Failed to fetch user after login:', err);
          setToast({
            message: 'Could not load user data. Try refreshing.',
            type: 'error',
          });
        });
    }

    if (loginError === 'loginFail') {
      setToast({ message: 'Invalid email or password ❌', type: 'error' });
      setTimeout(() => {
        dispatch(resetAuthState('login'));
        setToast({ message: '', type: '' });
      }, 2500);
    }

    if (loginError && loginError !== 'loginFail') {
      setToast({
        message: 'Something went wrong. Please try again later.',
        type: 'error',
      });
      setTimeout(() => {
        dispatch(resetAuthState('login'));
        setToast({ message: '', type: '' });
      }, 2500);
    }
  }, [loginStatus, loginError, dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-100 to-orange-200 p-6">
      {/* Toast */}
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

              {/* Updated Custom Button */}
              <Button
                type="submit"
                variant="green"
                size="md"
                round="lg"
                disabled={loginLoading || isSubmitting}
                className="w-full mt-2"
              >
                {loginLoading ? 'Logging in...' : 'Log In'}
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
