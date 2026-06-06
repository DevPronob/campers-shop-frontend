import { baseApi } from "../../baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getPaymentById: builder.query({
      query: () => ({
        url: `/payment/orders`,
        method: "GET",
      }),
      providesTags: ["payment"],
    }),
    cancleOrder: builder.mutation({
      query: ( id :string) => {
        console.log("id",id);
        return {
         url: `/payment/order/cancelOrder/${id}`,
        method: "PUT",
        }
       
      },
      invalidatesTags: ["payment"],
    }),

    deleteOrder: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/order/deleteOrder/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),

    getAllPayments: builder.query({
      query: () => ({
        url: `/payment/allPayments`,
        method: "GET",
      }),
      providesTags: ["payment"],
    }),
    

    updatePaymentStatus: builder.mutation({
      query: ({ id, status }: { id: string; status: string }) => ({
        url: `/payment/updateOrderStatus/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["payment"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetPaymentByIdQuery,
  useGetAllPaymentsQuery,
  useUpdatePaymentStatusMutation,
  useCancleOrderMutation,
} = paymentApi;

export default paymentApi;
