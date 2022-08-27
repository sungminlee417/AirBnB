import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton/ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import SignupFormModal from "../SignupFormModal";

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navbar">
      <div className="home-links">
        <NavLink className="home-link" to="/">
          <i className="fa-brands fa-airbnb fa-2x"></i>
          <p className="home-link-name">airbnb</p>
        </NavLink>
      </div>
      <div>
        <ProfileButton user={sessionUser} isLoaded={isLoaded} />
      </div>
    </div>
  );
};

export default Navigation;
