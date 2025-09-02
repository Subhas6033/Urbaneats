import React from 'react';
import Typewriter from 'typewriter-effect';

const TypewriterEffect = ({ text = [], className = '' }) => {
  return (
    <span className={`${className}`}>
      <Typewriter
        options={{
          strings: text,
          autoStart: true,
          loop: true,
        }}
      />
    </span>
  );
};

export default TypewriterEffect;
