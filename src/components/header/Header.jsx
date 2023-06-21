import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import useAuthContext from "../../contexts/AuthContext";
import LinkListGuest from "./LinkList";
import { LinkListAuth } from "./LinkList";
import './Header.css';
const Header = () => {

  const {user, logout} = useAuthContext();
  const navigate = useNavigate();
  console.log(user);
  const handleLogout = async (e) => {
    try{
    await logout();
    navigate('/home');
    } catch(err){
      console.log(err);
    }
  }

  return (
    <header style={{backgroundColor: user ? '#c21f9f' : '#FF4431'}}>
      <Link to={LinkListAuth[0].url}>
        <img className="img-logo" src={Logo} alt="SpeedBuilder Logo" />
      </Link>
      <nav className="navbar">
        <ul className="navbar-links">
          {user && <li id='name' key='999'>&#91; {user.name.split(" ")[0]}  &#93;</li>}
          {user ? LinkListAuth.map((item) => (
            <li key={item.id}>
              <NavLink to={item.url}>{item.title}</NavLink>
            </li>
          )) : LinkListGuest.map((item) => (
            <li key={item.id}>
              <NavLink to={item.url}>{item.title}</NavLink>
            </li>
          )) }
          {user && <li id="btn" key='0'>
            <button onClick={handleLogout}>Sair
            </button>
            </li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
