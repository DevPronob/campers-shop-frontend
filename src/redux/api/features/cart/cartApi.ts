import { baseApi } from "../../baseApi";

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCart: builder.mutation({
            query: (body) => ({
                url: '/cart',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['cart'],
        }),
        getCart: builder.query({
            query: () => ({
                url: '/cart',
                method: 'GET',
            }),
            providesTags: ['cart']
        }),
        updateCart: builder.mutation({
            query: ({ id, quantity }) => ({
                url: `/cart/${id}`,
                method: 'PUT',
                body: { quantity },
            }),
            invalidatesTags: ['cart'],
        }),
        deleteCart: builder.mutation({
            query: ({ id }) => ({
                url: `/cart/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['cart']
        }),
    }),
    overrideExisting: false,
});

export const { useCreateCartMutation, useGetCartQuery, useUpdateCartMutation, useDeleteCartMutation } = cartApi;
export default cartApi;