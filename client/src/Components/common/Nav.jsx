import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    {
      name: 'Menu',
      navUrl: '/menu',
    },
    {
      name: 'Catering',
      navUrl: '/catering',
    },
    {
      name: 'Location',
      navUrl: '/location',
    },
    {
      name: 'Rewards',
      navUrl: '/rewards',
    },
    {
      name: 'Gifts',
      navUrl: '/gifts',
    },
    {
      name: 'News',
      navUrl: '/news',
    },
  ];

  return (
    <nav className="w-full text-lg bg-slate-50 shadow-md sticky top-0 z-50">
      {/* Main Container */}
      <div className="px-6 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        <header>
          <Link to="/" className="group">
            <span className="text-2xl font-playfair font-extrabold tracking-widest transition-colors group-hover:text-emerald-400">
              URBAN <span className="text-emerald-400">EATS</span>
            </span>
          </Link>
        </header>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
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

        {/* Order Button */}
        <div className="hidden md:block">
          <Link
            to="/orders"
            className="px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-md transition-all"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-black focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden fixed top-14 left-0 w-full z-50 bg-black px-6 py-4 border-t border-gray-800">
          <ul className="flex flex-col gap-4">
            {navItems.map((nav, index) => (
              <li key={index} onClick={() => setIsOpen(false)}>
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
          <div className="mt-4">
            <Link
              to="/orders"
              onClick={() => setIsOpen(false)}
              className="block text-center px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-md transition-all"
            >
              Order Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
