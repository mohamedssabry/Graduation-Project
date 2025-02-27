import React from "react";
import { TextInput } from "../../shared/components/atoms";
import { Link } from "react-router-dom";

const NewPassword = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <p className="text-4xl font-bold">Create new password</p>
      </div>
      <form>
        <div className="pt-8">
          <TextInput
            label="Password"
            type="password"
            className="w-full"
            name="password"
            onChange={(e) => e.target.value}
            placeholder={"Enter your new password"}
          />
        </div>
        <div className="pt-4">
          <TextInput
            label="Confirm Password"
            type="password"
            className="w-full"
            name="password"
            onChange={(e) => e.target.value}
            placeholder={"Re-enter password"}
          />
        </div>
        <Link to={"/auth/verify-otp"}>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-xl mt-4 cursor-pointer"
          >
            Update Password
          </button>
        </Link>
      </form>
    </>
  );
};

export default NewPassword;
