import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    {
      name: 'Menu',
      url: '/menu',
    },
    {
      name: 'About',
      url: '/about',
    },
    {
      name: 'Contact',
      url: '/contact',
    },
    {
      name: 'Order Now',
      url: '/orders',
    },
  ];

  const navigate = useNavigate();

  return (
    <footer className="w-full bg-orange-400 text-slate-50 pt-12 pb-6">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-3">
            Urban <span className="text-emerald-500">Eats</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Serving fresh, delicious, and premium meals right at your doorstep.
            Experience a modern dining journey with Urban Eats.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((links, index) => (
              <li
                key={index}
                onClick={() => navigate(links.url)}
                className="hover:text-emerald-400 hover:cursor-pointer hover:underline transition-all ease-in-out"
              >
                {links.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <p className="text-sm">123 Urban Street, Cityville</p>
          <p className="text-sm">Email: support@urbaneats.com</p>
          <p className="text-sm">Phone: +1 (234) 567-890</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-emerald-400">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-emerald-400">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-emerald-400">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-700 mt-10 pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} Urban Eats. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
