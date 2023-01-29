import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from "../../../store/spots";
import UserSpotsItem from "./UserSpotsItem";
import "./UserSpots.css";

const UserSpots = () => {
  const dispatch = useDispatch();
  const spots = Object.values(useSelector((state) => state.spots));

  useEffect(() => {
    dispatch(spotsActions.loadYourSpotsThunk());
    return () => dispatch(spotsActions.clearSpots());
  }, [dispatch]);

  return (
    <div className="user-spots-section">
      {spots.length > 0 && (
        <ul className="user-spots-list">
          {spots.map((spot, i) => {
            return <UserSpotsItem key={i} spot={spot} />;
          })}
        </ul>
      )}
      {!spots.length && (
        <div id="no-spots-available">You currently have no listings</div>
      )}
    </div>
  );
};

export default UserSpots;
