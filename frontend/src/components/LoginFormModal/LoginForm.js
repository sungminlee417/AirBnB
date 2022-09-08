import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";

const LoginForm = ({ type }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login(email, password))
      .then(() => {
        if (type === "host-link") history.push("/host");
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        if (data.statusCode === 401) setErrors([data.message]);
      });
  };

  return (
    <div className="login-signup-form-container">
      <header className="login-signup-header">Log in</header>
      <form className="login-signup-form" onSubmit={handleSubmit}>
        <div className="login-signup-input-fields">
          <input
            className="email-input-field input-field"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            value={email}
          ></input>
          <input
            className="password-input-field input-field"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            value={password}
          ></input>
        </div>
        <ul className="errors">
          {errors.map((error, i) => {
            return (
              <div key={i} className="error">
                <i className="fa-solid fa-circle-exclamation"></i>
                <li>{error}</li>
              </div>
            );
          })}
        </ul>
        <button className="login-submit" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
