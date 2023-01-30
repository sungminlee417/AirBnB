import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as spotsActions from "../../../../store/spots";
import { getKey } from "../../../../store/maps";
import Geocode from "react-geocode";
import "./EditSpot.css";

const EditSpot = ({ spot, setShowModal }) => {
  const dispatch = useDispatch();
  const { address, city, state, country, name, description, price } = spot;
  const [editAddress, setEditAddress] = useState(address);
  const [editCity, setEditCity] = useState(city);
  const [editState, setEditState] = useState(state);
  const [editCountry, setEditCountry] = useState(country);
  const [editLat, setEditLat] = useState("");
  const [editLng, setEditLng] = useState("");
  const [editName, setEditName] = useState(name);
  const [editDescription, setEditDescription] = useState(description);
  const [editPrice, setEditPrice] = useState(price);
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
    };

    const errorsObj = {};
    if (!editAddress) errorsObj["address"] = "Please provide an address";
    if (!editCity) errorsObj["city"] = "Please provide a city";
    if (!editState) errorsObj["state"] = "Please provide a state";
    if (!editCountry) errorsObj["country"] = "Please provide a country";
    if (!editLat || !editLng)
      errorsObj["latlng"] = "Please provide a valid address";
    if (!editName) errorsObj["name"] = "Please provide a name";
    if (editName.length > 50)
      errorsObj["name"] =
        "Please provide a name shorter than or equal to 50 characters";
    if (!editDescription)
      errorsObj["description"] = "Please provide a description";
    if (!Number(editPrice)) errorsObj["price"] = "Please provide a valid price";
    if (!editPrice) errorsObj["price"] = "Please provide a price";

    if (Object.values(errorsObj).length) {
      setEditLat("");
      setEditLng("");
    } else {
      dispatch(spotsActions.editSpotThunk(spot.id, spotEditObj))
        .then(() => setSubmitted(true))
        .catch(async (res) => {
          const data = await res.json();
          const errorArray = [];
          if (data.errors)
            Object.values(data.errors).forEach((error) =>
              errorArray.push(error)
            );
          setErrors(errorArray);
        });
    }

    setErrors(errorsObj);
  };

  useEffect(() => {
    if (submitted) {
      setShowModal(false);
    }
  }, [setShowModal, submitted]);

  useEffect(() => {
    dispatch(getKey()).then((key) => {
      Geocode.setApiKey(key);
      Geocode.setLocationType("ROOFTOP");
    });
  }, []);

  useEffect(() => {
    Geocode.fromAddress(
      `${editAddress} ${editCity} ${editState}, ${editCountry}`
    ).then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setEditLat(lat);
      setEditLng(lng);
    });
  }, [address, city, state, country]);

  return (
    <div id="edit-spot-container">
      <header id="edit-spot-header">Edit your listing</header>
      <form id="edit-spot-form">
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
          {errors.latlng ? (
            <div className="create-spot-form-error-container">
              <i className="fa-solid fa-circle-exclamation create-spot-form-error-icon"></i>
              <div className="create-spot-form-error-text">{errors.latlng}</div>
            </div>
          ) : (
            errors.address && (
              <div className="create-spot-form-error-container">
                <i className="fa-solid fa-circle-exclamation create-spot-form-error-icon"></i>
                <div className="create-spot-form-error-text">
                  {errors.address}
                </div>
              </div>
            )
          )}
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
          {errors.city && (
            <div className="create-spot-form-error-container">
              <i className="fa-solid fa-circle-exclamation create-spot-form-error-icon"></i>
              <div className="create-spot-form-error-text">{errors.city}</div>
            </div>
          )}
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
          {errors.state && (
            <div className="create-spot-form-error-container">
              <i className="fa-solid fa-circle-exclamation create-spot-form-error-icon"></i>
              <div className="create-spot-form-error-text">{errors.state}</div>
            </div>
          )}
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
          {errors.country && (
            <div className="create-spot-form-error-container">
              <i className="fa-solid fa-circle-exclamation create-spot-form-error-icon"></i>
              <div className="create-spot-form-error-text">
                {errors.country}
              </div>
            </div>
          )}
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
          {errors.name && (
            <div className="create-spot-form-error-container">
              <i className="fa-solid fa-circle-exclamation create-spot-form-error-icon"></i>
              <div className="create-spot-form-error-text">{errors.name}</div>
            </div>
          )}
        </div>
        <div className="edit-spot-input-field-container  edit-spot-form-input-field-description">
          <label className="edit-spot-input-field-label" for="description">
            Description:{" "}
          </label>
          <textarea
            name="description"
            value={editDescription}
            type="textarea"
            className="edit-spot-form-input edit-spot-form-input-description"
            onChange={(e) => setEditDescription(e.target.value)}
          />
          {errors.description && (
            <div className="create-spot-form-error-container">
              <i className="fa-solid fa-circle-exclamation create-spot-form-error-icon"></i>
              <div className="create-spot-form-error-text">
                {errors.description}
              </div>
            </div>
          )}
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
          {errors.price && (
            <div className="create-spot-form-error-container">
              <i className="fa-solid fa-circle-exclamation create-spot-form-error-icon"></i>
              <div className="create-spot-form-error-text">{errors.price}</div>
            </div>
          )}
        </div>
      </form>
      <button onClick={onSubmit} id="edit-spot-form-button" type="submit">
        Submit edit
      </button>
    </div>
  );
};

export default EditSpot;
