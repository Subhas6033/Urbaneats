/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input } from '../index';
import { Mail, Lock, User } from 'lucide-react';
import {Link} from 'react-router-dom'

// Card Component
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

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', form);
      // TODO: Connect to backend API for signup
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
              Fresh flavors, delivered to your doorstep.
            </p>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <Input
                id="name"
                name="name"
                type="text"
                label="Name"
                placeholder="Your full name"
                icon={User}
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />

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

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md"
              >
                Sign Up
              </Button>
            </form>

            {/* Redirect to Login */}
            <p className="text-sm text-center text-gray-500 mt-6">
              Already have an account?{' '}
              <Link
                to="/user/login"
                className="text-orange-600 hover:underline font-medium"
              >
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
