import React from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  console.log(error);
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-red-50 px-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Oops! Something went wrong.
      </h1>
      <p className="text-gray-700 mb-6">Try After Sometime. <br /> {error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-6 py-3 bg-emerald-500 text-white rounded-xl shadow-md hover:bg-emerald-600"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorFallback;
