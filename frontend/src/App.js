import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import AccountDetails from "./components/AccountDetails";
import SingleSpot from "./components/SingleSpot";
import SuccessfulPosting from "./components/SuccessfulPosting";
import CreateASpot from "./components/CreateASpot";

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
      <Switch>
        <Route exact path="/host">
          <CreateASpot />
        </Route>
        <Route path="/">
          <Navigation isLoaded={isLoaded} />
          <Switch>
            <Route exact path="/">
              <Spots />
            </Route>
            <Route path="/account-details">
              {user && isLoaded && <AccountDetails user={user} />}
            </Route>
            <Route path="/spots/:spotId">{<SingleSpot />}</Route>
            <Route path="/successful-posting">
              <SuccessfulPosting />
            </Route>
          </Switch>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
