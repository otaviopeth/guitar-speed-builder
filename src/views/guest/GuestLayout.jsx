import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import LinkListGuest from "../../components/header/LinkList";
const GuestLayout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
}

export default GuestLayout;