import React from "react";
import styles from './Top.module.css';

const Top = () => {
    return (
        <div className="container overflow-hidden">
            {/* Core Values Section */}
            <div className={styles.section}>
                <p data-aos='slide-right' className={styles.heading}>Our Core Values</p>
                
                <div className={styles.valuesContainer}>
                    <div data-aos='fade-up' className={styles.card}>
                        <h3>Sustainability</h3>
                        <p>We prioritize biodegradable and eco-friendly ingredients to protect the environment.</p>
                    </div>
                    <div data-aos='fade-up' className={styles.card}>
                        <h3>Innovation</h3>
                        <p>Our team continuously researches and develops new formulations to enhance safety and effectiveness.</p>
                    </div>
                    <div data-aos='fade-up' className={styles.card}>
                        <h3>Customer-Centric Approach</h3>
                        <p>We listen to our customers and create products that add real value to their lives.</p>
                    </div>
                    <div data-aos='fade-up' className={styles.card}>
                        <h3>Integrity & Transparency</h3>
                        <p>Honesty is at the core of our sourcing, production, and business practices.</p>
                    </div>
                    <div data-aos='fade-up' className={styles.card}>
                        <h3>Community Empowerment</h3>
                        <p>We support local communities by sourcing responsibly and promoting hygiene education.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Top;
