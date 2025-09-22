import { baseApi } from "../../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Register
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/user/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // Login
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // Current User
    getMe: builder.query({
      query: () => ({
        url: "/user/me", // ✅ usually better to use `/user/me` endpoint
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

// Export hooks
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetMeQuery,
} = authApi;

export default authApi;
