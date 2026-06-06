
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from "@/redux/api/features/wishlist/wishlist.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const { data, isLoading } = useGetWishlistQuery(undefined);
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const navigate = useNavigate();

  const items = data?.data || [];

  const handleRemove = async (id: string) => {
    try {
      await removeFromWishlist({ id }).unwrap();
      toast.success("Removed from wishlist");
    } catch {
      toast.error("Failed to remove");
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading wishlist...</p>;

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Your Wishlist</h1>

        {items.length === 0 ? (
          <p className="text-center py-8 text-gray-500 text-lg">
            Your wishlist is empty.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {items.map((item: any) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 relative border border-gray-100"
              >
                
                <button
                  onClick={() => handleRemove(item._id)}
                  className="absolute top-3 right-3 p-2 rounded-full hover:bg-red-100 text-gray-500 hover:text-red-600"
                >
                  ✕
                </button>

                
                <img
                  src={item.productId?.imageUrls?.[0] || '/placeholder.svg'}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                  alt={item.productId?.name || 'Product Image'}
                  className="w-full h-48 object-cover rounded-lg"
                />

                
                <h2 className="mt-4 text-lg font-semibold text-gray-900">
                  {item.productId?.name}
                </h2>

                <p className="text-[#004E64] text-xl font-bold mt-1">
                  ${item.productId?.price}
                </p>

                
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() =>
                      navigate(`/product/${item.productId?._id}`)
                    }
                    className="flex-1 py-2 px-4 bg-[#004E64] text-white rounded-lg hover:bg-[#00354a] transition"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
