import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialCarousel = ({ images = [] }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="w-full flex justify-center">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={2}
        slidesPerView={1}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        pagination={{
          clickable: true, 
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          // ✅ attach custom navigation refs
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="w-[95%] h-96 relative"
      >
        {images.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full p-3 rounded-md">
              <img
                src={url}
                alt={`slide-${index}`}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </SwiperSlide>
        ))}

        {/* ✅ Custom Navigation Only */}
        <button
          ref={prevRef}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black transition z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          ref={nextRef}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black transition z-10"
        >
          <ChevronRight size={24} />
        </button>
      </Swiper>
    </section>
  );
};

export default TestimonialCarousel;
