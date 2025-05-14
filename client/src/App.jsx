import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo from "./pages/Todo";
import ErrorPage from "./pages/ErrorPage";
import { useAuth } from "./context/Auth";
import Protected from "./components/Protected";

function App() {
  const { user } = useAuth();
  const [isLogin, setIsLogin] = React.useState(null);

  React.useEffect(() => {
    setIsLogin(user);
  }, [user]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isLogin ? (
        <Navigate to="/todo" replace />
      ) : (
        <Navigate to="/login" replace />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/todo",
      element: (
        <Protected>
          <Todo />
        </Protected>
      ),
    },
  ]);
  return (
    <main className="h-screen">
      <RouterProvider router={router} />
      {/* add tost */}
    </main>
  );
}

export default App;
