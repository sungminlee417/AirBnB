import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div id="footer-container">
      <NavLink
        id="about-link"
        to="/"
        onClick={() =>
          (window.location.href = "https://github.com/sungminlee417/AirBnB.git")
        }
      >
        About
      </NavLink>
    </div>
  );
};

export default Footer;
