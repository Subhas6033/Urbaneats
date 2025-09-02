import React from 'react';
import { Users, Utensils, Clipboard, CheckCircle } from 'lucide-react';

const cateringServices = [
  {
    icon: Users, // store component reference, not JSX
    title: 'Corporate Events',
    description:
      'Business lunches, meetings, and office parties with hassle-free catering.',
  },
  {
    icon: Utensils,
    title: 'Weddings & Parties',
    description:
      'Full-course meals, appetizers, and desserts for your special events.',
  },
  {
    icon: Clipboard,
    title: 'Private Catering',
    description:
      'Birthday parties, family gatherings, and other private events.',
  },
  {
    icon: CheckCircle,
    title: 'Custom Menus',
    description:
      'Tailor your menu based on event size, preferences, and cuisine type.',
  },
];

const sampleMenu = [
  {
    name: 'Crispy Spring Rolls',
    image: './popular dish/Crispy Spring Rolls.jpg',
  },
  { name: 'BBQ Chicken Pizza', image: './popular dish/BBQ Chicken Pizza.avif' },
  {
    name: 'Paneer Butter Masala',
    image: './popular dish/Paneer Butter Masala.webp',
  },
  { name: 'Gulab Jamun', image: './popular dish/Gulab Jamun.webp' },
];

const steps = [
  'Choose Your Menu',
  'Select Your Package',
  'Confirm & Schedule',
  'Enjoy!',
];

const CateringPage = () => {
  return (
    <div className="px-6 md:px-12 lg:px-24 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Catering Services
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Bring the taste of Urban Eats to your events. Corporate, weddings,
          parties — we cater it all!
        </p>
        <button className="mt-6 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition">
          Book Catering
        </button>
      </section>

      {/* Services */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cateringServices.map((service, idx) => {
            const Icon = service.icon; // get component
            return (
              <div
                key={idx}
                className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-2xl transition flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-xl mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sample Menu */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Sample Menu
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {sampleMenu.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition w-40"
            >
              <div className="text-emerald-500 text-3xl font-bold mb-2">
                {idx + 1}
              </div>
              <p className="font-semibold">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials / CTA */}
      <section className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Why Choose Us?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Trusted by hundreds of happy clients for corporate events, weddings,
          and private parties. Experience hassle-free catering with delicious
          food.
        </p>
        <button className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition">
          Request a Quote
        </button>
      </section>
    </div>
  );
};

export default CateringPage;
