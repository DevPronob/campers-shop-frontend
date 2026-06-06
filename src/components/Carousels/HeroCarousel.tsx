import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import bgHero1 from "../../assets/images/heroBg1.jpg";
import bgHero2 from "../../assets/images/heroBg2.jpg";
import bgHero3 from "../../assets/images/heroBg3.jpg";

import { Link } from "react-router-dom";

const slides = [
  {
    gradient: "from-[#003B4D] via-[#004E64] to-[#0B7285]",
    title: "Explore Premium",
    subtitle: "Lightweight Backpacks",
    text: "Ultra-durable, water-resistant gear built for real outdoor adventures.",
    img: bgHero3,
    btn: "bg-white text-[#FF6B35]",
  },
  {
    gradient: "from-[#003B4D] via-[#004E64] to-[#0B7285]",
    title: "Modern &",
    subtitle: "Ultra-Comfort Camping Furniture",
    text: "Designed for relaxation with durability that lasts every trip.",
    img: bgHero2,
    btn: "bg-white text-[#004E64]",
  },
  {
    gradient: "from-[#003B4D] via-[#004E64] to-[#0B7285]",
    title: "High-Gear Foldable",
    subtitle: "Outdoor Chair",
    text: "Portable comfort engineered for effortless outdoor moments.",
    img: bgHero1,
    btn: "bg-[#004E64] text-white",
  },
];

export default function HeroCarousel() {
  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        modules={[Navigation, Pagination, Autoplay]}
        className="h-[92vh] sm:h-[88vh]"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="relative h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.img})`,
              }}
            >
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-70`}
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Content */}
              <div className="relative mx-auto max-w-7xl h-full px-5 sm:px-8 grid grid-cols-1 items-center">
                <div className="text-center text-white space-y-6">
                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                    {slide.title}
                    <span className="block">{slide.subtitle}</span>
                  </h1>

                  <p className="text-sm sm:text-base md:text-lg opacity-90 max-w-2xl mx-auto py-3">
                    {slide.text}
                  </p>

                  <Link to="/products">
                    <button
                      className={`${slide.btn} px-8 py-4 rounded-2xl font-semibold shadow-2xl hover:scale-105 transition duration-300`}
                    >
                      Shop Collection
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}