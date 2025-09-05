import React from 'react';
import { FadeInScale } from '../../Utility/Animation';

const Layout = ({ className = '', children }) => {
  return (
    
    <FadeInScale
      className={`w-full h-screen text-emerald-700 overflow-x-hidden ${className}`}
    >
      {children}
    </FadeInScale>
  );
};

export default Layout;
