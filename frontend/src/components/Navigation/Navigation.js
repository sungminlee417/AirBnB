import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton/ProfileButton";
import "./Navigation.css";

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div id="navigation-container">
      <div id="navigation-bar" className="body-margin">
        <div id="homepage-links">
          <NavLink id="homepage-link" to="/">
            <i className="fa-brands fa-airbnb fa-2x"></i>
            <p id="homepage-link-name">airbnb</p>
          </NavLink>
        </div>
        <button id="search-bar">
          <div>Anywhere</div>
          <span className="search-bar-divider"></span>
          <div>Any week</div>
          <span className="search-bar-divider"></span>
          <div className="search-bar-light-text">Add guests</div>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <div>
          <div id="user-options">
            <NavLink to="/host" id="host-link">
              {sessionUser && <div>Switch to hosting</div>}
              {!sessionUser && <div>Become a host</div>}
            </NavLink>
            <i className="fa-solid fa-globe"></i>
            <ProfileButton user={sessionUser} isLoaded={isLoaded} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
