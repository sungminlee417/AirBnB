import "./Footer.css";

const Footer = () => {
  return (
    <div id="footer-container">
      <a
        href="https://www.linkedin.com/in/sungmin-lee-288801214/"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fa-brands fa-linkedin footer-link-icons"></i>
      </a>
      <a
        href="https://github.com/sungminlee417/AirBnB"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fa-brands fa-github footer-link-icons"></i>
      </a>
      <a href="https://sungminlee.com" target="_blank" rel="noreferrer">
        <i className="fa-solid fa-user footer-link-icons"></i>
      </a>
    </div>
  );
};

export default Footer;
