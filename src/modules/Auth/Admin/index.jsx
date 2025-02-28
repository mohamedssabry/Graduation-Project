import { TextInput } from "../../shared/components/atoms";

const Admin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-white">
      <div className="bg-white p-20 rounded-3xl shadow-lg w-2/5">
        <form>
          <div className="mb-4">
            <TextInput
              label={"User name"}
              type={"text"}
              className="w-full"
              name={"username"}
              onChange={(e) => {
                e.target.value;
              }}
            />
          </div>

          <div className="mb-6">
            <TextInput
              label={"Password"}
              type={"password"}
              className="w-full"
              name={"password"}
              onChange={(e) => {
                e.target.value;
              }}
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="text-blue-600 text-sm font-bold ">
              Forget Password?
            </span>

            <button
              type="submit"
              className="w-1/3 cursor-pointer bg-blue-600 text-white py-2 rounded-3xl transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
