import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger & close icons

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    {
      name: "Menu",
      navUrl : "/menu"
    },
    {
      name: "Catering",
      navUrl : "/catering"
    },{
      name: "Location",
      navUrl : "/location"
    },{
      name: "Rewards",
      navUrl : "/rewards"
    },{
      name: "Gifts",
      navUrl : "/gifts"
    },{
      name: "News",
      navUrl : "/news"
    }
  ]

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md sticky top-0 z-50">
      {/* Main Container */}
      <div className="px-6 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        <header>
          <Link to="/" className="group">
            <span className="text-2xl font-playfair font-extrabold tracking-widest transition-colors group-hover:text-emerald-400">
              URBAN{' '}
              <span className="text-emerald-400 hover:text-white">EATS</span>
            </span>
          </Link>
        </header>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((nav, index) => (
            <li
              key={index}
              onClick={() => navigate(nav.navUrl)}
              className="cursor-pointer text-gray-300 font-medium hover:text-emerald-400 transition-colors"
            >
              {nav.name}
            </li>
          ))}
        </ul>

        {/* Order Button */}
        <div className="hidden md:block">
          <Link
            to="/order"
            className="px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-md transition-all"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden fixed top-14 left-0 w-full z-50 bg-black px-6 py-4 border-t border-gray-800">
          <ul className="flex flex-col gap-4">
            {navItems.map((nav, index) => (
              <li
                key={index}
                onClick={() => {
                  navigate(nav.navUrl);
                  setIsOpen(false);
                }}
                className="cursor-pointer text-gray-300 font-medium hover:text-emerald-400 transition-colors"
              >
                {nav.name}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Link
              to="/order"
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
