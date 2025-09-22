import { baseApi } from "../../baseApi";

const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getPaymentById: builder.query({
            query: () => ({
                url: `/payment`,
                method: 'GET',
            }),
            providesTags: ['payment'],
        }),

    }),
    overrideExisting: false,
});

export const { useGetPaymentByIdQuery } = paymentApi;
export default paymentApi;