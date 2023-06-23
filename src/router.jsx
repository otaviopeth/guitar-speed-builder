import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "./views/home/Home";
import GuestLayout from "./views/guest/GuestLayout";
import Looper from "./views/util/Looper";
import Login from "./views/login/Login";
import Register from "./views/register/Register";
import AuthLayout from "./views/auth/AuthLayout";
import SongList from "./views/songs/SongList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/util" />,
      },
      {
        path: "/musicas",
        element: <SongList />
      }
     
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/util",
        element: <Looper />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registro",
        element: <Register />,
      },
    ],
  }
]);

export default router;
