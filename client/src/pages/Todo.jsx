import React, { useState } from "react";
import Input from "../components/Input";
import Heading from "../components/Heading";
import Button from "../components/Button";
import Accodian from "../components/Accodian";
import { createTodo, getTodos, toggleTodoStatus } from "../services/todo";
import { logout } from "../services/user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

function Todo() {
  const navigator = useNavigate();
  const { logout: useLogout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState({
    title: "",
    description: "",
  });
  const [todos, setTodos] = useState([]);

  React.useEffect(() => {
    handleFetchTodods();
  }, []);

  const toggleOpen = () => {
    setIsOpen((pre) => !pre);
  };

  const handleChange = (key, value) => {
    setPayload((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const { title, description } = payload;
    if (!title) {
      alert("Please fill all fields");
      return;
    }
    try {
      const res = await createTodo(payload);
      setPayload({
        title: "",
        description: "",
      });
      handleFetchTodods();
      alert(res.message);
    } catch (error) {
      console.error("Error during registration:", error);
      alert(
        error.response.data.message || "Registration failed. Please try again."
      );
      return;
    }
  };

  const handleFetchTodods = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch (error) {
      console.error("Error during registration:", error);
      alert(
        error.response.data.message || "Registration failed. Please try again."
      );
      return;
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const res = await toggleTodoStatus(id);
      handleFetchTodods();
    } catch (error) {
      console.error("Error during registration:", error);
      alert(
        error.response.data.message || "Registration failed. Please try again."
      );
      return;
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logout();
      useLogout();
      //   alert(res.message);
      navigator("/login", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
      alert(error.response.data.message || "Logout failed. Please try again.");
      return;
    }
  };
  return (
    <div className="px-28 flex flex-col items-center w-full">
      <div className="flex justify-between items-center w-full">
        <div></div>
        <Heading title={"Todo"} />
        <svg
          onClick={handleLogout}
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          className="cursor-pointer hover:text-red-500"
        >
          <path
            fill="currentColor"
            d="M5 21q-.825 0-1.412-.587T3 19v-4h2v4h14V5H5v4H3V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm5.5-4l-1.4-1.45L11.65 13H3v-2h8.65L9.1 8.45L10.5 7l5 5z"
          />
        </svg>
      </div>
      <section className="flex flex-col items-center w-full overflow-y-hidden">
        {/* Top */}
        <section className="w-1/3 flex flex-col items-end gap-2">
          <section className="flex items-center gap-2 w-full">
            {isOpen ? (
              <svg
                onClick={toggleOpen}
                className="cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6z"
                />
              </svg>
            ) : (
              <svg
                onClick={toggleOpen}
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6z"
                />
              </svg>
            )}
            <Input
              value={payload.title}
              onChange={handleChange}
              name={"title"}
              placeholder={"Title*"}
            />
          </section>
          {isOpen && (
            // <Input
            //   className={"w-[calc(100%-35px)]"}
            //   name={"description"}
            //   placeholder={"Description"}
            // />
            <textarea
              value={payload.description}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="w-[calc(100%-35px)] border rounded-md p-2 resize-none"
              name="description"
              id="description"
              placeholder="description"
            ></textarea>
          )}
          <Button
            onClick={handleSubmit}
            title={"Add"}
            className={`w-[calc(100%-35px)]`}
          />
        </section>
        {/* List */}
        <section className="w-full mt-5 p-2 border rounded-md h-[calc(100vh-250px)]">
          <Heading title={"Todo Lists"} />
          <section className="flex flex-col gap-5 overflow-y-auto h-[calc(100vh-300px)]">
            {todos.map((todo, index) => (
              <Accodian
                key={index}
                todoId={todo.id}
                title={todo.title}
                description={todo.description}
                isDone={todo.isDone}
                handdleChange={handleToggleStatus}
              />
            ))}
          </section>
        </section>
      </section>
    </div>
  );
}

export default Todo;
