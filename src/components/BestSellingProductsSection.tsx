import { useGetProductsWithoutFilterQuery } from '@/redux/api/features/products/productApi';
import ProductCard from './ui/ProductCard';
import { TProduct } from '@/types/productTypes';
import { Link } from 'react-router-dom';
import {toast} from 'sonner';

function BestSellingProductsSection() {
  const { data, error, isLoading } = useGetProductsWithoutFilterQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 50.5908C100 78.2051 ..." fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 ..." fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    toast.error('Failed to fetch products')
  }

  return (
    <section className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <h3 className="text-2xl md:text-3xl font-bold text-center py-6">
        Best Selling Products
      </h3>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        {data?.data.slice(0, 4).map((product: TProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Button */}
      <div className="mt-8 flex justify-center">
        <Link to="/products">
          <button
            type="button"
            className="py-2 px-6 w-48 bg-[#21b3f1] border border-[#21b3f1] text-white transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#21b3f1] focus:ring-offset-2 hover:bg-[#1a9dd4] rounded-lg"
          >
            More Products
          </button>
        </Link>
      </div>
    </section>
  );
}

export default BestSellingProductsSection;
