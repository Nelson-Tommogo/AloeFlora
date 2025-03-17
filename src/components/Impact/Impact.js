import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faSoap, faHandsWash, faLeaf } from '@fortawesome/free-solid-svg-icons';
import styles from './Impact.module.css';

const Impact = () => {
    const counters = [
        { icon: faUsers, label: "Customers Served", value: "100,000+" },
        { icon: faSoap, label: "Liters of Cleaning Products Sold", value: "500,000+" },
        { icon: faHandsWash, label: "Hand Hygiene Solutions Delivered", value: "300,000+" },
        { icon: faLeaf, label: "Eco-Friendly & Safe Ingredients", value: "100%" },
    ];

    return (
        <div className={styles.parentContainer}>
            <div className={styles.textContainer}>
                <p className={styles.subHeading}>Enhancing Hygiene, Well-being & Sustainability</p>
            </div>
            <div className={styles.countersContainer}>
                <div className={styles.counters}>
                    {counters.map((counter, index) => (
                        <div key={index} className={styles.counter}>
                            <FontAwesomeIcon icon={counter.icon} size="3x" className={styles.icon} />
                            <p className={styles.counterValue}>{counter.value}</p>
                            <p className={styles.counterLabel}>{counter.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Impact;
