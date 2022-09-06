import { useDispatch } from "react-redux";
import * as spotsActions from "../../../../store/spots";
import "./DeleteSpot.css";

const DeleteSpot = ({ spot, setShowModal }) => {
  const dispatch = useDispatch();
  const date = new Date(spot.createdAt);
  const spotCreatedAtDateArr = date[Symbol.toPrimitive]("string")
    .split(" ")
    .splice(1, 3);
  const spotCreatedAtDate = `${
    spotCreatedAtDateArr[0] + " " + spotCreatedAtDateArr[1]
  }, ${spotCreatedAtDateArr[2]}`;

  const onDelete = () => {
    dispatch(spotsActions.deleteASpotThunk(spot.id));
    setShowModal(false);
  };

  return (
    <div id="delete-spot-container">
      <header id="delete-spot-header">Permanently delete this listing?</header>
      <div id="delete-spot-card-container">
        <img
          id="delete-spot-card-image"
          src={spot.previewImage}
          alt={spot.name}
        />
        <div id="delete-spot-card-container-details">
          <div id="delete-spot-card-container-spot-name">{spot.name}</div>
          <div id="delete-spot-card-container-created-date">
            Created {spotCreatedAtDate}
          </div>
        </div>
      </div>
      <button id="delete-spot-button" onClick={onDelete}>
        Delete listing
      </button>
    </div>
  );
};

export default DeleteSpot;
