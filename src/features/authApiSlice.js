import { apiSlice } from "app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login", // Adjust the URL as per your API
        method: "POST",
        body: { ...credentials },
      }),
    }),

    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/signup", // Adjust the URL as per your API
        method: "POST",
        body: { ...userData },
      }),
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/reset", // Adjust the URL as per your API
        method: "POST",
        body: { ...email },
      }),
    }),

    verifyOtpAndEmail: builder.mutation({
      query: (payload) => ({
        url: "/auth/resetcon", // Adjust the URL as per your API
        method: "POST",
        body: { ...payload },
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ otp, newPassword }) => ({
        url: "/reset-password", // Adjust the URL as per your API
        method: "POST",
        body: { otp, newPassword },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyOtpAndEmailMutation,
  useResetPasswordMutation,
} = authApiSlice;
