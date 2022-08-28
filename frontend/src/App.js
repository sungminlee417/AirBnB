import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import AccountDetails from "./components/AccountDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <div id="airbnb-app">
      <Navigation isLoaded={isLoaded} />
      <div className="component-break-line"></div>
      <Switch>
        <Route exact path="/">
          {isLoaded && <Spots />}
        </Route>
        <Route path="/account-details">
          {user && <AccountDetails user={user} />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
