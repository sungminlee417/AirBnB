import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as singleSpotActions from "../../store/singleSpot";
import "./CreateASpot.css";
import CreateASpotStepOne from "./CreateASpotStepOne";
import CreateASpotStepTwo from "./CreateASpotStepTwo";
import CreateASpotStepThree from "./CreateASpotStepThree";

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
  const [previewImages, setPreviewImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [page, setPage] = useState(1);

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

    for (let i = 0; i < previewImages.length; i++) {
      const previewImage = previewImages[i];
      spot.append("previewImages", previewImage);
    }

    await dispatch(singleSpotActions.createSpotThunk(spot))
      .then((spotData) =>
        history.push({
          pathname: "/successful-posting",
          state: {
            type: "listing",
            spot: spotData,
          },
        })
      )
      .catch(async (data) => {
        setErrors(data.errors);
      });
  };

  const onHome = () => {
    history.push("/");
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file)
      setPreviewImages((prevPreviewImages) => {
        return [...prevPreviewImages, file];
      });
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
          {page === 1 && (
            <CreateASpotStepOne
              address={address}
              city={city}
              state={state}
              country={country}
              lat={lat}
              lng={lng}
              setLat={setLat}
              setLng={setLng}
              setAddress={setAddress}
              setCity={setCity}
              setState={setState}
              setCountry={setCountry}
              setPage={setPage}
            />
          )}
          {page === 2 && (
            <CreateASpotStepTwo
              name={name}
              description={description}
              price={price}
              setName={setName}
              setDescription={setDescription}
              setPrice={setPrice}
              setPage={setPage}
            />
          )}
          {page === 3 && (
            <CreateASpotStepThree
              updateFile={updateFile}
              previewImages={previewImages}
              setPreviewImages={setPreviewImages}
              onSubmit={onSubmit}
              setPage={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateASpot;
