import { Link } from "react-router-dom";
import { TextInput } from "../../shared/components/atoms";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Admin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-white">
      <div className="bg-white p-20 rounded-3xl shadow-lg w-2/5">
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form values:", values);
          }}
        >
          {({ handleChange, values, errors, touched }) => (
            <Form>
              <div className="mb-4">
                <TextInput
                  label="User name"
                  type="text"
                  className="w-full"
                  name="username"
                  onChange={handleChange}
                  value={values.username}
                />
                {errors.username && touched.username && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.username}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <TextInput
                  label="Password"
                  type="password"
                  className="w-full"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <Link
                  to="/auth/update-password"
                  className="text-blue-600 text-sm font-bold cursor-pointer"
                >
                  Forget Password?
                </Link>

                <button
                  type="submit"
                  className="w-1/3 cursor-pointer bg-blue-600 text-white py-2 rounded-3xl transition duration-300"
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Admin;

