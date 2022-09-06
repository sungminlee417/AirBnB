import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as spotActions from "../../store/spots";
import "./Spots.css";

const Spots = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);

  useEffect(() => {
    dispatch(spotActions.loadAllSpotsThunk());
    return () => dispatch(spotActions.clearSpots());
  }, [dispatch]);

  return (
    <div className="body-margin">
      <ul id="all-spots-preview">
        {Object.keys(spots).map((spotId) => {
          return (
            <NavLink
              to={`/spots/${spotId}`}
              className="spot-preview"
              key={spotId}
            >
              <img
                className="spot-img"
                src={spots[spotId].previewImage}
                alt={spots[spotId].name}
              />
              <div className="spot-details-container">
                <div className="spot-details">
                  <strong>
                    <p className="spot-location">{`${spots[spotId].city}, ${spots[spotId].state}`}</p>
                  </strong>
                  {spots[spotId].name && (
                    <p className="spot-name">{spots[spotId].name}</p>
                  )}
                </div>
                <div className="spot-price">
                  <strong>{`$${spots[spotId].price}`}</strong>
                </div>
              </div>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};

export default Spots;
