/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { cateringServices, sampleMenu, steps } from '../../Data/index';

const CateringPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Urban Eats | Catering </title>
        <meta
          name="description"
          content="Urban Eats offers premium catering services for events of all sizes. From office lunches to weddings, enjoy fresh, delicious meals delivered with care."
        />
      </Helmet>
      <div className="px-6 md:px-12 lg:px-24 py-16 bg-gray-50">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Catering Services
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Bring the taste of <span className="font-semibold">Urban Eats</span>{' '}
            to your events. Corporate, weddings, parties — we cater it all!
          </p>
          <button
            onClick={() => navigate('/book-catering')}
            aria-label="Book Catering"
            className="mt-8 px-8 py-3 bg-emerald-600 text-white font-semibold rounded-full shadow hover:bg-emerald-700 transition"
          >
            Book Catering
          </button>
        </motion.section>

        {/* Services */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {cateringServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-2xl transition flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Sample Menu */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Sample Menu
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {sampleMenu.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex flex-col items-center text-center bg-white rounded-xl p-6 shadow hover:shadow-lg transition w-48"
              >
                <div className="text-emerald-600 text-3xl font-bold mb-2">
                  {idx + 1}
                </div>
                <p className="font-semibold text-gray-800">{step}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-emerald-50 py-12 px-6 rounded-2xl shadow-inner"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
            Trusted by hundreds of happy clients for corporate events, weddings,
            and private parties. Experience hassle-free catering with delicious
            food and exceptional service.
          </p>
          <button
            aria-label="Request a Catering Quote"
            className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-full shadow hover:bg-emerald-700 transition"
          >
            Request a Quote
          </button>
        </motion.section>
      </div>
    </>
  );
};

export default CateringPage;
