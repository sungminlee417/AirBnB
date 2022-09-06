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

  const date = new Date();
  const year = date.getFullYear();
  const month =
    (date.getMonth() + 1).toString().length === 1
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const day = date.getDate();

  const today = `${year}-${month}-${day}`;

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

    dispatch(spotsActions.editSpotThunk(spot.id, spotEditObj)).catch(
      async (res) => {
        const data = await res.json();
        const errorArray = [];
        if (data.errors)
          Object.values(data.errors).forEach((error) => errorArray.push(error));
        setErrors(errorArray);
      }
    );

    if (errors.length === 0) {
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (submitted) {
      setShowModal(false);
    }
  }, [submitted]);

  return (
    <div id="edit-booking-container">
      <form onSubmit={onSubmit} id="edit-spot-form">
        <input
          value={editAddress}
          className="edit-spot-form-input"
          placeholder="Address"
          onChange={(e) => setEditAddress(e.target.value)}
        />
        <input
          value={editCity}
          className="edit-spot-form-input"
          placeholder="City"
          onChange={(e) => setEditCity(e.target.value)}
        />
        <input
          value={editState}
          className="edit-spot-form-input"
          placeholder="State"
          onChange={(e) => setEditState(e.target.value)}
        />
        <input
          value={editCountry}
          className="edit-spot-form-input"
          placeholder="Country"
          onChange={(e) => setEditCountry(e.target.value)}
        />
        <input
          value={editLat}
          className="edit-spot-form-input"
          placeholder="Latitude"
          onChange={(e) => setEditLat(e.target.value)}
        />
        <input
          value={editLng}
          className="edit-spot-form-input"
          placeholder="Longitude"
          onChange={(e) => setEditLng(e.target.value)}
        />
        <input
          value={editName}
          className="edit-spot-form-input"
          placeholder="Listing Name"
          onChange={(e) => setEditName(e.target.value)}
        />
        <input
          value={editDescription}
          type="textarea"
          className="edit-spot-form-input"
          placeholder="Listing Description"
          onChange={(e) => setEditDescription(e.target.value)}
        />
        <input
          value={editPrice}
          className="edit-spot-form-input"
          placeholder="Listing Price"
          onChange={(e) => setEditPrice(e.target.value)}
        />
        <input
          value={editPreviewImage}
          className="edit-spot-form-input"
          placeholder="Image URL"
          onChange={(e) => setEditPreviewImage(e.target.value)}
        />
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
        <button className="edit-spot-form-button" type="submit">
          Submit edit
        </button>
      </form>
    </div>
  );
};

export default EditSpot;
