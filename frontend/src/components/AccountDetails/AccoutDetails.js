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
    <>
      {user && (
        <div id="account-details">
          <div>
            <section id="account-details-sidebar">
              <header id="account-details-header">
                <h1 className="account-sidebar-header">Account</h1>
                <p className="account-sidebar-sub-header">
                  <strong className="account-sidebar-sub-header">
                    {user.firstName} {user.lastName},{" "}
                  </strong>
                  {user.email}
                </p>
              </header>
              <div className="account-detail-links">
                <NavLink
                  className="account-detail-link"
                  to={`${match.url}/spots`}
                >
                  Your Listings
                </NavLink>
                <NavLink
                  className="account-detail-link"
                  to={`${match.url}/bookings`}
                >
                  Your Bookings
                </NavLink>
              </div>
            </section>
          </div>
          <div className="account-details-divider"></div>
          <section id="account-details-content-container">
            <Switch>
              <Route path={`${match.url}/spots`}>
                <UserSpots />
              </Route>
              <Route path={`${match.url}/bookings`}>
                <UserBookings />
              </Route>
            </Switch>
          </section>
        </div>
      )}
    </>
  );
};

export default AccountDetails;
