import React from "react";
import { TextInput } from "../../shared/components/atoms";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: () => {
      navigate("/auth/verify-otp");
    },
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <p className="text-4xl font-bold">Create new password</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="pt-8">
          <TextInput
            label="Password"
            type="password"
            className="w-full"
            name="password"
            placeholder="Enter your new password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="pt-4">
          <TextInput
            label="Confirm Password"
            type="password"
            className="w-full"
            name="confirmPassword"
            placeholder="Re-enter password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className={`w-full p-3 rounded-xl mt-4 cursor-pointer text-white ${
            formik.isValid ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!formik.isValid}
        >
          Update Password
        </button>
      </form>
    </>
  );
};

export default NewPassword;
