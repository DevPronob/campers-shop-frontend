import { useAddToWishlistMutation } from '@/redux/api/features/wishlist/wishlist.api';
import { TProduct } from '@/types/productTypes';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProductCard = ({ product }: { product: TProduct }) => {
  const navigate = useNavigate();
  
  const navigateToDetail = (id: string) => {
    navigate(`/product/${id}`);
  };

  const [addToWishlist, { isLoading }] = useAddToWishlistMutation(); // Renamed to addToWishlist

  const handleWishlist = async () => {
    try {
      const res = await addToWishlist({ id: product._id }).unwrap();
      console.log(res);
      toast.success("Added to wishlist");
    } catch (error) {
      console.error("Failed to add to wishlist", error);
      console.log(error)
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <div className="group relative bg-white h-[460px] dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-full sm:w-[220px] md:w-[250px] lg:w-[270px] mx-auto border border-gray-100 hover:border-gray-200">
      
      {/* ==== Product Image ==== */}
      <div className="relative w-full h-56 md:h-64 overflow-hidden">
        <img
          src={product.imageUrls?.[1] || '/placeholder.jpg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay Button on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex justify-center items-center opacity-0 group-hover:opacity-100">
          <button
            onClick={() => navigateToDetail(product._id)}
            className="py-2 px-5 bg-[#004E64] text-white text-sm font-semibold rounded-full shadow hover:bg-[#003C4C] transition-all duration-300"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* ==== Product Info ==== */}
      <div className="p-4 text-center flex flex-col justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 line-clamp-1">
          {product.name}
        </h2>

        <p className="text-[#FF6B35] font-bold mt-2 text-lg">${product.price}</p>

        <p
          className={`mt-1 text-sm font-medium ${
            product.stock > 0 ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </p>

       <div className="mt-4 flex items-center gap-3">
  <button
    onClick={() => navigateToDetail(product._id)}
    disabled={product.stock === 0}
    className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-all duration-300 ${
      product.stock > 0
        ? 'bg-white text-gray-900 border border-[#004E64] hover:bg-[#004E64] hover:text-white'
        : 'bg-gray-200 border border-gray-300 text-gray-400 cursor-not-allowed'
    }`}
  >
    View
  </button>

  <button
    onClick={handleWishlist}
    disabled={product.stock === 0 || isLoading}
    className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-all duration-300 ${
      product.stock > 0 && !isLoading
        ? 'bg-white text-gray-900 border border-[#004E64] hover:bg-[#FF6B35] hover:text-white'
        : 'bg-gray-200 border border-gray-300 text-gray-400 cursor-not-allowed'
    }`}
  >
    {isLoading ? '...' : 'Wishlist'}
  </button>
</div>
      </div>
    </div>
  );
};

export default ProductCard;
