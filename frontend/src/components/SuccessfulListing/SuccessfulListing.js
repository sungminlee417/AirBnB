import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as singleSpotActions from "../../store/singleSpot";

const SuccessfulListing = () => {
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spot);

  useEffect(() => {
    return () => dispatch(singleSpotActions.clearSpot());
  }, []);

  return <div>Congrats</div>;
};

export default SuccessfulListing;
