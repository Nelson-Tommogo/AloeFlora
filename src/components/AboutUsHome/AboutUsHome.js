import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AboutUsHome.module.css";
import { FaHeart } from "react-icons/fa"; // Keep only the love icon

import groupProducts from "../../assets/_MG_9332.jpg";
import Airconditioner from "../../assets/_MG_9314.png";
import lotion from "../../assets/lotion.png";
import TolietCleaner from "../../assets/_MG_9267.jpg";
import showergel from "../../assets/_MG_9301.jpg";

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
                            img: Airconditioner, 
                            title: "Air Conditioner",
                            price: "Ksh 350",
                            description: "Specialized formula for AC maintenance - Removes dust & allergens - Prevents microbial growth"
                          },
                          { 
                            img: lotion, 
                            title: "Body Lotion (400ml)", 
                            price: "Ksh 300",
                            description: "Fast-absorbing hydration - Aloe vera & shea butter - 24-hour moisturization"
                          },
                          { 
                            img: TolietCleaner, 
                            title: "Toilet Cleaner (750ml)", 
                            price: "Ksh 500",
                            description: "Powerful disinfectant - Eliminates limescale & odors - Citrus extract formula"
                          },
                          { 
                            img: showergel, 
                            title: "Shower Gel", 
                            price: "Ksh 609",
                            description: "Moisturizing body wash - Vitamin E enriched - Maintains skin's natural pH"
                          }
                
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
