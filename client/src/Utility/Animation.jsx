/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

export const SlideUpAnimation = ({
  className = '',
  children,
  duration = 0.5,
  delay = 0,
  ...props
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Slide Up
export const SlideUp = ({ className = "", children, duration = 0.5, delay = 0, ...props }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration, delay, ease: "easeOut" }}
    {...props}
  >
    {children}
  </motion.div>
);

// Slide Down
export const SlideDown = ({ className = "", children, duration = 0.5, delay = 0, ...props }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration, delay, ease: "easeOut" }}
    {...props}
  >
    {children}
  </motion.div>
);

// Slide Left
export const SlideLeft = ({ className = "", children, duration = 0.5, delay = 0, ...props }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration, delay, ease: "easeOut" }}
    {...props}
  >
    {children}
  </motion.div>
);

// Slide Right
export const SlideRight = ({ className = "", children, duration = 0.5, delay = 0, ...props }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration, delay, ease: "easeOut" }}
    {...props}
  >
    {children}
  </motion.div>
);

// Scale In
export const ScaleIn = ({ className = "", children, duration = 0.5, delay = 0, ...props }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration, delay, ease: "easeOut" }}
    {...props}
  >
    {children}
  </motion.div>
);

