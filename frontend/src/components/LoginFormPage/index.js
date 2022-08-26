import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login(email, password)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="login-form-box">
      <header>Log in or sign up</header>
      <form className="login-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, i) => {
            return <li key={i}>{error}</li>;
          })}
        </ul>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
        ></input>
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          value={password}
        ></input>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginFormPage;
