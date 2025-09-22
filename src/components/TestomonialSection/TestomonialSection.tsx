
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
        title: "A really great experience",
        description: "All Perfect !! I have three sites with magento , this theme is the best !! Excellent support , advice theme installation package , sorry for English, are Italian but I had no problem !! Thank you !..",
        name: "Alva Ono"
    },
    {
        title: "Trustworthy and powerful",
        description: "Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding and experts on their fields! Thank you very much! ..",
        name: "Amber Laha"
    },
    {
        title: "Best designer around",
        description: "Code, template and others are very good. The support has served me immediately and solved my problems when I need help. Are to be congratulated. Att Renan Andrade",
        name: "Dewey Tetzlaff"
    },
    {
        title: "Trustworthy and powerful",
        description: "Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding and experts on their fields! Thank you very much! ..",
        name: "Lavina Wilderman"
    },
];

const TestimonialSection = () => {
    return (
        <div className='px-4 md:px-8'>
            <div>
                <h2 className='text-2xl md:text-3xl font-bold text-center py-5'>What our Clients say</h2>
            </div>
            <div className='py-2'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[FreeMode, Pagination, Navigation]}
                    className="tesSwiper"
                >
                    {
                        testimonialData.map((item, index) => (
                            <SwiperSlide key={index}>
                                <TestimonialCard item={item} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default TestimonialSection;
