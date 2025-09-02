import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import {
  Percent,
  Gift,
  BadgePercent,
  Star,
  Truck,
  Clock,
  GraduationCap,
  Package,
  Sparkles,
  PartyPopper,
} from 'lucide-react';

const offers = [
  {
    id: 1,
    title: 'Flat 20% Off',
    description: 'On all pizza orders above ₹500',
    icon: <Percent className="w-8 h-8 text-emerald-600" />,
    bg: 'bg-emerald-100',
  },
  {
    id: 2,
    title: 'Free Dessert',
    description: 'Get a free dessert on orders above ₹800',
    icon: <Gift className="w-8 h-8 text-pink-600" />,
    bg: 'bg-pink-100',
  },
  {
    id: 3,
    title: '30% Cashback',
    description: 'Upto ₹150 on your first order',
    icon: <BadgePercent className="w-8 h-8 text-indigo-600" />,
    bg: 'bg-indigo-100',
  },
  {
    id: 4,
    title: 'Buy 1 Get 1 Free',
    description: 'On selected burgers every Friday',
    icon: <Gift className="w-8 h-8 text-orange-600" />,
    bg: 'bg-orange-100',
  },
  {
    id: 5,
    title: 'Weekend Special',
    description: 'Flat 25% off on all biryanis this weekend',
    icon: <Star className="w-8 h-8 text-yellow-500" />,
    bg: 'bg-yellow-100',
  },
  {
    id: 6,
    title: 'Free Delivery',
    description: 'On all orders above ₹299 throughout the week',
    icon: <Truck className="w-8 h-8 text-green-600" />,
    bg: 'bg-green-100',
  },
  {
    id: 7,
    title: 'Happy Hours',
    description: '50% off beverages from 4–6 PM daily',
    icon: <Clock className="w-8 h-8 text-purple-600" />,
    bg: 'bg-purple-100',
  },
  {
    id: 8,
    title: 'Student Discount',
    description: '15% off with valid student ID',
    icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
    bg: 'bg-blue-100',
  },
  {
    id: 9,
    title: 'Combo Deal',
    description: 'Burger + Fries + Drink at just ₹199',
    icon: <Package className="w-8 h-8 text-red-600" />,
    bg: 'bg-red-100',
  },
  {
    id: 10,
    title: 'Festive Bonanza',
    description: 'Flat ₹100 off on festive season meals',
    icon: <Sparkles className="w-8 h-8 text-pink-500" />,
    bg: 'bg-pink-50',
  },
];

const OffersCarousel = () => {
  return (
    <div className="py-12 px-4 bg-gradient-to-r from-emerald-50 to-white rounded-md shadow-lg">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
        <span className="flex items-center justify-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          <PartyPopper className="w-8 h-8 text-emerald-500 drop-shadow-md" />
          Special Offers For You
        </span>

        {/* Underline */}
        <div className="mt-3 w-28 h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 mx-auto rounded-full shadow-md"></div>
      </h2>

      <Swiper
        modules={[Autoplay]}
        centeredSlides={true}
        spaceBetween={25}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        loop={true}
        slidesPerView={1} 
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="w-full"
      >
        {offers.map((offer) => (
          <SwiperSlide
            key={offer.id}
            className="flex justify-center px-2 sm:px-0"
          >
            <div
              className={`${offer.bg} rounded-2xl shadow-md hover:shadow-lg transition p-6 sm:p-10 flex flex-col items-center justify-center text-center w-full max-w-xs sm:max-w-sm`}
            >
              {/* Icon */}
              <div className="mb-4 p-4 bg-white rounded-full shadow flex items-center justify-center">
                {offer.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                {offer.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                {offer.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OffersCarousel;
