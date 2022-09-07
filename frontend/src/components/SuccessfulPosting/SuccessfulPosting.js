import { useHistory, useLocation } from "react-router-dom";
import "./SuccessfulPosting.css";

const SuccessfulPosting = () => {
  const history = useHistory();
  const location = useLocation();
  const spot = location.state.spot;
  const type = location.state.type;
  const startDate = location.state.startDate;
  const endDate = location.state.endDate;

  const backToHome = () => {
    history.push("/");
  };

  let content;

  if (type === "booking") {
    content = (
      <div className="successful-posting-container">
        <div className="successful-posting-container-header">
          <i className="fa-solid fa-check"></i>
          <header className="successful-posting-header">
            Congratulations! You have successfully booked a listing for{" "}
            {spot.name}
          </header>
        </div>
        <div className="successful-posting-info">
          <img
            className="successful-posting-image"
            src={spot.previewImage}
            alt={spot.name}
          />
          <div>
            <p className="successful-posting-info-bold">Check-In</p>
            <p>{startDate}</p>
          </div>
          <div>
            <p className="successful-posting-info-bold">Checkout</p>
            <p>{endDate}</p>
          </div>
        </div>
      </div>
    );
  } else if (type === "listing") {
    content = (
      <div className="successful-posting-container">
        <div className="successful-posting-container-header">
          <i className="fa-solid fa-check"></i>
          <header className="successful-posting-header">
            Congratulations! You have successfully created a listing for{" "}
            {spot.name}
          </header>
        </div>
        <div className="successful-posting-info">
          <img
            className="successful-posting-image"
            src={spot.previewImage}
            alt={spot.name}
          />
          <div className="successful-posting-info-container">
            <p className="successful-posting-info-bold">Address</p>
            <p>{spot.address}</p>
            <p>{spot.city}</p>
            <p>{spot.state}</p>
          </div>
          <div className="successful-posting-info-container">
            <p className="successful-posting-info-bold">Price</p>
            <p>{spot.price}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="successful-posting">
      <>
        {content}
        <button id="successful-posting-home-button" onClick={backToHome}>
          Back to Home
        </button>
      </>
    </div>
  );
};

export default SuccessfulPosting;
