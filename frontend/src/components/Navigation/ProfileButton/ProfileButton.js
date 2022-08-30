import { useEffect, useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../../store/session";
import DemoLogin from "../../DemoLogin";
import LoginFormModal from "../../LoginFormModal";
import SignupFormModal from "../../SignupFormModal";
import "./ProfileButton.css";

const ProfileButton = ({ user, isLoaded }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  let sessionLinks;

  const logout = (e) => {
    dispatch(sessionActions.logout());
    return <Redirect to="/" />;
  };

  if (user) {
    sessionLinks = (
      <div id="session-links">
        <NavLink to="/account-details" className="nav-bar-button">
          Account
        </NavLink>
        <NavLink to="/" className="nav-bar-button" onClick={logout}>
          Log out
        </NavLink>
      </div>
    );
  } else {
    sessionLinks = (
      <div id="session-links" onClick={(e) => e.stopPropagation()}>
        <DemoLogin />
        <LoginFormModal type={"navigation"} />
        <SignupFormModal />
      </div>
    );
  }

  const openMenu = (e) => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [showMenu]);

  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        <i className="fa-solid fa-bars"></i>
        <i className="fa-solid fa-user-large"></i>
      </button>
      {showMenu && sessionLinks}
    </>
  );
};

export default ProfileButton;
