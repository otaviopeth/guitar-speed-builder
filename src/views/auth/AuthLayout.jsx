import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import useAuthContext from "../../contexts/AuthContext";
import { useEffect } from "react";

const AuthLayout = () => {

  const navigate = useNavigate();
  const {user} = useAuthContext();

  useEffect(() => {
    if(!user){
      navigate('/home');
    }
  }, []);
 
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AuthLayout;
