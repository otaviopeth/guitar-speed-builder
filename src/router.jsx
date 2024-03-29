import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "./views/home/Home";
import GuestLayout from "./views/guest/GuestLayout";
import Looper from "./views/util/Looper";
import Login from "./views/login/Login";
import Register from "./views/register/Register";
import AuthLayout from "./views/auth/AuthLayout";
import SongList from "./views/songs/SongList";
import SongItem from "./views/songs/SongItem";
import SongEdit from "./views/songs/SongEdit";
import SongRegister from "./views/songs/SongRegister";
import SpeederList from "./views/speeders/SpeederList";
import SpeederRegister from "./views/speeders/SpeederRegister";
import SpeederEdit from "./views/speeders/SpeederEdit";

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
        element: <SongList/>
      },
      {
        path:"/musicas/cadastro",
        element: <SongRegister/>
      },
      {
        path: "/musicas/edit/:id",
        element: <SongEdit/>
      },
      {
        path: "/speeder",
        element: <SpeederList/>
      },
      {
        path:"/speeder/cadastro",
        element: <SpeederRegister/>
      },
      {
        path:"/speeder/edit/:id",
        element: <SpeederEdit/>
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
