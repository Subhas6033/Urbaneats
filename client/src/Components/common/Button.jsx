import React, { forwardRef } from 'react';
import clsx from 'clsx';

const Button = forwardRef(
  (
    {
      children,
      className = '',
      type = 'button',
      variant = 'primary',
      size = 'md',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer';

    const variants = {
      primary:
        'bg-yellow-500 text-white shadow-lg hover:bg-yellow-600 focus:ring-yellow-400',
      secondary:
        'bg-gray-200 text-gray-900 shadow-sm hover:bg-gray-300 focus:ring-gray-400',
      outline:
        'border border-yellow-500 text-yellow-600 bg-transparent hover:bg-yellow-50 focus:ring-yellow-400',
      danger:
        'bg-red-500 text-white shadow-lg hover:bg-red-600 focus:ring-red-400',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-7 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);


export default Button;
