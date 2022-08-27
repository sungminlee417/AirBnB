import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

const SignupForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ firstName, lastName, email, password })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <div className="login-signup-form-container">
      <header className="login-signup-header">Sign Up</header>
      <form className="login-signup-form" onSubmit={handleSubmit}>
        <div className="input-fields">
          <input
            className="first-name-input-field input-field"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            value={firstName}
          ></input>{" "}
          <input
            className="last-name-input-field input-field"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            value={lastName}
          ></input>
          <input
            className="signup-email-input-field input-field"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            value={email}
          ></input>
          <input
            className="signup-password-input-field input-field"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            value={password}
          ></input>
          <input
            className="confirm-password-input-field input-field"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
          />
        </div>
        <ul className="errors">
          {errors.map((error, i) => {
            return (
              <div className="error" key={i}>
                <i class="fa-solid fa-circle-exclamation"></i>
                <li key={i}>{error}</li>
              </div>
            );
          })}
        </ul>
        <button className="signup-submit" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
