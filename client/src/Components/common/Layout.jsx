import React from 'react'

const Layout = ({
    className = "",
    children
}) => {
  return (
    <div className={`w-full h-auto ${className}`}>
      {children}
    </div>
  )
}

export default Layout
