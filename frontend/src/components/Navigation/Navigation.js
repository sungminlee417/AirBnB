import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton/ProfileButton";
import "./Navigation.css";

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div id="navbar-container">
      <div className="navbar body-margin">
        <div className="homepage-links">
          <NavLink className="homepage-link" to="/">
            <i className="fa-brands fa-airbnb fa-2x"></i>
            <p className="homepage-link-name">airbnb</p>
          </NavLink>
        </div>
        <div id="search-bar">
          <div className="bold">Anywhere</div>
          <span className="search-bar-divider"></span>
          <div className="bold">Any week</div>
          <span className="search-bar-divider"></span>
          <div className="light">Add guests</div>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div>
          <div id="user-options">
            <NavLink to="/host" id="host-link">
              <div id="host-link-container">
                {sessionUser && <div>Switch to hosting</div>}
                {!sessionUser && <div>Become a host</div>}
              </div>
            </NavLink>
            <div id="language-link-container">
              <i className="fa-solid fa-globe"></i>
            </div>
            <ProfileButton user={sessionUser} isLoaded={isLoaded} />
          </div>
        </div>
        <div className="component-break-line"></div>
      </div>
    </div>
  );
};

export default Navigation;
