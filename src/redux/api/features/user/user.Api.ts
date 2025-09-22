import { baseApi } from "../../baseApi";

const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getAllUsers: builder.query({
            query: () => ({
                url: `/user/all-users`,
                method: 'GET',
            }),
            providesTags: ['User']
        }),
  updateUser: builder.mutation({
  query: ({ id, role }) => {
    console.log(id,role,"fjfjf")
    return {
      url: `/user/${id}`,
      method: "PUT",
      body: { role },
    }
  },
  invalidatesTags: ["User"],
}),
  }),

    overrideExisting: false,
});

export const { useGetAllUsersQuery, useUpdateUserMutation } = usersApi;
export default usersApi;