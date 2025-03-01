import { useState } from "react";
import { TextInput } from "../../shared/components/atoms";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState("student");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <TextInput
            label="User name"
            type="text"
            className="w-full"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500 text-sm">{formik.errors.username}</div>
          ) : null}
        </div>

        <div className="mb-6">
          <TextInput
            label="Password"
            type="password"
            className="w-full"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>

        {/* Role Selection (Student/Doctor) */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="student"
                checked={selectedRole === "student"}
                onChange={() => setSelectedRole("student")}
                className="hidden"
              />
              <span
                className={`w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center ${
                  selectedRole === "student" ? "border-blue-500" : ""
                }`}
              >
                {selectedRole === "student" && (
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                )}
              </span>
              <span className="text-gray-800">Student</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="doctor"
                checked={selectedRole === "doctor"}
                onChange={() => setSelectedRole("doctor")}
                className="hidden"
              />
              <span
                className={`w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center ${
                  selectedRole === "doctor" ? "border-blue-500" : ""
                }`}
              >
                {selectedRole === "doctor" && (
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                )}
              </span>
              <span className="text-gray-800">Doctor</span>
            </label>
          </div>

          {/* Forget Password Link */}
          <Link to="/auth/update-password" className="text-blue-600 text-sm font-bold cursor-pointer">
            Forget Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-3xl transition duration-300 hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
