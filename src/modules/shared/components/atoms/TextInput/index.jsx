import React from "react";

const TextInput = ({
  label,
  type = "",
  name,
  value,
  onChange,
  placeholder,
  error,
  className = "",
}) => {
  return (
    <div className={`${className}`}>
      {label && <label className="block text-2xl mb-2">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-3 border-[3px] rounded-xl focus:outline-none  ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
