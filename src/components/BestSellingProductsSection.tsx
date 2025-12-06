import { useGetProductsWithoutFilterQuery } from '@/redux/api/features/products/productApi';
import ProductCard from './ui/ProductCard';
import { TProduct } from '@/types/productTypes';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

function BestSellingProductsSection() {
  const { data, error, isLoading } = useGetProductsWithoutFilterQuery(undefined);

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
          <path
            d="M100 50.5908C100 78.2051 ..."
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 ..."
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  if (error) {
    toast.error('Failed to fetch products');
  }

  return (
   
      <section className="relative px-6 md:px-12 lg:px-20 py-20  overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-[#FF6B35]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#004E64]/10 rounded-full blur-3xl"></div>

        {/* Heading */}
        <div className="relative text-center mb-14">
          <p className="text-[#FF6B35] uppercase tracking-wider font-semibold mb-2">
            Top Picks For You
          </p>
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#1B1B1B]">
            Best Selling Products
          </h3>
          <p className="mt-3 text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Discover what our adventurers love most — rugged gear, portable comfort,
            and stylish essentials built for every journey.
          </p>
        </div>

        {/* Product Grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 place-items-center z-10">
          {data?.data.slice(0, 8).map((product: TProduct) => (
            <div
              key={product._id}
              className="w-full transform transition-all hover:scale-105 hover:-translate-y-1 duration-300"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-16 flex justify-center">
          <Link to="/products">
            <button
              type="button"
              className="relative py-3 px-10 w-56 md:w-64 bg-[#004E64] text-white font-semibold rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 hover:scale-105 hover:bg-[#003C4C] focus:outline-none focus:ring-2 focus:ring-[#004E64] focus:ring-offset-2"
            >
              Explore More Products
              <span className="absolute -right-3 -top-3 w-5 h-5 bg-[#FF6B35] rounded-full animate-pulse"></span>
            </button>
          </Link>
        </div>
      </section>
  );
}

export default BestSellingProductsSection;
