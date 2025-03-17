import React from "react";
import "./style.css";
import styles from "./Testimonial.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { fakeData } from "./fakeData";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing custom icons

function Testimonial() {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2,
            slidesToSlide: 2,
        },
        tablet: {
            breakpoint: { max: 1024, min: 560 },
            items: 1,
            slidesToSlide: 1,
        },
        mobile: {
            breakpoint: { max: 560, min: 0 },
            items: 1,
            slidesToSlide: 1,
        },
    };

    return (
        <div className={styles.mainContainer}>
            <div className={`${styles.container} overflow-hidden`}>
                <p data-aos="slide-left" className={styles.subHead}>
                    Testimonials
                </p>

                <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={true}
                    responsive={responsive}
                    ssr={true}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={4000}
                    keyBoardControl={true}
                    customTransition="transform 400ms ease-in-out"
                    transitionDuration={500}
                    containerClass={`carousel-container`}
                    dotListClass={styles.dotList}
                    itemClass={`carousel-item-padding-40-px d-flex align-items-stretch mt-3 px-2`}
                    renderButtonGroupOutside={true}
                    arrows={false}
                    customButtonGroup={<ButtonGroup />}
                >
                    {fakeData.map((x) => (
                        <div className={styles.box} key={x.id}>
                            <div className="row">
                                <div className="col-md-3 col-sm-3">
                                    <img
                                        src={x.img}
                                        alt={x.name}
                                        className={styles.img}
                                    />
                                </div>
                                <div className="col-md-9 col-sm-9">
                                    <p className={styles.name}>{x.name}</p>
                                    <p className={styles.profession}>
                                        {x.profession}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <p className={styles.msg}>"{x.message}"</p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

// ✅ Custom Navigation Arrows
const ButtonGroup = ({ next, previous }) => {
    return (
        <div className={styles.buttonGroup}>
            <button onClick={previous} className={styles.arrow}>
                <FaArrowLeft />
            </button>
            <button onClick={next} className={styles.arrow}>
                <FaArrowRight />
            </button>
        </div>
    );
};

export default Testimonial;
