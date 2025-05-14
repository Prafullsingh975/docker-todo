import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { register } from "../services/user";
import { useAuth } from "../context/Auth";

function Register() {
  const navigator = useNavigate();
  const { user } = useAuth();
  const [payload, setPayload] = React.useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (key, value) => {
    setPayload((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const { firstName, email, password, confirmPassword } = payload;

    if (!firstName || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and confirm password do not match");
      return;
    }
    try {
      const res = await register(payload);
      setPayload({
        firstName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      alert(res.message);
      navigator("/login", { replace: true });
    } catch (error) {
      console.error("Error during registration:", error);
      alert(
        error.response.data.message || "Registration failed. Please try again."
      );
      return;
    }
  };

  React.useEffect(() => {
    if (user) {
      navigator("/todo", { replace: true });
    }
  }, [user]);
  return (
    <div className="flex justify-center items-center h-full">
      <div className=" w-full md:w-1/2 xl:w-1/4 flex flex-col gap-4 border p-3 pb-7 rounded-md">
        <Heading title={"Register"} />
        <Input
          name="firstName"
          placeholder={"John Doe"}
          className={"block"}
          onChange={handleChange}
          value={payload.firstName}
        />
        <Input
          name="email"
          placeholder={"johndoe@gmail.com"}
          className={"block"}
          onChange={handleChange}
          value={payload.email}
        />
        <Input
          name="password"
          placeholder={"Enter password"}
          type="password"
          className={"block"}
          onChange={handleChange}
        />
        <Input
          name="confirmPassword"
          placeholder={"Enter password to confirm"}
          type="password"
          className={"block"}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit} title={"Register"} />
        <Link
          to={"/login"}
          className="text-center text-blue-500 hover:text-blue-700"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
