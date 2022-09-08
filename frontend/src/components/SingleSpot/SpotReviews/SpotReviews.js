import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as reviewsActions from "../../../store/reviews";

const SpotReviews = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const reviews = Object.values(useSelector((state) => state.reviews));

  useEffect(() => {
    dispatch(reviewsActions.loadSpotReviewsThunk(spotId));
  }, [dispatch, spotId]);

  if (!reviews.length) return null;

  return (
    <div>
      <header>
        <i className="fa-solid fa-star"></i>
        <span>{reviews.length}</span>
      </header>
      <ul>
        {reviews.map((review) => {
          return <li>hello</li>;
        })}
      </ul>
    </div>
  );
};

export default SpotReviews;
