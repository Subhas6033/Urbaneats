import React from 'react';
import {
  Button,
  Testimonials,
  TypewriterEffect,
  MenuCard,
  OffersCarousel,
  Feedback,
} from '../Components/index';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Zap } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const sliderImages = [
    './Heroimg/food6.jpg',
    './Heroimg/food5.webp',
    './Heroimg/food7.jpg',
    './Heroimg/food8.jpg',
  ];

  const popularDishes = [
    {
      image: './popular dish/Crispy Spring Rolls.jpg',
      name: 'Crispy Spring Rolls',
      price: 180,
    },
    {
      image: './popular dish/BBQ Chicken Pizza.avif',
      name: 'BBQ Chicken Pizza',
      price: 350,
    },
    {
      image: './popular dish/Paneer Butter Masala.webp',
      name: 'Paneer Butter Masala',
      price: 260,
    },
    {
      image: './popular dish/Tandoori Momos.jpg',
      name: 'Tandoori Momos',
      price: 200,
    },
    {
      image: './popular dish/Gulab Jamun.webp',
      name: 'Gulab Jamun',
      price: 90,
    },
    {
      image: './popular dish/Mango Lassi.png',
      name: 'Mango Lassi',
      price: 120,
    },
  ];

  const features = [
    {
      title: 'Fresh Ingredients',
      desc: 'Every dish is prepared with farm-fresh and locally sourced ingredients.',
    },
    {
      title: 'Fast Delivery',
      desc: 'Hot meals delivered right to your doorstep, always on time.',
    },
    {
      title: 'Great Taste',
      desc: 'Enjoy a fusion of flavors designed to satisfy every craving.',
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-slate-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full pt-6 pb-2 px-3">
        <Testimonials images={sliderImages} />
      </section>

      {/* Intro */}
      <section className="px-6 md:px-12 lg:px-24 py-24 text-center bg-gradient-to-b from-white to-gray-50">
        {/* Hero Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Welcome to{' '}
          <span className="block mt-4 text-emerald-500">
            <TypewriterEffect
              text={[
                'Urban Eats. Where Flavor Meets Happiness.',
                'Urban Eats. Good Food, Good Mood.',
                'Urban Eats. Fresh Flavors, Happy Moments.',
                'Urban Eats. Taste The Joy In Every Bite.',
              ]}
              className="font-semibold font-montserrat text-3xl md:text-4xl text-amber-400"
            />
          </span>
        </h1>

        {/* Subheading / Description */}
        <p className="mt-8 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Discover delicious meals crafted with love and served with passion.
          Experience a modern twist on traditional flavors, made for food lovers
          like you.
        </p>

        {/* Optional Call-to-Action Buttons */}
        <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">
          <Button
            onClick={() => navigate('/orders')}
            variant="primary"
            size="lg"
          >
            Order Now
          </Button>
          <Button onClick={() => navigate('/menu')} variant="outline" size="lg">
            Explore Menu
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 lg:px-24 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold flex items-center justify-center gap-3">
            <span className="p-3 rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500 text-white shadow-lg">
              <Zap />
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Our Features
            </span>
          </h2>

          {/* Underline */}
          <div className="mt-3 w-28 h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 mx-auto rounded-full shadow-md"></div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-12 md:grid-cols-3 text-center">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-white border border-emerald-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform"
            >
              <h3 className="text-xl font-semibold text-emerald-600 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="px-6 md:px-12 lg:px-24 py-20 text-center">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold flex items-center justify-center gap-3">
              <span className="p-3 rounded-full bg-gradient-to-r from-emerald-500 to-indigo-500 text-white shadow-lg">
                <UtensilsCrossed className="w-6 h-6 md:w-8 md:h-8" />
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                Our Popular Dishes
              </span>
            </h2>

            {/* Underline */}
            <div className="mt-3 w-28 h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 mx-auto rounded-full shadow-md"></div>
          </div>
          {/* Menu Items  */}
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {popularDishes.map((dish, i) => (
              <MenuCard
                key={i}
                image={dish.image}
                name={dish.name}
                price={dish.price}
              />
            ))}
          </div>
          <Button
            className="mt-12 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg transition-transform hover:scale-105"
            onClick={() => navigate('/menu')}
          >
            View Full Menu
          </Button>
      </section>

      {/* Offers Section */}
      <section className="px-4 md:px-12 lg:px-24 py-20">
        <OffersCarousel />
      </section>

      {/* Users Feedback Sections */}
      <section className="px-4 md:px-12 lg:px-24 py-20">
        <Feedback />
      </section>
    </section>
  );
};

export default Home;
