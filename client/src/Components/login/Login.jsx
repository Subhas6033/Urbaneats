/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { Input } from '../index';

//Card Component
const Card = ({ children, className = '' }) => (
  <div
    className={`bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-8 ${className}`}>{children}</div>
);

// Button Component
const Button = ({ children, className = '', ...props }) => (
  <button
    className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function LoginComp() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Login submitted:', form);
      // TODO: Connect to backend API for login
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
        <Card>
          <CardContent>
            {/* Brand */}
            <h1 className="text-3xl font-bold text-center text-orange-600 mb-2">
              Urban Eats
            </h1>
            <p className="text-center text-gray-500 mb-6">
              Welcome back! Please log in.
            </p>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="you@example.com"
                icon={Mail}
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />

              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                icon={Lock}
                value={form.password}
                onChange={handleChange}
                error={errors.password}
              />

              <Button type="submit">Log In</Button>
            </form>

            {/* Redirect to Signup */}
            <p className="text-sm text-center text-gray-500 mt-6">
              Don’t have an account?{' '}
              <Link
                to="/user/signup"
                className="text-orange-600 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
