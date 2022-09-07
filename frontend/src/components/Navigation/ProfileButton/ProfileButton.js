import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
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

  if (user && isLoaded) {
    sessionLinks = (
      <div id="session-links">
        <Link to="/account-details" className="profile-button-link">
          Account
        </Link>
        <Link to="/" className="profile-button-link" onClick={logout}>
          Log out
        </Link>
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
      <button id="profile-button" onClick={openMenu}>
        <i className="fa-solid fa-bars"></i>
        <i className="fa-solid fa-user-large"></i>
      </button>
      {showMenu && sessionLinks}
    </>
  );
};

export default ProfileButton;
