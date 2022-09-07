import DeleteSpotModal from "../DeleteSpotModal/DeleteSpotModal";
import EditSpotModal from "../EditSpotModal/EditSpotModal";
import "./UserSpotsItem.css";

const UserSpotsItem = ({ spot }) => {
  return (
    <>
      <li id="user-spots-item">
        <img id="user-spots-item-img" src={spot.previewImage} alt={spot.name} />
        <div id="user-spots-details">
          <div id="user-spot-details">
            <div id="user-spot-name">{spot.name}</div>
            <div className="user-spot-address">{spot.address}</div>
            <div className="user-spot-address">{spot.city},</div>
            <div className="user-spot-address">{spot.state}</div>
          </div>
          <div className="user-spot-detail-check-date">
            <div className="user-spot-check-bold">Created At</div>
            <div className="user-spot-check-light">
              {spot.createdAt.split("T")[0]}
            </div>
          </div>
          <div className="user-spot-detail-check-date">
            <div className="user-spot-check-bold">Updated At</div>
            <div className="user-spot-check-light">
              {spot.updatedAt.split("T")[0]}
            </div>
          </div>
          <div className="user-spot-edit-container">
            <EditSpotModal spot={spot} />
            <DeleteSpotModal spot={spot} />
          </div>
        </div>
      </li>
      <div className="user-spots-items-divider"></div>
    </>
  );
};

export default UserSpotsItem;
