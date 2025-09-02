import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { Star, MessageCircle } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Amit Sharma',
    feedback:
      'The food was delicious and delivery was super fast! Definitely ordering again.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya Sen',
    feedback:
      'Loved the packaging and the taste was just like a restaurant dine-in experience.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4,
  },
  {
    id: 3,
    name: 'Rahul Mehta',
    feedback:
      'Great discounts and amazing offers. Value for money and super tasty.',
    image: 'https://randomuser.me/api/portraits/men/65.jpg',
    rating: 5,
  },
  {
    id: 4,
    name: 'Sneha Roy',
    feedback: 'Best burgers in town! The BOGO Friday offer is unbeatable.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
  },
];

const Testimonials3D = () => {
  return (
    <div className="py-16 px-4 bg-gradient-to-b from-white to-emerald-50 rounded-md shadow-lg">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 relative">
        <span className="flex justify-center items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600">
          <span className="text-emerald-600">
            <MessageCircle className="w-8 h-8" />
          </span>
          What Our Customers Say
        </span>

        {/* Gradient underline */}
        <div className="mt-3 w-28 h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 mx-auto rounded-full shadow-md"></div>
      </h2>

      <Swiper
        modules={[Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={window.innerWidth < 768 ? 1 : 3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 120,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="max-w-5xl mx-auto"
      >
        {testimonials.map((user) => (
          <SwiperSlide key={user.id}>
            <div className="bg-slate-300 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center gap-4 transform transition duration-500 hover:scale-105">
              {/* User Image */}
              <img
                src={user.image}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-emerald-200 shadow-md"
              />

              {/* Name */}
              <h3 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h3>

              {/* Feedback */}
              <p className="text-gray-600 italic max-w-md">{user.feedback}</p>

              {/* Rating */}
              <div className="flex justify-center gap-1">
                {Array.from({ length: user.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials3D;
