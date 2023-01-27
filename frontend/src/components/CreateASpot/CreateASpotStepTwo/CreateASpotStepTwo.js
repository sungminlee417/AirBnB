import { useState } from "react";
import "./CreateASpotStepTwo.css";

const CreateASpotStepTwo = ({
  name,
  description,
  price,
  setName,
  setDescription,
  setPrice,
  setPage,
}) => {
  const [errors, setErrors] = useState({});

  const goNext = () => {
    const errorsObj = {};

    if (!name) errorsObj["name"] = "Please provide a name";
    if (name.length > 50)
      errorsObj["name"] =
        "Please provide a name shorter than or equal to 50 characters";
    if (!description) errorsObj["description"] = "Please provide a description";
    if (!Number(price)) errorsObj["price"] = "Please provide a valid price";
    if (!price) errorsObj["price"] = "Please provide a price";

    setErrors(errorsObj);

    if (!Object.values(errorsObj).length) {
      setPage(3);
    }
  };
  return (
    <section className="create-spot-form-step-section">
      <div className="create-spot-form">
        <div className="create-spot-form-input-container">
          <input
            value={name}
            className="create-spot-form-input"
            placeholder="Listing Name"
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <div className="create-spot-form-error-container">
              <i className="fa-solid fa-circle-exclamation create-spot-form-error-icon"></i>
              <div className="create-spot-form-error-text">{errors.name}</div>
            </div>
          )}
        </div>
        <div className="create-spot-form-input-container">
          <input
            value={description}
            type="textarea"
            className="create-spot-form-input description"
            placeholder="Listing Description"
            onChange={(e) => setDescription(e.target.value)}
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
        <div className="create-spot-form-input-container">
          <input
            value={price}
            className="create-spot-form-input"
            placeholder="Listing Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && (
            <div className="create-spot-form-error-container">
              <i className="fa-solid fa-circle-exclamation create-spot-form-error-icon"></i>
              <div className="create-spot-form-error-text">{errors.price}</div>
            </div>
          )}
        </div>
      </div>
      <button className="create-spot-form-next-button" onClick={goNext}>
        Next
      </button>
      <button
        onClick={() => setPage(1)}
        className="create-spot-form-step-back-button"
      >
        Back
      </button>
    </section>
  );
};

export default CreateASpotStepTwo;
