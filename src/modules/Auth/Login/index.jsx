import { useState } from "react";
import { TextInput } from "../../shared/components/atoms";
import { Link } from "react-router-dom";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState("student");

  return (
    <div>
      <form>
        <div className="mb-4">
          <TextInput
            label="User name"
            type="text"
            className="w-full"
            name="username"
            onChange={(e) => e.target.value}
          />
        </div>

        <div className="mb-6">
          <TextInput
            label="Password"
            type="password"
            className="w-full"
            name="password"
            onChange={(e) => e.target.value}
          />
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
                className={`w-4 h-4 border-1  border-gray-400 rounded-full flex items-center justify-center ${
                  selectedRole === "student" ? "border-blue-500" : ""
                }`}
              >
                {selectedRole === "student" && (
                  <span className="w-3 h-3 bg-blue-500 rounded-full "></span>
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
                className={`w-4 h-4 border-1 border-gray-400 rounded-full flex items-center justify-center ${
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
