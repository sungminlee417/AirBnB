import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as spotsActions from "../../../../store/spots";
import "./EditSpot.css";

const EditSpot = ({ spot, setShowModal }) => {
  const dispatch = useDispatch();
  const {
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
  } = spot;
  const [editAddress, setEditAddress] = useState(address);
  const [editCity, setEditCity] = useState(city);
  const [editState, setEditState] = useState(state);
  const [editCountry, setEditCountry] = useState(country);
  const [editLat, setEditLat] = useState(lat);
  const [editLng, setEditLng] = useState(lng);
  const [editName, setEditName] = useState(name);
  const [editDescription, setEditDescription] = useState(description);
  const [editPrice, setEditPrice] = useState(price);
  const [editPreviewImage, setEditPreviewImage] = useState(previewImage);
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    setErrors([]);
    e.preventDefault();

    const spotEditObj = {
      address: editAddress,
      city: editCity,
      state: editState,
      country: editCountry,
      lat: editLat,
      lng: editLng,
      name: editName,
      description: editDescription,
      price: editPrice,
      previewImage: editPreviewImage,
    };

    dispatch(spotsActions.editSpotThunk(spot.id, spotEditObj))
      .then(() => setSubmitted(true))
      .catch(async (res) => {
        const data = await res.json();
        const errorArray = [];
        if (data.errors)
          Object.values(data.errors).forEach((error) => errorArray.push(error));
        setErrors(errorArray);
      });
  };

  useEffect(() => {
    if (submitted) {
      setShowModal(false);
    }
  }, [setShowModal, submitted]);

  return (
    <div id="edit-spot-container">
      <form id="edit-spot-form">
        <header id="edit-spot-header">Edit your listing</header>
        <div className="edit-spot-input-field-container">
          <label className="edit-spot-input-field-label" for="address">
            Address:{" "}
          </label>
          <input
            name="address"
            value={editAddress}
            className="edit-spot-form-input"
            onChange={(e) => setEditAddress(e.target.value)}
          />
        </div>
        <div className="edit-spot-input-field-container">
          <label className="edit-spot-input-field-label" for="city">
            City:{" "}
          </label>
          <input
            name="city"
            value={editCity}
            className="edit-spot-form-input"
            onChange={(e) => setEditCity(e.target.value)}
          />
        </div>
        <div className="edit-spot-input-field-container">
          <label className="edit-spot-input-field-label" for="state">
            State:{" "}
          </label>
          <input
            name="state"
            value={editState}
            className="edit-spot-form-input"
            onChange={(e) => setEditState(e.target.value)}
          />
        </div>
        <div className="edit-spot-input-field-container">
          <label className="edit-spot-input-field-label" for="country">
            Country:{" "}
          </label>
          <input
            name="country"
            value={editCountry}
            className="edit-spot-form-input"
            onChange={(e) => setEditCountry(e.target.value)}
          />
        </div>
        <div className="edit-spot-input-field-container">
          <label className="edit-spot-input-field-label" for="lat">
            Latitude:{" "}
          </label>
          <input
            name="lat"
            value={editLat}
            className="edit-spot-form-input"
            onChange={(e) => setEditLat(e.target.value)}
          />
        </div>
        <div className="edit-spot-input-field-container">
          <label className="edit-spot-input-field-label" for="lng">
            Longitude:{" "}
          </label>
          <input
            name="lng"
            value={editLng}
            className="edit-spot-form-input"
            onChange={(e) => setEditLng(e.target.value)}
          />
        </div>
        <div className="edit-spot-input-field-container">
          <label className="edit-spot-input-field-label" for="name">
            Name:{" "}
          </label>
          <input
            name="name"
            value={editName}
            className="edit-spot-form-input"
            onChange={(e) => setEditName(e.target.value)}
          />
        </div>
        <div className="edit-spot-input-field-container">
          <label className="edit-spot-input-field-label" for="description">
            Description:{" "}
          </label>
          <textarea
            name="description"
            value={editDescription}
            type="textarea"
            className="edit-spot-form-input"
            onChange={(e) => setEditDescription(e.target.value)}
          />
        </div>
        <div className="edit-spot-input-field-container">
          <label className="edit-spot-input-field-label" for="price">
            Price:{" "}
          </label>
          <input
            name="price"
            value={editPrice}
            className="edit-spot-form-input"
            onChange={(e) => setEditPrice(e.target.value)}
          />
        </div>
        <div className="edit-spot-input-field-container">
          <label className="edit-spot-input-field-label" for="previewImage">
            Image URL:{" "}
          </label>
          <input
            name="previewImage"
            value={editPreviewImage}
            className="edit-spot-form-input"
            onChange={(e) => setEditPreviewImage(e.target.value)}
          />
        </div>
        <ul className="edit-spot-errors">
          {Object.values(errors).map((error, i) => {
            return (
              <div key={i} className="edit-spot-error">
                <i className="fa-solid fa-circle-exclamation"></i>
                <li className="edit-spot-error-text">{error}</li>
              </div>
            );
          })}
        </ul>
      </form>
      <button onClick={onSubmit} id="edit-spot-form-button" type="submit">
        Submit edit
      </button>
    </div>
  );
};

export default EditSpot;
