import React from "react";
import Button from "./Button";

function Accodian({ todoId, title, description, isDone, handdleChange }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => {
    setIsOpen((pre) => !pre);
  };
  return (
    <div className="w-full flex flex-col gap-4 border p-3  rounded-md">
      <section className="flex justify-between items-center">
        <div className=" flex gap-2">
          <input
            onChange={() => handdleChange(todoId)}
            type="checkbox"
            className="cursor-pointer"
            checked={isDone}
          />
          <span className={`${isDone ? "line-through" : ""}`}>{title}</span>
        </div>
        {description && (
          <Button
            onClick={handleOpen}
            title={isOpen ? "Show Less" : "Show More"}
          />
        )}
      </section>
      {isOpen && <section className="">{description}</section>}
    </div>
  );
}

export default Accodian;
