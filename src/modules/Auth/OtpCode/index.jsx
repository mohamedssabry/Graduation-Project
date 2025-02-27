import { useState } from "react";

const VerificationCode = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const handleChange = (index, value) => {
    if (isNaN(value)) return; // Prevent non-numeric input
    const newCode = [...code];
    newCode[index] = value.slice(-1); // Ensure only one digit
    setCode(newCode);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold">Verification Code</h2>
      <p className="text-gray-500 text-base font-bold p-4">
        Enter the number that was sent
      </p>
      <form className="w-full pt-2">
        <div className="flex justify-center gap-3 mb-4">
          {code.map((num, idx) => (
            <input
              key={idx}
              type="text"
              maxLength="1"
              value={num}
              onChange={(e) => handleChange(idx, e.target.value)}
              className="w-12 h-12 text-xl text-center border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          ))}
        </div>

        <p className="text-gray-500 text-sm text-center">
          Don’t receive code ?
          <span className="text-blue-500 cursor-pointer"> Re-send</span>
        </p>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-xl mt-4 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default VerificationCode;
