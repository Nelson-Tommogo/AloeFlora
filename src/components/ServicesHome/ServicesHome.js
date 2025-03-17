import React from "react";
import styles from "./ServicesHome.module.css";
import ServiceHome from "../ServiceHome/ServiceHome";
import data from "./data";

const ServicesHome = () => {
    return (
        <div className={`container ${styles.contain} overflow-hidden pb-4`}>
        
            <div>
                <p data-aos="slide-left" className={`mx-auto ${styles.subHeading}`}>
                    Experience the Power of Nature with AloeFlora
                </p>
            </div>

            <div className="row">
                {data &&
                    data.map((x) => (
                        <div key={x.id} className="col-lg-4 col-md-6">
                            <ServiceHome
                                heading={x.heading}
                                content={x.content}
                                to={x.to}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ServicesHome;
