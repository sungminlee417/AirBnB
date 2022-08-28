import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton/ProfileButton";
import "./Navigation.css";

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navbar body-margin">
      <div className="homepage-links">
        <NavLink className="homepage-link" to="/">
          <i className="fa-brands fa-airbnb fa-2x"></i>
          <p className="homepage-link-name">airbnb</p>
        </NavLink>
      </div>
      <div>
        <ProfileButton user={sessionUser} isLoaded={isLoaded} />
      </div>
    </div>
  );
};

export default Navigation;
