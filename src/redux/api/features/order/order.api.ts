import { baseApi } from "../../baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   createOrder: builder.mutation({
  query: (payload) => {
    console.log(payload, "payload in order api");
    return {
      url: "/order/createOrder",
      method: "POST",
      body: payload,
    };
  },
  invalidatesTags: ["order"],
  }),

    getOrderById: builder.query({
      query: (id) => `/order/getOrderById/${id}`,
      providesTags: ["order"],
    }),

    getMyOrder: builder.query({
      query: () => "/myOrders",
      providesTags: ["order"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/order/updateOrderStatus/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["order"],
    }),

    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `/order/cancelOrder/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["order"],
    }),
    deleteOrder: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/order/deleteOrder/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order", "payment"],
    }),
    getOrderOverview: builder.query({
      query: () => "/order/overview",
      providesTags: ["order"],
    }), 

  }),
  overrideExisting: false,
});

export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetMyOrderQuery,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation,
  useGetOrderOverviewQuery,
  useDeleteOrderMutation,
} = orderApi;

export default orderApi;
