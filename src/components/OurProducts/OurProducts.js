import React, { useState } from 'react';
import styles from './OurProducts.module.css';
import { Link } from 'react-router-dom';
import fakeData from './fakeData';

const OurProducts = () => {
    const [data, setData] = useState(fakeData);
    const [active, setActive] = useState([true, false, false]);

    // Filter data based on categories
    const filterData = (category) => {
        if (category === 'all') {
            setData(fakeData); // Show all products
        } else {
            let temp = fakeData.filter((x) => x.category === category);
            setData([...temp]);
        }
    }

    // Function to handle active state for buttons
    const activeNav = (i) => {
        let temp = [false, false, false];
        temp[i] = true;
        setActive([...temp]);
    }

    return (
        <div className={`container ${styles.contain} overflow-hidden`}>
            <div data-aos='slide-left'>
                <p className={styles.our}>EXPLORE&nbsp;</p>
                <p className={styles.study}>OUR PRODUCTS</p>
            </div>

            {/* Category buttons */}
            <div className={`${styles.grp_btn}`} data-aos='fade'>
                <p onClick={() => { setData(fakeData); activeNav(0); }} className={`${styles.filter} ${active[0] ? styles.active : null}`}>ALL</p>
                <p onClick={() => { filterData('skincare'); activeNav(1); }} className={`${styles.filter} ${active[1] ? styles.active : null}`}>SKINCARE & BODY CARE</p>
                <p onClick={() => { filterData('cleaning'); activeNav(2); }} className={`${styles.filter} ${active[2] ? styles.active : null}`}>CLEANING & HYGIENE</p>
            </div>

            {/* Products display */}
            <div className='row mb-2'>
                {
                    data.map((x) => (
                        <div key={x.id} className={`col-md-4 col-sm-6 mt-4`} data-aos='fade'>
                            <Link to="/shop" style={{ textDecoration: "none" }}>
                                <div className={styles.img} style={{ backgroundImage: `url(${x.img})` }}>
                                    <p className={styles.imgTitle}>{x.title}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default OurProducts;
