import React from "react";
import styles from './Middle.module.css';

const Middle = () => {
    return (
        <div style={{ backgroundColor: '#f8f8f8' }} className='overflow-hidden'>
            <div className={`container ${styles.contain}`}>
                {/* Main heading for the section */}
                <p data-aos='fade-down-right' data-aos-offset="170" className={styles.mainHead}>
                    About Aloe Flora Product Limited
                </p>
              

                <div className="row">
                    {/* Mission Block */}
                    <div data-aos='fade-right' data-aos-offset="170" className="col-md-4">
                        <div className={styles.box}>
                            <p className={styles.head}>Our Mission</p>
                            <p className={styles.content}>
                            At Aloe Flora Product Limited, we are committed to manufacturing high-quality, eco-friendly cleaning detergents and hair care as well as body care products that enhance everyday hygiene and well-being. We aim to combine innovation with nature’s finest ingredients to deliver safe, effective, and sustainable solutions for homes and businesses                            </p>
                        </div>
                    </div>

                    {/* Vision Block */}
                    <div data-aos='fade-up' className="col-md-4">
                        <div className={styles.box}>
                            <p className={styles.head}>Our Vision</p>
                            <p className={styles.content}>
                            To be a leading manufacturer of premium, nature-inspired hygiene and personal care products, setting the standard for quality, sustainability, and customer satisfaction across the industry                            </p>
                        </div>
                    </div>

                    {/* Our Commitment Block */}
                    <div data-aos='fade-left' className="col-md-4">
                        <div className={styles.box}>
                            <p className={styles.head}>Our Commitment</p>
                            <p className={styles.content}>
                                We prioritize sustainability by using natural ingredients and eco-conscious production methods. Our goal is to ensure that every product contributes to a healthier lifestyle and a cleaner environment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Middle;
