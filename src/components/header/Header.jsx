import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import Logo from "../../assets/logo.png";
import useAuthContext from "../../contexts/AuthContext";

const Header = ({menu}) => {

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
    <header>
      <Link to={menu[0].url}>
        <img className="img-logo" src={Logo} alt="SpeedBuilder Logo" />
      </Link>
      <nav className="navbar">
        <ul className="navbar-links">
          {menu.map((item) => (
            <li key={item.id}>
              <NavLink to={item.url}>{item.title}</NavLink>
            </li>
          ))}
          {user && <li id="btn" key='0'>
            <button onClick={handleLogout}>Logout
            </button>
            </li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
