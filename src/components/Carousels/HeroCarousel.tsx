import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import camp1 from '../../assets/images/camp1.png';
import camp2 from '../../assets/images/camp2.png';
import camp3 from '../../assets/images/camp3.png';

function HeroCarousel() {
  return (
    <div className="relative">
      <Swiper
        cssMode={true}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper"
      >

        {/* ---------- Slide 1 ---------- */}
        <SwiperSlide>
          <section className="relative w-full min-h-[90vh] bg-[#FF6B35] flex items-center justify-between px-12 overflow-hidden">
            <div className="max-w-lg text-white z-10">
              <p className="text-sm uppercase mb-2">Adventure Collection</p>
              <h1 className="text-5xl font-bold leading-tight mb-4">
                Explore Our Lightweight <br /> Travel Backpacks
              </h1>
              <p className="text-sm mb-6">
                Designed for explorers. Compact, durable, and ready for any trail you take.
              </p>
              <button className="bg-white text-[#FF6B35] px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                Shop Now
              </button>
            </div>

            <div className="relative z-10">
              <img src={camp3} alt="Backpack" className="w-[400px] drop-shadow-2xl" />
            </div>

            {/* Decorative Circle */}
            <div className="absolute right-10 bottom-20 w-[500px] h-[500px] rounded-full border-[60px] border-[#FF8252] opacity-30"></div>
          </section>
        </SwiperSlide>

        {/* ---------- Slide 2 ---------- */}
        <SwiperSlide>
          <section className="relative w-full min-h-[90vh] bg-[#004E64] flex items-center justify-between px-12 overflow-hidden">
            <div className="max-w-lg text-white z-10">
              <p className="text-sm uppercase mb-2">45% Mega Sale Offer</p>
              <h1 className="text-5xl font-bold leading-tight mb-4">
                Discover Modern <br /> Camping Furniture
              </h1>
              <p className="text-sm mb-6">
                Premium comfort meets adventure. Upgrade your campsite with modern style.
              </p>
              <button className="bg-white text-[#004E64] px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                Discover Now
              </button>
            </div>

            <div className="relative z-10">
              <img src={camp1} alt="Furniture" className="w-[450px] drop-shadow-2xl" />
            </div>

            <div className="absolute right-10 bottom-20 w-[500px] h-[500px] rounded-full border-[60px] border-[#4FB0C6] opacity-30"></div>
          </section>
        </SwiperSlide>

        {/* ---------- Slide 3 ---------- */}
        <SwiperSlide>
          <section className="relative w-full min-h-[90vh] bg-[#9FE870] flex items-center justify-between px-12 overflow-hidden">
            <div className="max-w-lg text-[#1B1B1B] z-10">
              <p className="text-sm uppercase mb-2">Comfort Redefined</p>
              <h1 className="text-5xl font-bold leading-tight mb-4">
                High Gear Outdoor <br /> Foldable Chair
              </h1>
              <p className="text-sm mb-6">
                Lightweight, durable, and easy to pack — the perfect chair for outdoor relaxation.
              </p>
              <button className="bg-[#004E64] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#003847] transition">
                Shop Now
              </button>
            </div>

            <div className="relative z-10">
              <img src={camp2} alt="Chair" className="w-[400px] drop-shadow-2xl" />
            </div>

            <div className="absolute right-10 bottom-20 w-[500px] h-[500px] rounded-full border-[60px] border-[#B9F8A1] opacity-30"></div>
          </section>
        </SwiperSlide>

      </Swiper>
    </div>
  );
}

export default HeroCarousel;
