import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div id="footer-container">
      <a href="https://www.linkedin.com/in/sungmin-lee-288801214/">
        <i className="fa-brands fa-linkedin footer-link-icons"></i>
      </a>
      <a href="https://github.com/sungminlee417/AirBnB">
        <i className="fa-brands fa-github footer-link-icons"></i>
      </a>
    </div>
  );
};

export default Footer;
