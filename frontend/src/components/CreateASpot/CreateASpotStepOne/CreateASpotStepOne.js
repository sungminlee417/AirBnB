import { useEffect, useState } from "react";
import { getKey } from "../../../store/maps";
import Geocode from "react-geocode";
import "./CreateASpotStepOne.css";
import { useDispatch } from "react-redux";

const CreateASpotStepOne = ({
  setPage,
  address,
  lat,
  lng,
  setLat,
  setLng,
  city,
  state,
  country,
  setAddress,
  setCity,
  setCountry,
  setState,
}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getKey()).then((key) => {
      Geocode.setApiKey(key);
      Geocode.setLocationType("ROOFTOP");
    });
  }, []);

  useEffect(() => {
    Geocode.fromAddress(`${address} ${city} ${state}, ${country}`).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
      }
    );
  }, [address, city, state, country]);

  const goNext = () => {
    const errorsObj = {};
    if (!address) errorsObj["address"] = "Please provide an address";
    if (!city) errorsObj["city"] = "Please provide a city";
    if (!state) errorsObj["state"] = "Please provide a state";
    if (!country) errorsObj["country"] = "Please provide a country";
    if (!lat || !lng) errorsObj["latlng"] = "Please provide a valid address";

    if (Object.values(errorsObj).length) {
      setLat("");
      setLng("");
    }
    setErrors(errorsObj);

    if (!Object.values(errorsObj).length) {
      setPage(2);
    }
  };

  return (
    <section className="create-spot-form-step-section">
      <div className="create-spot-form">
        <div className="create-spot-form-input-container">
          <input
            value={address}
            className="create-spot-form-input"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
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
        <div className="create-spot-form-input-container">
          <input
            value={city}
            className="create-spot-form-input"
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />
          {errors.city && (
            <div className="create-spot-form-error-container">
              <i className="fa-solid fa-circle-exclamation create-spot-form-error-icon"></i>
              <div className="create-spot-form-error-text">{errors.city}</div>
            </div>
          )}
        </div>
        <div className="create-spot-form-input-container">
          <input
            value={state}
            className="create-spot-form-input"
            placeholder="State"
            onChange={(e) => setState(e.target.value)}
          />
          {errors.state && (
            <div className="create-spot-form-error-container">
              <i className="fa-solid fa-circle-exclamation create-spot-form-error-icon"></i>
              <div className="create-spot-form-error-text">{errors.state}</div>
            </div>
          )}
        </div>
        <div className="create-spot-form-input-container">
          <input
            value={country}
            className="create-spot-form-input"
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
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
      </div>
      <button className="create-spot-form-next-button" onClick={goNext}>
        Next
      </button>
    </section>
  );
};

export default CreateASpotStepOne;
