
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import camp1 from '../../assets/images/camp1.png';
import highGearChair from '../../assets/images/camp2.png';
import camp3 from '../../assets/images/camp3.png';

function HeroCarousel() {
  return (
    <div className="my-4">
      <Swiper
        cssMode={true}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="h-fit py-4 bg-center bg-cover bg-bg-hero flex flex-col md:flex-row items-center justify-center text-white">
            <div className="max-w-4xl pt-[52px] pb-20 mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-left">
                <p className="text-2xl md:text-3xl">Adventures Unlocking Here</p>
                <h2 className="text-4xl md:text-5xl font-bold leading-[50px] md:leading-tight">
                  Lightweight Foldable Backpack Foldable Ultralight Outdoor Travel Backpack
                </h2>
                <button
                  type="button"
                  className="py-2.5 px-5 mt-3 text-sm font-medium text-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                >
                  Shop Now
                </button>
              </div>
              <div className="mt-6 md:mt-0 md:ml-6">
                <img
                  className="rounded-lg w-[300px] md:max-w-md md:max-h-96 object-contain"
                  src={camp3}
                  alt="Backpack"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="h-fit py-4 bg-center bg-cover bg-bg-hero flex flex-col md:flex-row items-center justify-center text-white">
            <div className="max-w-4xl pt-[52px] pb-20 mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-left">
                <p className="text-2xl md:text-3xl">Adventures Unlocking Here</p>
                <h2 className="text-4xl md:text-5xl font-bold leading-[50px] md:leading-tight">
                  Naturehike P-Series Upgrade UPF 50+ Tent Waterproof Tents
                </h2>
                <button
                  type="button"
                  className="py-2.5 px-5 mt-3 text-sm font-medium text-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                >
                  Shop Now
                </button>
              </div>
              <div className="mt-6 md:mt-0 md:ml-6">
                <img
                  className="rounded-lg w-[300px] md:max-w-md md:max-h-96 object-contain"
                  src={camp1}
                  alt="Tent"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 - High Gear Chair */}
        <SwiperSlide>
          <div className="h-fit py-4 bg-center bg-cover bg-bg-hero flex flex-col md:flex-row items-center justify-center text-white">
            <div className="max-w-4xl pt-[52px] pb-20 mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-left">
                <p className="text-2xl md:text-3xl">Relax in Comfort</p>
                <h2 className="text-4xl md:text-5xl font-bold leading-[50px] md:leading-tight">
                  High Gear Outdoor Chair – Lightweight, Foldable & Durable
                </h2>
                <button
                  type="button"
                  className="py-2.5 px-5 mt-3 text-sm font-medium text-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                >
                  Shop Now
                </button>
              </div>
              <div className="mt-6 md:mt-0 md:ml-6">
                <img
                  className="rounded-lg w-[300px] md:max-w-md md:max-h-96 object-contain"
                  src={highGearChair}
                  alt="High Gear Chair"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default HeroCarousel;
