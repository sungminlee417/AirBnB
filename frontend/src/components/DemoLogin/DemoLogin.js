import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

const DemoLogin = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(sessionActions.login("demo@demo.com", "12345"));
  };

  return (
    <button className="profile-button-link" onClick={handleClick}>
      Demo Login
    </button>
  );
};

export default DemoLogin;
