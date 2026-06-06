import { baseApi } from "../../baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   getReviewsByProduct: builder.query({
  query: (productId: string) => {
    console.log(productId, "productId");
    return {
      url: `/review/product/${productId}`,
      method: "GET",
    };
  },
  providesTags: ["review"],
}),
    createReview: builder.mutation({
      query: (payload: {
        productId: string;
        rating: number;
        comment: string;
      }) => ({
        url: `/review`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["review"],
    }),
    updateReview: builder.mutation({
      query: ({
        id,
        rating,
        comment,
      }: {
        id: string;
        rating: number;
        comment: string;
      }) => ({
        url: `/review/update/${id}`,
        method: "PUT",
        body: { rating, comment },
      }),
      invalidatesTags: ["review"],
    }),
    deleteReview: builder.mutation({
      query: (id: string) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetReviewsByProductQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;

export default reviewApi;
