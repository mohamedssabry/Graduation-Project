import { Link } from "react-router-dom";
import { TextInput } from "../../shared/components/atoms";

const UpdatePassword = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <p className="text-4xl font-bold">Forgot password</p>
        <span className="text-gray-500 text-xs font-bold p-2">
          Please enter your email to reset the password
        </span>
      </div>
      <form>
        <div className="pt-8">
          <TextInput
            label="Your Email"
            type="email"
            className="w-full"
            name="email"
            placeholder={"Enter Your Email"}
            onChange={(e) => e.target.value}
          />
        </div>
        <Link to={"/auth/new-password"}>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-xl mt-4 cursor-pointer"
          >
            Reset Password
          </button>
        </Link>
      </form>
    </>
  );
};

export default UpdatePassword;
