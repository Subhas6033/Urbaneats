import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeInUp, FadeInDown, ScaleUp } from '../Utility/Animation';
import { Helmet } from 'react-helmet-async';

const LocationPage = () => {
  return (
    <>
      <Helmet>
        <title>Urban Eats | Gifts </title>
        <meta
          name="description"
          content="Find Urban Eats locations near you. Get directions, store hours, and contact information to enjoy our meals wherever you are."
        />
      </Helmet>
      <div className="px-6 md:px-12 lg:px-24 py-16 bg-gradient-to-br from-emerald-50 via-white to-indigo-50 min-h-screen mt-10">
        <FadeInUp className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <FadeInDown className="p-8 border-b bg-gradient-to-r from-emerald-600 to-indigo-600">
            <h1 className="text-3xl font-extrabold text-white mb-2">
              Our Location
            </h1>
            <p className="text-emerald-100">
              Visit us at our restaurant or reach out for catering and
              deliveries.
            </p>
          </FadeInDown>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-6 p-8">
            {/* Address & Contact Info */}
            <FadeInUp className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-emerald-600" />
                <div>
                  <h2 className="font-semibold text-slate-800">Address</h2>
                  <p className="text-slate-600">
                    Urban Eats, Park Street
                    <br />
                    Kolkata – 700016
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-6 h-6 text-indigo-600" />
                <div>
                  <h2 className="font-semibold text-slate-800">Phone</h2>
                  <p className="text-slate-600">
                    <Link
                      to="tel:+919832395096"
                      className="hover:text-emerald-600 transition"
                    >
                      +91 9832395096
                    </Link>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-6 h-6 text-emerald-600" />
                <div>
                  <h2 className="font-semibold text-slate-800">Email</h2>
                  <p className="text-slate-600">
                    <a
                      href="mailto:sm2733@it.jgec.ac.in"
                      className="hover:text-emerald-600 transition"
                    >
                      support@urbaneats.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-indigo-600" />
                <div>
                  <h2 className="font-semibold text-slate-800">
                    Opening Hours
                  </h2>
                  <p className="text-slate-600">Mon – Fri: 10 AM – 11 PM</p>
                  <p className="text-slate-600">
                    Sat – Sun: 9 AM – 12 Midnight
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <ScaleUp className="flex gap-4 pt-4">
                <Link
                  to="tel:+919832395096"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-lg font-medium shadow hover:bg-emerald-700 hover:shadow-md transition"
                >
                  Call Us
                </Link>
                <Link
                  to="/book-catering"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 hover:shadow-md transition"
                >
                  Book Catering
                </Link>
              </ScaleUp>
            </FadeInUp>

            {/* Map Embed */}
            <FadeInUp className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
              <iframe
                title="Urban Eats Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.180726375816!2d88.36389581504717!3d22.56972248517986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277111c7a6e85%3A0xabc!2sPark%20Street%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1670000000000"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="w-full h-80"
              ></iframe>
            </FadeInUp>
          </div>
        </FadeInUp>
      </div>
    </>
  );
};

export default LocationPage;
