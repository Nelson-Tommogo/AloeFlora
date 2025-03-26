import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./Banner.module.css";

const images = [
  {
    src: require("../../assets/_MG_9273.jpg"),
    alt: "Toilet Cleaner",
    text: "Powerful Yet Gentle Toilet Care",
    buttonLabel: "CLEANER",
    buttonLink: "/shop"
  },
  {
    src: require("../../assets/_MG_9326.jpg"),
    alt: "Image 2",
    text: "AloeFlora Essentials: Pure Nature, Premium Care",
    buttonLabel: "COLLECTIONS",
    buttonLink: "/Shop",
  },
  {
    src: require("../../assets/_MG_9204.jpg"),
    alt: "Image 2",
    text: "Nature’s Best for Your Skin & Wellness",
    buttonLabel: "COLLECTIONS",
    buttonLink: "/Shop",
  },
  {
    src: require("../../assets/_MG_9332.jpg"),
    alt: "Image 2",
    text: "Instant Relief for Skin & Scalp",
    buttonLabel: "COLLECTIONS",
    buttonLink: "/Shop",
  },
];

const PreviousArrow = ({ onClick }) => (
  <div className={styles.prevArrow} onClick={onClick}>
    <FontAwesomeIcon icon={faChevronLeft} size="2x" />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div className={styles.nextArrow} onClick={onClick}>
    <FontAwesomeIcon icon={faChevronRight} size="2x" />
  </div>
);

const Banner = () => {
  const navigate = useNavigate();

  const handleButtonClick = (link) => {
    navigate(link);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: () => {}, // Removed setCurrentSlide to avoid the warning
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className={styles.bannerContainer}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className={styles.slide}>
            <img src={image.src} alt={image.alt} className={styles.slideImage} />
            <div className={styles.overlay}>
              <p className={styles.text}>{image.text}</p>
              <button
                className={`btn custom_btn ${styles.btn}`}
                onClick={() => handleButtonClick(image.buttonLink)}
              >
                {image.buttonLabel}
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
