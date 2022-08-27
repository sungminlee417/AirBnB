import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import SignupFormModal from "../SignupFormModal";

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className="navbar">
      <div className="home-links">
        <NavLink className="home-link" to="/">
          <i className="fa-brands fa-airbnb fa-2x"></i>
          <p className="home-link-name">airbnb</p>
        </NavLink>
      </div>
      <div>{isLoaded && sessionLinks}</div>
    </div>
  );
};

export default Navigation;
