import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navItems } from '../../Data/index';
import { useSelector } from 'react-redux';
import { Popup, Button } from '../index';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const [showPopup, setShowPopup] = useState(false); // User popup
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="w-full text-lg bg-slate-50 shadow-md sticky top-0 z-50 overflow-x-hidden">
      <div className="px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <header>
          <Link to="/" className="group">
            <span className="text-2xl font-playfair font-extrabold tracking-widest transition-colors group-hover:text-emerald-400">
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

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-5 px-2">
          {user?.userName ? (
            <Button
              onClick={() => setShowPopup(true)}
              variant="green"
              size="md"
              round="md"
              className="bg-slate-800 hover:bg-slate-700 text-white"
            >
              {user.userName?.split(' ')[0] || 'Profile'}
            </Button>
          ) : (
            <Link to="/user/signup">
              <Button
                variant="green"
                size="md"
                round="md"
                className="bg-slate-800 hover:bg-slate-700 text-white shadow-md"
              >
                Signup
              </Button>
            </Link>
          )}

          <Link to="/orders">
            <Button
              variant="primary"
              size="md"
              round="md"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg"
            >
              Your Orders
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="secondary"
          size="sm"
          round="full"
          className="lg:hidden text-black bg-transparent hover:bg-gray-100 p-2 border"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden fixed top-14 left-0 w-full z-50 bg-black px-6 py-4 border-t border-gray-800">
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

          <div className="mt-6">
            <Link to="/orders" onClick={() => setIsOpen(false)}>
              <Button
                variant="primary"
                size="md"
                round="lg"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-md"
              >
                Your Orders
              </Button>
            </Link>
          </div>

          <div className="mt-6 flex justify-center">
            {user ? (
              <Button
                onClick={() => {
                  setShowPopup(true);
                  setIsOpen(false);
                }}
                variant="secondary"
                size="md"
                round="full"
                className="bg-slate-800 hover:bg-slate-700 text-white"
              >
                {user.userName || 'Profile'}
              </Button>
            ) : (
              <Link to="/user/signup" onClick={() => setIsOpen(false)}>
                <Button
                  variant="primary"
                  size="md"
                  round="full"
                  className="bg-slate-800 hover:bg-slate-700 text-white shadow-md"
                >
                  Signup
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* User Popup */}
      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title="User Profile"
      >
        <div className="space-y-4">
          <p className="text-gray-700">Welcome, {user?.userName || 'Guest'}!</p>

          <Link
            to={`/user/profile/${user?.userName}`}
            onClick={() => setShowPopup(false)}
          >
            <Button
              variant="primary"
              size="md"
              round="lg"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
            >
              View Profile
            </Button>
          </Link>
          <div>{''}</div>
          <Link to="/orders" onClick={() => setShowPopup(false)}>
            <Button
              variant="outline"
              size="md"
              round="lg"
              className="w-full border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold"
            >
              Your Orders
            </Button>
          </Link>
        </div>
      </Popup>
    </nav>
  );
};

export default Navbar;
