import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import Logo from "../../assets/logo.png";
import LinkList from "./LinkList";

const Header = () => {
  return (
    <header>
      <Link to={LinkList[0].url}>
        <img className="img-logo" src={Logo} alt="SpeedBuilder Logo" />
      </Link>
      <nav className="navbar">
        <ul className="navbar-links">
          {LinkList.map((item) => (
            <li key={item.id}>
              <NavLink to={item.url}>{item.title}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
