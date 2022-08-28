import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import "./Spots.css";

const Spots = () => {
  const dispatch = useDispatch();
  const spots = Object.values(useSelector((state) => state.spots));

  useEffect(() => {
    dispatch(spotActions.loadAllSpotsThunk());
  }, [dispatch]);

  return (
    <div className="body-margin">
      <ul id="all-spots-preview">
        {spots.map((spot) => {
          return (
            <div className="spot-container" key={spot.id}>
              <img
                className="spot-img"
                src={spot.previewImage}
                alt={spot.name}
              />
              <div className="spot-details-container">
                <div className="spot-details">
                  <strong>
                    <p className="spot-location">{`${spot.city}, ${spot.state}`}</p>
                  </strong>
                  {spot.name && <p className="spot-name">{spot.name}</p>}
                </div>
                <div className="spot-price">
                  <strong>{`$${spot.price}`}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Spots;
