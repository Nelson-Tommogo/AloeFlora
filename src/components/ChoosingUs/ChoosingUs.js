import React from "react";
import styles from "./ChoosingUs.module.css";

const ChoosingUs = () => {
    return (
        <div className={styles.choosingUsSection}>
            <div className="container overflow-hidden">
                <p data-aos="slide-right" data-aos-offset="220" className={styles.heading}>
                    Why Choose AloeFlora?
                </p>
                <div className={`row ${styles.sub}`}>
                    
                    {/* Naturally Formulated */}
                    <div data-aos="fade-right" className={`col-md-4 text-center ${styles.choiceContainer}`}>
                        <div className={styles.choiceBox}>
                            <p className={styles.logo_head}>Naturally Formulated</p>
                            <p className={styles.logo_text}>
                                Our products are crafted with natural ingredients to ensure safety, effectiveness, and a healthier lifestyle.
                            </p>
                        </div>
                    </div>

                    {/* Superior Quality */}
                    <div data-aos="fade" className={`col-md-4 text-center ${styles.choiceContainer}`}>
                        <div className={styles.choiceBox}>
                            <p className={styles.logo_head}>Superior Quality</p>
                            <p className={styles.logo_text}>
                                We take pride in producing high-quality bleach, disinfectants, lotions, and soaps that meet global standards.
                            </p>
                        </div>
                    </div>

                    {/* Skin-Friendly Skincare */}
                    <div data-aos="fade-left" className={`col-md-4 text-center ${styles.choiceContainer}`}>
                        <div className={styles.choiceBox}>
                            <p className={styles.logo_head}>Gentle on Skin</p>
                            <p className={styles.logo_text}>
                                Our lotions and skincare products are dermatologically tested, ensuring they nourish and protect your skin naturally.
                            </p>
                        </div>
                    </div>

                    {/* Eco-Friendly Products */}
                    <div data-aos="fade-right" className={`col-md-4 text-center ${styles.choiceContainer}`}>
                        <div className={styles.choiceBox}>
                            <p className={styles.logo_head}>Eco-Friendly & Sustainable</p>
                            <p className={styles.logo_text}>
                                We are committed to sustainability by using biodegradable and eco-friendly ingredients in our cleaning and skincare products.
                            </p>
                        </div>
                    </div>

                    {/* Long-Lasting Freshness */}
                    <div data-aos="fade" className={`col-md-4 text-center ${styles.choiceContainer}`}>
                        <div className={styles.choiceBox}>
                            <p className={styles.logo_head}>Long-Lasting Freshness</p>
                            <p className={styles.logo_text}>
                                Our disinfectants and air fresheners ensure your home stays fresh and clean for longer, giving you a healthier environment.
                            </p>
                        </div>
                    </div>

                    {/* Affordable & Accessible */}
                    <div data-aos="fade-left" className={`col-md-4 text-center ${styles.choiceContainer}`}>
                        <div className={styles.choiceBox}>
                            <p className={styles.logo_head}>Affordable & Accessible</p>
                            <p className={styles.logo_text}>
                                We provide premium-quality products at affordable prices, ensuring everyone can access safe and effective solutions for their home and body.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ChoosingUs;
