import baseApi from "../../baseApi";

const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => ({
        url: '/wishlist',
        method: 'GET',
      }),
      providesTags: ['wishlist'],
    }),

    addToWishlist: builder.mutation({
      query: ({ id }) =>{
        console.log(id,"id")
        return {
        url: `/wishlist`,
        method: 'POST',
        body: { productId:id },
        }
      },
      invalidatesTags: ['wishlist'],
    }),

    removeFromWishlist: builder.mutation({
      query: ({ id }) => ({
        url: `/wishlist/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['wishlist'], 
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;

export default wishlistApi;
