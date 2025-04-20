import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/authSlice";
import { toast } from "react-toastify";
import { API_URL } from "../../modules/shared/config";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const userIsNotAuthorized = result?.error?.status === 403;
  if (userIsNotAuthorized) {
    const refreshToken = api.getState().auth.refreshToken;

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh", // Adjust the URL as per your API
          method: "POST",
          body: { refresh_token: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult?.data) {
        const user = api.getState().auth.user; // Get the user from the state
        api.dispatch(setCredentials({ ...refreshResult.data, user }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        toast.error("Your session has timed out. Please log in again.");
        api.dispatch(logOut());
      }
    } else {
      toast.error("Your session has timed out. Please log in again.");
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
