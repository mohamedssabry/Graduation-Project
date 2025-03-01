import React from "react";

const TextInput = ({
  label,
  type = "",
  name,
  value,
  onChange,
  placeholder,
  className = "",
}) => {
  return (
    <div className={`${className}`}>
      {label && <label className="block text-xl mb-2">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-3 border-2 rounded-xl focus:outline-none border-gray-300
        `}
      />
    </div>
  );
};

export default TextInput;
