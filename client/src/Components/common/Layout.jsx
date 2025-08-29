import React from 'react'

const Layout = ({
    className = "",
    children
}) => {
  return (
    <div
      className={`w-full h-auto text-emerald-700 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 ${className}`}
    >
      {children}
    </div>
  );
}

export default Layout
