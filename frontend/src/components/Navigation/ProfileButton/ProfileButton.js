import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../../store/session";
import LoginFormModal from "../../LoginFormModal";
import SignupFormModal from "../../SignupFormModal";
import "./ProfileButton.css";

const ProfileButton = ({ user, isLoaded }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  let sessionLinks;

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  if (user) {
    sessionLinks = (
      <ul>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log out</button>
        </li>
      </ul>
    );
  } else {
    sessionLinks = (
      <div id="session-links" onClick={(e) => e.stopPropagation()}>
        <LoginFormModal />
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
        <i class="fa-solid fa-bars"></i>
        <i class="fa-solid fa-user-large"></i>
      </button>
      {showMenu && sessionLinks}
    </>
  );
};

export default ProfileButton;
