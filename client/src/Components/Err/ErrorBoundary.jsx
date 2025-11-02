import React from 'react';
import {Button} from '../index';
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  console.log(error);
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-red-50 px-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Oops! Something went wrong.
      </h1>
      <p className="text-gray-700 mb-6">
        Try After Sometime.
        <br />
        {error.message}
      </p>

      {/* Using your custom Button component */}
      <Button
        onClick={resetErrorBoundary}
        variant="green"
        size="lg"
        className="rounded-xl shadow-md"
      >
        Try Again
      </Button>
    </div>
  );
};

export default ErrorFallback;
