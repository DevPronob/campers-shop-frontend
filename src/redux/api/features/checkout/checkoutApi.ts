import { baseApi } from "../../baseApi";

const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation({
            query: (body) => ({
                url: '/payment/createPayment',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['payment'],
        }),
        createPaymentWithUser: builder.mutation({
            query: (body) => ({
                url: '/payment',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['cart'],
        }),


    }),
    overrideExisting: false,
});

export const { useCreatePaymentMutation, useCreatePaymentWithUserMutation } = cartApi;
export default cartApi;