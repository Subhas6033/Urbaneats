/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { Input, Button } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetStatus } from '../../Slice/AuthSlice';
import { useForm } from 'react-hook-form';

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

export default function LoginComp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, loading, user } = useSelector((state) => state.auth);

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
      navigate('/menu');
      dispatch(resetStatus());
    }
  }, [status, user, navigate, dispatch]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-100 to-orange-200 p-6">
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
                  minLength: {
                    // value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />

              {status === 'loginFail' && (
                <p className="text-red-500 text-sm text-center font-medium">
                  Invalid email or password.
                </p>
              )}

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
