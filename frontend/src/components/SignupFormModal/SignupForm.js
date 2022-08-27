import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

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
    <div className="signup-form-box">
      <form className="signup-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, i) => {
            return <li key={i}>{error}</li>;
          })}
        </ul>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          value={firstName}
          required
        ></input>{" "}
        <input
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          value={lastName}
          required
        ></input>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
          required
        ></input>
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          value={password}
          required
        ></input>
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
