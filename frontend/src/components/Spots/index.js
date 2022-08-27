import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";

const Spots = () => {
  const dispatch = useDispatch();
  const spots = Object.values(useSelector((state) => state.spots));

  useEffect(() => {
    dispatch(spotActions.loadAllSpotsThunk());
  }, []);

  return (
    <div>
      <ul>
        {spots.map((spot) => {
          return <li key={spot.id}>{spot.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Spots;
