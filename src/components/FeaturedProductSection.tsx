import ProductCard from './ui/ProductCard';
import { useGetProductsWithoutFilterQuery } from '@/redux/api/features/products/productApi';
import { TProduct } from '@/types/productTypes';
import toast from 'react-hot-toast';

const FeaturedProductSection: React.FC = () => {
  const { data, error, isLoading } = useGetProductsWithoutFilterQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <svg
          aria-hidden="true"
          className="w-10 h-10 text-gray-200 animate-spin "
          viewBox="0 0 100 101"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591..."
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }

  if (error) {
    toast.error('Failed to fetch products');
    return (
      <div className="flex items-center justify-center min-h-[300px] text-red-500">
        Failed to load featured products
      </div>
    );
  }

  const featured = data?.data.filter((p: TProduct) => p.isFeatured);

  return (
    <section className="px-6 md:px-10 lg:px-20 py-10 bg-[#f9f9f9]">
      
      <div className="text-center mb-10">
        <h3 className="text-3xl md:text-4xl font-bold text-[#0B0B0B]">
          Featured <span className="">Products</span>
        </h3>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Handpicked items specially for you
        </p>
      </div>

      
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {featured?.length ? (
          featured.map((product: TProduct) => (
            <div
              key={product._id}
              className="transition-transform transform hover:-translate-y-2 duration-300"
            >
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No featured products found
          </div>
        )}
      </div>

      
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          className="px-6 py-3 bg-[#004E64] text-white font-semibold rounded-lg shadow-md hover:bg-[#021b25] transition duration-300"
        >
          View More Products
        </button>
      </div>
    </section>
  );
};

export default FeaturedProductSection;
