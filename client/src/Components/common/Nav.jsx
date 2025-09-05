import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, User, X } from 'lucide-react';
import { navItems } from '../../Data/index';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full text-lg bg-slate-50 shadow-md sticky top-0 z-50 overfxh">
      {/* Main Container */}
      <div className="px-6 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        <header>
          <Link to="/" className="group">
            <span className="text-2xl font-playfair text-wrap font-extrabold tracking-widest transition-colors group-hover:text-emerald-400">
              URBAN <span className="text-emerald-400">EATS</span>
            </span>
          </Link>
        </header>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navItems.map((nav, index) => (
            <li key={index}>
              <NavLink
                to={nav.navUrl}
                className={({ isActive }) =>
                  `cursor-pointer font-medium transition-colors ${
                    isActive
                      ? 'text-orange-600'
                      : 'text-emerald-700 hover:text-gray-900'
                  }`
                }
              >
                {nav.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Order Button and User Sections */}
        <div className="hidden lg:flex items-center gap-5 px-6">
          {/* User Icon */}
          <div>
            <Link
              to="/user/signup"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors shadow-md"
            >
              <User size={20} />
            </Link>
          </div>
          {/* Order Now Button */}
          <div>
            <Link
              to="/orders"
              className="py-2 px-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg transition-all"
            >
              Your Orders
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-black focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden fixed top-14 left-0 w-full z-50 bg-black px-6 py-4 border-t border-gray-800">
          {/* Nav Items */}
          <ul className="flex flex-col gap-4">
            {navItems.map((nav, index) => (
              <li key={index} onClick={() => setIsOpen(false)}>
                <NavLink
                  to={nav.navUrl}
                  className={({ isActive }) =>
                    `cursor-pointer font-medium transition-colors ${
                      isActive
                        ? 'text-orange-500'
                        : 'text-emerald-400 hover:text-gray-200'
                    }`
                  }
                >
                  {nav.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Order Now Button */}
          <div className="mt-6">
            <Link
              to="/orders"
              onClick={() => setIsOpen(false)}
              className="block text-center px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-md transition-all"
            >
              Your Orders
            </Link>
          </div>

          {/* User Icon */}
          <div className="mt-6 flex justify-center">
            <Link
              to="/user/signup"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors shadow-md"
            >
              <User size={20} />
              <span className="font-medium">Profile</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
