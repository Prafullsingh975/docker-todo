import React, { use } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { login } from "../services/user";
import { useAuth } from "../context/Auth";

function Login() {
  const navigator = useNavigate();
  const { user } = useAuth();
  const [payload, setPayload] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const { email, password } = payload;

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      // Call your login function here
      const res = await login(payload);
      setPayload({
        email: "",
        password: "",
      });
      alert(res.message);
      navigator("/todo", { replace: true });
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.response.data.message || "Login failed. Please try again.");
      return;
    }
  };

  const handleChange = (key, value) => {
    setPayload((prev) => ({ ...prev, [key]: value }));
  };

  React.useEffect(() => {
    if (user) {
      navigator("/todo", { replace: true });
    }
  }, [user]);
  return (
    <div className="flex justify-center items-center h-full">
      <div className=" w-full md:w-1/2 xl:w-1/4 flex flex-col gap-4 border p-3 pb-7 rounded-md">
        <Heading title={"Login"} />
        <Input
          name="email"
          placeholder={"jonedoe@gmail.com"}
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
          value={payload.password}
        />
        <Button onClick={handleSubmit} title={"Log in"} />
        <Link
          to={"/register"}
          className="text-center text-blue-500 hover:text-blue-700"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
