import React from "react";

const Button = ({ title, type = "button", className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-5 border rounded-md font-semibold hover:bg-black hover:text-white ${className}`}
      type={type}
    >
      {title}
    </button>
  );
};

export default Button;
