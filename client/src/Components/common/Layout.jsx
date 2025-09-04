import React from 'react'

const Layout = ({
    className = "",
    children
}) => {
  return (
    <div
      className={`w-full h-screen text-emerald-700 overflow-x-hidden ${className}`}
    >
      {children}
    </div>
  );
}

export default Layout
