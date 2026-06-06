
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { Button, Popconfirm } from "antd";

import { RootState } from "@/redux/store";
import { increment, decrement } from "@/redux/api/features/cart/cartSlice";
import { useCreateCartMutation } from "@/redux/api/features/cart/cartApi";
import { useGetSingleProductsQuery } from "@/redux/api/features/products/productApi";
import { useAddToWishlistMutation } from "@/redux/api/features/wishlist/wishlist.api";
import {
  useCreateReviewMutation,
  useGetReviewsByProductQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "@/redux/api/features/review/review.api";

function ProductsDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [productSlider, setProductSlider] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  const cartQuantity = useSelector(
    (state: RootState) => state.cart.quantity
  );

  const { data: detailProduct, isLoading } = useGetSingleProductsQuery(id);
  const { data: reviewsData, refetch } = useGetReviewsByProductQuery(detailProduct?.data?._id);

  const [createCart] = useCreateCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [createReview] = useCreateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [updateReview] = useUpdateReviewMutation();

  
  const handleCart = async () => {
    try {
     const res = await createCart({
        productId: detailProduct?.data?._id,
        quantity: cartQuantity || 1,
      }).unwrap();
      console.log(res,"res from add to cart");
      console.log(detailProduct?.data?._id,cartQuantity,"res from add to cart")

      toast.success("Product added to cart");
    } catch(err) {
      console.log(err);
      toast.error("Failed to add product to cart");
    }
  };

  
  const handleWishlist = async () => {
    try {
      await addToWishlist({
        id: detailProduct?.data?._id,
      }).unwrap();

      toast.success("Added to wishlist");
    } catch {
      toast.error("Failed to add to wishlist");
    }
  };

  
  const handleReviewSubmit = async () => {
    if (!rating || !reviewText) {
      return toast.error("Rating & review required");
    }

    try {
      if (editingReviewId) {
        await updateReview({
          id: editingReviewId,
          rating,
          comment: reviewText,
        }).unwrap();
        toast.success("Review updated");
      } else {
        await createReview({
          productId: detailProduct?.data?._id,
          rating,
          comment: reviewText,
        }).unwrap();
        toast.success("Review submitted");
      }

      setRating(0);
      setReviewText("");
      setEditingReviewId(null);
      refetch();
    } catch (err) {
      console.log(err);
      toast.error("Failed to submit review");
    }
  };

  
  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteReview(reviewId).unwrap();
      toast.success("Review deleted");
      refetch();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete review");
    }
  };

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          
          <div>
            <img
              src={detailProduct?.data?.imageUrls?.[productSlider] || '/placeholder.svg'}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
              className="w-full rounded-lg shadow-md"
              alt={detailProduct?.data?.name || 'Product Image'}
            />
            {detailProduct?.data?.imageUrls && detailProduct?.data?.imageUrls.length > 0 && (
              <div className="flex gap-2 mt-4">
                {detailProduct?.data?.imageUrls?.map((img: string, idx: number) => (
                  <img
                    key={idx}
                    src={img || '/placeholder.svg'}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                    onClick={() => setProductSlider(idx)}
                    className="w-20 h-20 cursor-pointer border rounded hover:scale-105 transition-transform"
                    alt={`Product thumbnail ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          
          <div>
            <h1 className="text-3xl font-bold mb-2">{detailProduct?.data?.name}</h1>
            <p className="text-gray-600 mb-4">{detailProduct?.data?.description}</p>
            <p className="text-xl font-semibold text-[#FF6B35] mb-2">${detailProduct?.data?.price}</p>
            <p className="mb-4">Stock: {detailProduct?.data?.stock}</p>

            
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => dispatch(decrement())}
                className="px-4 py-1 border rounded hover:bg-gray-200"
              >
                -
              </button>
              <span className="font-medium">{cartQuantity}</span>
              <button
                onClick={() => dispatch(increment())}
                className="px-4 py-1 border rounded hover:bg-gray-200"
              >
                +
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleCart}
                className="px-6 py-2 border border-[#004E64] hover:bg-[#004E64] hover:text-white rounded transition"
              >
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className="px-6 py-2 border border-[#004E64] hover:bg-[#004E64] hover:text-white rounded transition"
              >
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </section>

      
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={20}
              className={
                i <= (reviewsData?.averageRating || 0)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
          <span className="text-sm text-gray-600">
            ({reviewsData?.data?.length || 0} reviews)
          </span>
        </div>

        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">
            {editingReviewId ? "Update Your Review" : "Share Your Experience"}
          </h3>

          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={24}
                onClick={() => setRating(i)}
                className={`cursor-pointer transition-colors duration-200 ${
                  i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <input
            type="text"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-[#004E64] focus:outline-none mb-4"
          />

          <div className="flex gap-2">
            <button
              onClick={handleReviewSubmit}
              className="px-6 py-2 bg-[#004E64] text-white font-medium rounded-md hover:bg-[#003644] transition-colors"
            >
              {editingReviewId ? "Update Review" : "Submit Review"}
            </button>
            {editingReviewId && (
              <button
                onClick={() => {
                  setEditingReviewId(null);
                  setReviewText("");
                  setRating(0);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        
        <div className="space-y-4">
          {reviewsData?.data?.length ? (
            reviewsData.data.map((r: any) => (
              <div
                key={r._id}
                className="bg-white shadow rounded-lg p-5 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{r.userId?.name}</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i <= r.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 text-sm">{r.comment}</p>

                <div className="flex justify-end gap-2">
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      setEditingReviewId(r._id);
                      setReviewText(r.comment);
                      setRating(r.rating);
                    }}
                  >
                    Edit
                  </Button>

                  <Popconfirm
                    title="Are you sure to delete this review?"
                    onConfirm={() => handleDeleteReview(r._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="default" danger size="small">
                      Delete
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No reviews yet</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProductsDetail;
