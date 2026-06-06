
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { logout, setUser } from "./features/auth/authSlice";
import { RootState } from "../store"; 

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});


const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    toast.error((result.error.data as any)?.message || "Not found");
  }
  if (result?.error?.status === 403) {
    toast.error((result.error.data as any)?.message || "Forbidden");
  }

  if (result?.error?.status === 401) {
    console.log("🔄 Sending refresh token...");

    const refreshResponse = await fetch(
      "https://campers-ecom-backend.vercel.app/api/v1/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await refreshResponse.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["cart", "Product", "payment", "User","wishlist","review","order"],
  endpoints: () => ({}),
});

export default baseApi;
