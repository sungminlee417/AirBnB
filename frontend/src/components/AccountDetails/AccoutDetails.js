import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import "./AccountDetails.css";
import UserBookings from "./UserBookings";
import UserSpots from "./UserSpots";

const AccountDetails = () => {
  const user = useSelector((state) => state.session.user);
  const match = useRouteMatch();

  useEffect(() => {
    if (!user) return <Redirect to="/" />;
  }, [user]);

  return (
    <div className="account-details">
      {user && (
        <div className="account-details-container">
          <div className="account-details-header">
            <h1>Account</h1>
            <p>
              <strong>
                {user.firstName} {user.lastName},{" "}
              </strong>
              {user.email}
            </p>
          </div>
          <div className="account-detail-links">
            <NavLink to={`${match.url}/spots`}>Your Spots</NavLink>
            <NavLink to={`${match.url}/bookings`}>Your Bookings</NavLink>
          </div>
          <Switch>
            <Route path={`${match.url}/spots`}>
              <UserSpots />
            </Route>
            <Route path={`${match.url}/bookings`}>
              <UserBookings />
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
};

export default AccountDetails;
