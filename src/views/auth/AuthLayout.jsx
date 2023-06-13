import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import { LinkListAuth } from "../../components/header/LinkList";
import useAuthContext from "../../contexts/AuthContext";

const AuthLayout = () => {

  const navigate = useNavigate();
  const {user} = useAuthContext();

  if(!user){
    navigate('/home');
  }
  return (
    <>
      <Header menu={LinkListAuth} />
      <Outlet />
    </>
  );
};

export default AuthLayout;
