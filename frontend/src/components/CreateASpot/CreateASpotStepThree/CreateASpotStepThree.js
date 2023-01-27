import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./CreateASpotStepThree.css";

const CreateASpotStepThree = ({
  updateFile,
  onSubmit,
  setPage,
  previewImages,
  setPreviewImages,
}) => {
  const removeImage = (e, index) => {
    e.preventDefault();
    setPreviewImages((prevPreviewImages) => {
      const prevPreviewImagesCopy = [...prevPreviewImages];
      prevPreviewImagesCopy.splice(index, 1);
      return prevPreviewImagesCopy;
    });
  };

  return (
    <section className="create-spot-form-step-three-section">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination]}
        style={{
          "--swiper-pagination-color": "rgb(255, 21, 99)",
          "--swiper-pagination-bullet-inactive-color": "#999999",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": ".6rem",
          "--swiper-pagination-bullet-horizontal-gap": ".2rem",
        }}
        className="mySwiper create-spot-image-swiper"
      >
        {previewImages.map((previewImage, i) => {
          return (
            <SwiperSlide className="create-spot-image-swiper-slide">
              <img
                className="create-spot-image-swiper-image"
                src={URL.createObjectURL(previewImage)}
              />
              <button
                className="create-spot-image-remove"
                onClick={(e) => removeImage(e, i)}
              >
                <i className="fa-solid fa-xmark create-spot-image-remove-icon"></i>
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="create-spot-form-step-three-submit-back">
        <label
          className="create-spot-form-button-label"
          htmlFor="create-spot-form-file"
        >
          {`Add ${
            Object.values(previewImages).length >= 1 ? "more photos" : "photos"
          }`}
        </label>
        <input
          id="create-spot-form-file"
          type="file"
          className="create-spot-form-file-input"
          onChange={updateFile}
        />
        <button
          className="create-spot-form-button"
          type="submit"
          onClick={onSubmit}
        >
          Submit Listing
        </button>
      </div>
      <button
        onClick={() => setPage(2)}
        className="create-spot-form-step-back-button"
      >
        Back
      </button>
    </section>
  );
};

export default CreateASpotStepThree;
