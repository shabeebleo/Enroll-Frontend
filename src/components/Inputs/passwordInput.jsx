import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function PasswordInput({ value, onChange, placeholder }) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-2 rounded-lg mb-2 mt-3">
      <input
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "password"}
        value={value}
        onChange={onChange}
        className="w-full text-sm bg-transparent py-2 mr-3  outline-none"
      />
      {isShowPassword ? (
        <FaRegEye
          size={22}
          onClick={() => {
            toggleShowPassword();
          }}
          className="text-primary cursor-pointer"
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          onClick={() => {
            toggleShowPassword();
          }}
          className="cursor-pointer"
        />
      )}
    </div>
  );
}

export default PasswordInput;
