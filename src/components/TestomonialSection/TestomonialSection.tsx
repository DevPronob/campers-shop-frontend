import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css';

import { FreeMode, Pagination, Navigation } from 'swiper/modules';

import TestimonialCard from '../ui/TestomonialCard';

type Testimonial = {
  title: string;
  description: string;
  name: string;
};

const testimonialData: Testimonial[] = [
  {
    title: 'A really great experience',
    description:
      'All Perfect !! I have three sites with magento , this theme is the best !! Excellent support , advice theme installation package , sorry for English, are Italian but I had no problem !! Thank you !..',
    name: 'Alva Ono',
  },
  {
    title: 'Trustworthy and powerful',
    description:
      'Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding and experts on their fields! Thank you very much! ..',
    name: 'Amber Laha',
  },
  {
    title: 'Best designer around',
    description:
      'Code, template and others are very good. The support has served me immediately and solved my problems when I need help. Are to be congratulated. Att Renan Andrade',
    name: 'Dewey Tetzlaff',
  },
  {
    title: 'Trustworthy and powerful',
    description:
      'Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding and experts on their fields! Thank you very much! ..',
    name: 'Lavina Wilderman',
  },
];

const TestimonialSection = () => {
  return (
    <section className="px-4 md:px-10 py-12 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
          What Our Clients Say
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Hear from our amazing customers who have experienced our services and
          trusted us with their journeys.
        </p>
      </div>

      <div className="mt-10">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
          freeMode={true}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[FreeMode, Pagination, Navigation]}
          className="testimonial-swiper pb-12"
        >
          {testimonialData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="transition-transform transform hover:-translate-y-2 hover:shadow-xl">
                <TestimonialCard item={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
