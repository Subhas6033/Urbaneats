import React from 'react';

const Input = React.forwardRef(
  (
    {
      id,
      name,
      type = 'text',
      placeholder,
      label,
      icon: Icon,
      error,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          )}
          <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            ref={ref}
            className={`w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm ${
              Icon ? 'pl-10' : ''
            } ${error ? 'border-red-500 focus:ring-red-400' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
