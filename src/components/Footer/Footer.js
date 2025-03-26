import React, { useState } from "react";
import styles from './Footer.module.css';
import { FiChevronDown } from 'react-icons/fi';
import { FaFacebook, FaInstagram} from 'react-icons/fa';

const servicesData = [
    { 
        name: 'Complaint Form', 
        pdfUrl: '' 
    },
];

const Footer = () => {
    const [openService, setOpenService] = useState(null);

    const toggleService = (index) => {
        setOpenService(openService === index ? null : index);
    };

    return (
        <>
            {/* Newsletter Section */}
            <div className={styles.newsletterContainer}>
                <div className={styles.newsletterContent}>
                    <p className={styles.newsletterText}>
                        Subscribe to our newsletter to get <br />
                        updates and recommendations.
                    </p>
                    <div className={styles.newsletterInputContainer}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={styles.newsletterInput}
                        />
                        <button
                            className={styles.subscribeButton}
                            onClick={() => (window.location.href = "mailto:info@aloefloraproducts.com")}
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div style={{ backgroundColor: '#000', paddingTop: '89px', paddingBottom: '90px' }}>
                <div className="container">
                    <div className="row">
                        {/* Column 1 */}
                        <div className={`col-lg-3 col-sm-6 ${styles.contain}`}>
                            <p className={styles.logo}>AloeFlora Products Limited</p>
                            <p className={styles.text}>Nurturing Beauty, Naturally</p>
                        </div>

                        {/* Column 2 */}
                        <div className={`col-lg-3 col-sm-6 ${styles.contain}`}>
                            <p className={styles.head}>Useful Links</p>
                            {servicesData.map((service, index) => (
                                <div key={index}>
                                    <div className={styles.text} onClick={() => toggleService(index)}>
                                        {service.name}
                                        <FiChevronDown style={{ marginLeft: '8px', cursor: 'pointer' }} />
                                    </div>
                                    {openService === index && (
                                        <div className={styles.text} style={{ cursor: 'pointer' }}>
                                            <a href={service.pdfUrl} target="_blank" rel="noopener noreferrer">
                                                View {service.name}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Column 3 */}
                        <div className={`col-lg-3 col-sm-6 ${styles.contain}`}>
                            <p className={styles.head}>Our Top Products</p>
                            <p className={styles.text}>Aloe Vera Moisturizer</p>
                            <p className={styles.text}>Aloe-Based Shampoo & Conditioner</p>
                            <p className={styles.text}>Aloe Healing Gel</p>
                            <p className={styles.text}>Aloe Infused Body Wash</p>
                        </div>

                        {/* Column 4 */}
                        <div className={`col-lg-3 col-sm-6 ${styles.contain}`}>
                            <p className={styles.head}>Follow Our Socials</p>
                            <p className={styles.text}>
                                <a href="https://www.facebook.com/aloefloraproducts" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook className={styles.icon} />
                                </a>
                                Facebook
                            </p>
                            <p className={styles.text}>
                                <a href="https://www.instagram.com/aloefloraproducts/" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram className={styles.icon} />
                                </a>
                                Instagram
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Embedded Map Section */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.814515543684!2d36.90041719999999!3d-1.2852713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1393e0767c77%3A0x3e0f0716077dfbbd!2sSalute%40Greenpark%20Apartments!5e0!3m2!1sen!2ske!4v1742230172544!5m2!1sen!2ske" 
                    width="100%" 
                    height="300" 
                    style={{ border: 0 }} 
                    title="Location Map of AloeFlora Products"
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            {/* Copyright Section */}
            <div style={{ backgroundColor: '#6c4d38', borderTop: 'solid 1px #707070' }}>
                <p className={styles.bottom}>Copyright © 2025 AloeFlora Products. All rights reserved.</p>
            </div>
        </>
    );
};

export default Footer;
