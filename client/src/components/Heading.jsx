import React from "react";

const Heading = ({ title, className }) => {
  return (
    <h1 className={`text-center text-2xl font-semibold mb-7 ${className}`}>
      {title}
    </h1>
  );
};

export default Heading;
