import HeroCarousel from '@/components/Carousels/HeroCarousel'

import { useGetProductsQuery } from '@/redux/api/features/products/productApi'
import BestSellingProductsSection from '@/components/BestSellingProductsSection'
import CategorySection from '@/components/CategorySection'
import FeaturedProductSection from '@/components/FeaturedProductSection'
import TestomonialSection from '@/components/TestomonialSection/TestomonialSection'
import FaqSection from '@/components/FaqSection'

function Home() {
    const { data } = useGetProductsQuery(undefined)
    console.log(data)
    return (
        <div>

            <HeroCarousel />
            <BestSellingProductsSection />
            <CategorySection />
            <FeaturedProductSection />
            <TestomonialSection />
            <FaqSection />
        </div>
    )
}

export default Home