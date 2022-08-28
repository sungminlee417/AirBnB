import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./DemoLogin.css";

const DemoLogin = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(sessionActions.login("demo@demo.com", "12345"));
  };

  return (
    <button className="nav-bar-button" onClick={handleClick}>
      Demo Login
    </button>
  );
};

export default DemoLogin;
