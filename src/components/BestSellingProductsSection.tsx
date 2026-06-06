import { useGetProductsWithoutFilterQuery } from '@/redux/api/features/products/productApi';
import ProductCard from './ui/ProductCard';
import { TProduct } from '@/types/productTypes';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useEffect } from 'react';

function BestSellingProductsSection() {
  const { data, error, isLoading } = useGetProductsWithoutFilterQuery(undefined);

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch products");
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 bg-[#F8F9FA]">
        <svg
          aria-hidden="true"
          className="w-12 h-12 text-gray-300 animate-spin fill-[#FF6B35]"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 50.5908C100 78.2051 ..." fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 ..." fill="currentFill" />
        </svg>
      </div>
    );
  }

  if (!isLoading && data?.data?.length === 0) {
    return (
      <div className="text-center py-16 text-gray-600">
        No products found.
      </div>
    );
  }

  return (
    <section className="relative px-4 sm:px-6 md:px-12 lg:px-20 py-16 md:py-20 overflow-hidden bg-[#F8F9FA]">
      <div className="absolute top-0 left-0 w-[150px] sm:w-[200px] md:w-[250px] h-[150px] sm:h-[200px] md:h-[250px] bg-[#FF6B35]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[180px] sm:w-[250px] md:w-[300px] h-[180px] sm:h-[250px] md:h-[300px] bg-[#004E64]/10 rounded-full blur-3xl"></div>

      <div className="relative text-center mb-12 md:mb-16 px-2 sm:px-0">
        <p className="text-[#FF6B35] uppercase tracking-wider font-semibold mb-2 text-sm sm:text-base">
          Top Picks For You
        </p>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1B1B1B]">
          Best Selling Products
        </h3>
        <p className="mt-2 sm:mt-3 text-gray-500 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Discover what our adventurers love most — rugged gear, portable comfort,
          and stylish essentials built for every journey.
        </p>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 place-items-center z-10">
        {data?.data?.filter((product: TProduct) => product.isBestSelling).slice(0, 8).map((product: TProduct) => (
          <div
            key={product._id}
            className="w-full transform transition-all hover:scale-105 hover:-translate-y-1 duration-300"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="mt-12 sm:mt-16 flex justify-center">
        <Link to="/products">
          <button
            type="button"
            className="relative py-3 px-8 sm:px-10 w-52 sm:w-56 md:w-64 bg-[#004E64] text-white font-semibold rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 hover:scale-105 hover:bg-[#003C4C] focus:outline-none focus:ring-2 focus:ring-[#004E64] focus:ring-offset-2"
          >
            Explore More Products
            <span className="absolute -right-3 -top-3 w-4 h-4 sm:w-5 sm:h-5 bg-[#FF6B35] rounded-full animate-pulse"></span>
          </button>
        </Link>
      </div>
    </section>
  );
}

export default BestSellingProductsSection;
