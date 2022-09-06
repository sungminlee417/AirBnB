import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as singleSpotActions from "../../store/singleSpot";
import "./CreateASpot.css";

const CreateASpot = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState([]);
  const spot = useSelector((state) => state.spot);

  if (Object.keys(spot).length) {
    history.push("/successful-listing");
  }

  const onSubmit = (e) => {
    setErrors([]);
    e.preventDefault();

    const spot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage,
    };
    dispatch(singleSpotActions.createSpotThunk(spot)).catch(async (res) => {
      const data = await res.json();
      const errorArray = [];
      if (data.errors)
        Object.values(data.errors).forEach((error) => errorArray.push(error));
      setErrors(errorArray);
    });
  };

  const onHome = () => {
    history.push("/");
  };

  return (
    <div id="create-spot-container">
      <div id="create-spot-left-side-container">
        <div id="create-spot-left-side-container-text">
          Please fill out this listing form.
        </div>
      </div>
      <div id="create-spot-right-side-container">
        <button onClick={onHome} id="create-spot-back-to-home-button">
          Back to Home
        </button>
        <div id="create-spot-right-side-form-container">
          <form onSubmit={onSubmit} id="create-spot-form">
            <input
              value={address}
              className="create-spot-form-input"
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              value={city}
              className="create-spot-form-input"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              value={state}
              className="create-spot-form-input"
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
            />
            <input
              value={country}
              className="create-spot-form-input"
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
            />
            <input
              value={lat}
              className="create-spot-form-input"
              placeholder="Latitude"
              onChange={(e) => setLat(e.target.value)}
            />
            <input
              value={lng}
              className="create-spot-form-input"
              placeholder="Longitude"
              onChange={(e) => setLng(e.target.value)}
            />
            <input
              value={name}
              className="create-spot-form-input"
              placeholder="Listing Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              value={description}
              type="textarea"
              className="create-spot-form-input"
              placeholder="Listing Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              value={price}
              className="create-spot-form-input"
              placeholder="Listing Price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              value={previewImage}
              className="create-spot-form-input"
              placeholder="Image URL"
              onChange={(e) => setPreviewImage(e.target.value)}
            />
            <ul className="create-spot-errors">
              {Object.values(errors).map((error, i) => {
                return (
                  <div key={i} className="create-spot-error">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <li className="create-spot-error-text">{error}</li>
                  </div>
                );
              })}
            </ul>
            <button className="create-spot-form-button" type="submit">
              Submit Listing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateASpot;
