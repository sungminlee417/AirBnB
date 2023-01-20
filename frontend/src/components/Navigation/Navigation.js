import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileButton from "./ProfileButton/ProfileButton";
import "./Navigation.css";
import LoginFormModal from "../LoginFormModal";

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div id="navigation-container">
      <div id="navigation-bar" className="body-margin">
        <div id="homepage-links">
          <Link id="homepage-link" exact="true" to="/">
            <i className="fa-brands fa-airbnb fa-2x"></i>
            <p id="homepage-link-name">groundbnb</p>
          </Link>
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
            <>
              {sessionUser && (
                <Link to="/host" id="host-link">
                  <div>Become a host</div>
                </Link>
              )}
              {!sessionUser && <LoginFormModal type={"host-link"} />}
            </>
            <i className="fa-solid fa-globe"></i>
            <ProfileButton user={sessionUser} isLoaded={isLoaded} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
