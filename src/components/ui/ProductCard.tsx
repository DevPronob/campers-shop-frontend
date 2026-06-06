import { useAddToWishlistMutation } from '@/redux/api/features/wishlist/wishlist.api';
import { TProduct } from '@/types/productTypes';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Heart } from 'lucide-react';
import { addToRecentlyViewed } from '@/utils/recentlyViewed';

const ProductCard = ({ product }: { product: TProduct }) => {
  const navigate = useNavigate();
  const [addToWishlist, { isLoading }] = useAddToWishlistMutation();

  const handleClick = () => {
    addToRecentlyViewed(product);
    navigate(`/product/${product._id}`);
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await addToWishlist({ id: product._id }).unwrap();
      toast.success('Added to wishlist ❤️');
    } catch {
      toast.error('Failed to add to wishlist');
    }
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white dark:bg-gray-900 rounded-[20px] border border-gray-100 dark:border-gray-800 overflow-hidden cursor-pointer transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5"
    >
      {/* Image */}
      <div className="relative h-[280px] overflow-hidden bg-[#f5f2ee] dark:bg-[#1e1c1a] flex items-center justify-center">
        <img
          src={product.imageUrls?.[0] || '/placeholder.svg'}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
          alt={product.name}
          className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Stock badge */}
        <div className="absolute top-3 left-3">
          {product.stock > 0 ? (
            <span className="bg-green-50/95 text-green-700 text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="bg-red-50/95 text-red-600 text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          disabled={isLoading}
          className="absolute top-2.5 right-2.5 w-[34px] h-[34px] rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-transform duration-200 hover:scale-110 disabled:opacity-50"
          aria-label="Add to wishlist"
        >
          <Heart
            size={16}
            className={isLoading ? 'text-gray-400' : 'text-red-500'}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Body */}
      <div className="p-[18px] pb-5 flex flex-col gap-2">
        <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-gray-400 dark:text-gray-500">
          {product.category ?? 'Product'}
        </p>

        <h2 className="text-[15px] font-medium leading-snug text-gray-900 dark:text-gray-100 line-clamp-2">
          {product.name}
        </h2>

        {/* Price — fixed: only show strikethrough if originalPrice exists and differs */}
        <div className="flex items-baseline gap-2">
          <span className="text-[20px] font-semibold text-[#D85A30]">
            ${product.price}
          </span>
          {product.price && product.price !== product.price && (
            <span className="text-xs text-gray-400 line-through">
              ${product.price}
            </span>
          )}
        </div>

        <button
          onClick={handleViewDetails}
          disabled={product.stock === 0}
          className={`mt-1 w-full py-2.5 rounded-[11px] text-xs font-semibold tracking-wide transition-all duration-200 ${
            product.stock > 0
              ? 'bg-[#1a1a1a] dark:bg-white text-white dark:text-gray-900 hover:bg-[#333] dark:hover:bg-gray-100 hover:scale-[1.01]'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
          }`}
        >
          {product.stock > 0 ? 'View Details' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;