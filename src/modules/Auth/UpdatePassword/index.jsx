import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "../../shared/components/atoms";
import { useFormik } from "formik";
import * as Yup from "yup";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Your Email is required"),
    }),
    onSubmit: (values) => {
      navigate("/auth/new-password");
      console.log(values);
    },
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <p className="text-4xl font-bold">Forgot password</p>
        <span className="text-gray-500 text-xs font-bold p-2">
          Please enter your email to reset the password
        </span>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="pt-8">
          <TextInput
            label="Your Email"
            type="email"
            className="w-full"
            name="email"
            placeholder="Enter Your Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className={`w-full p-3 rounded-xl mt-4 cursor-pointer text-white ${
            formik.isValid ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!formik.isValid}
        >
          Reset Password
        </button>
      </form>
    </>
  );
};

export default UpdatePassword;
