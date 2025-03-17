import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AboutUsHome.module.css";
import { FaHeart } from "react-icons/fa"; // Keep only the love icon

import groupProducts from "../../assets/groupproducts.jpeg";
import bleach from "../../assets/bleach.jpeg";
import lotion from "../../assets/lotion.jpeg";
import disinfectant from "../../assets/disinfectant.jpeg";
import handwash from "../../assets/handwash.jpeg";

const AboutUsHome = () => {
    const navigate = useNavigate();

    const handleExploreClick = () => {
        navigate("/shop");
    };

    return (
        <div className={styles.aboutContainer}>
            <div className={styles.contentWrapper}>
                
                {/* Image Container */}
                <div className={styles.imageContainer}>
                    <img 
                        src={groupProducts} 
                        alt="Aloe Flora Products" 
                        className={styles.productImage} 
                    />
                </div>

                {/* Text Container */}
                <div className={styles.textContainer}>
                    <h1 className={styles.heading}>Discover the Purity of AloeFlora</h1>
                    <p className={styles.content}>
                        At AloeFlora, we are dedicated to providing eco-friendly, skin-safe cleaning and skincare products. Our mission is to deliver high-quality, natural solutions that protect your home and body while being kind to the environment.
                    </p>

                    {/* Button Navigates to Shop Page */}
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={handleExploreClick}>
                            Explore More
                        </button>
                    </div>
                </div>
            </div>

            {/* Featured Products Section */}
            <div className={styles.featuredProducts}>
                <h2 className={styles.featuredHeading}>Featured Products</h2>

                <div className={styles.productGrid}>
                    {[
                        { 
                            img: bleach, 
                            title: "Aloe Flora Bleach (500ml)", 
                            price: "Ksh 150",
                            description: "Powerful, plant-based bleach for deep cleaning and stain removal."
                        },
                        { 
                            img: lotion, 
                            title: "Hand & Body Lotion (400ml)", 
                            price: "Ksh 300",
                            description: "Moisturizing lotion enriched with aloe vera for soft, hydrated skin."
                        },
                        { 
                            img: disinfectant, 
                            title: "Multipurpose Liquid Soap (5L)", 
                            price: "Ksh 600",
                            description: "Effective for cleaning floors, dishes, and more."
                        },
                        { 
                            img: handwash, 
                            title: "Hand Wash (500ml)", 
                            price: "Ksh 150",
                            description: "Gentle foaming hand wash with soothing aloe and essential oils."
                        },
                
                    ].map((product, index) => (
                        <div key={index} className={styles.productCard}>
                            {/* Wishlist Icon (Top Right) */}
                            <FaHeart className={styles.loveIcon} />

                            <img src={product.img} alt={product.title} className={styles.productImageSmall} />
                            <h3 className={styles.productTitle}>{product.title}</h3>
                            <p className={styles.productDescription}>{product.description}</p>
                            <p className={styles.productPrice}>{product.price}</p>

                            <button className={styles.shopButton} onClick={handleExploreClick}>
                                Shop Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUsHome;
