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
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    setErrors([]);
    e.preventDefault();

    const spot = new FormData();

    spot.append("address", address);
    spot.append("city", city);
    spot.append("state", state);
    spot.append("country", country);
    spot.append("lat", lat);
    spot.append("lng", lng);
    spot.append("name", name);
    spot.append("description", description);
    spot.append("price", price);

    if (previewImage) spot.append("previewImage", previewImage);

    await dispatch(singleSpotActions.createSpotThunk(spot))
      .then(() =>
        history.push({
          pathname: "/successful-posting",
          state: {
            type: "listing",
          },
        })
      )
      .catch(async (res) => {
        const data = await res.json();
        const errorArray = [];
        if (data && data.errors) {
          Object.values(data.errors).forEach((error) => errorArray.push(error));
          setErrors(errorArray);
        }
      });
  };

  const onHome = () => {
    history.push("/");
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setPreviewImage(file);
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
              type="file"
              className="create-spot-form-input"
              // placeholder="Image URL"
              onChange={updateFile}
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
