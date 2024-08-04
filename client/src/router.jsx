import { createBrowserRouter, redirect } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import VillagePage from "./Pages/Village";
import Users from "./Pages/Users";
import AddUser from "./Pages/addUser";
import MainLayout from "./components/Layout";
import UpdateUser from "./Pages/UpdateUser"
export const isAlreadyLogin = () => {
  let token = localStorage.getItem("access_token");
  if (token) {
    return redirect("/");
  }
  return null;
};

const isNotLogin = () => {
  let token = localStorage.getItem("access_token");
  if (!token) {
    return redirect("/login");
  }
  return null;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/Login",
    element: <Login />,
    loader: isAlreadyLogin,
  },
  {
    loader: isNotLogin,
    element: <MainLayout />,
    children: [
      {
        path: "/village",
        element: <VillagePage />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/addUser",
        element: <AddUser />,
      },
      {
        path: "/updateUser/:id",
        element: <UpdateUser />,
      },
    ],
  },
]);
