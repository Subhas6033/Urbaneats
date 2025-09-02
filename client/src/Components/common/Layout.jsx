import React from 'react'

const Layout = ({
    className = "",
    children
}) => {
  return (
    <div
      className={`w-full h-auto text-emerald-700 bg-background ${className}`}
    >
      {children}
    </div>
  );
}

export default Layout
