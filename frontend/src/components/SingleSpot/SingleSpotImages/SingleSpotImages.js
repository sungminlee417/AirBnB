import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./SingleSpotImages.css";

const SingleSpotImages = ({ previewImage, images, onClose }) => {
  return (
    <section className="single-spot-images-section">
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
        className="mySwiper single-spot-images-swiper"
      >
        <SwiperSlide className="single-spot-images-swiper-slide">
          <img className="single-spot-images-swiper-image" src={previewImage} />
        </SwiperSlide>
        {Object.values(images).map((image, i) => {
          return (
            <SwiperSlide className="single-spot-images-swiper-slide">
              <img
                className="single-spot-images-swiper-image"
                src={image.url}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button onClick={onClose} className="single-spot-images-close-button">
        <i className="fa-solid fa-xmark single-spot-images-close-button-icon"></i>
      </button>
    </section>
  );
};

export default SingleSpotImages;
