import React, { useState } from "react";
import styles from './ContactUsForm.module.css';

const ContactUsForm = () => {
    const [formContent, setFormContent] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormContent((prevState) => ({
            ...prevState,
            [name]: value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formContent.name.trim()) newErrors.name = "Name is required.";
        if (!formContent.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formContent.email)) {
            newErrors.email = "Invalid email format.";
        }
        if (!formContent.subject.trim()) newErrors.subject = "Subject is required.";
        if (!formContent.message.trim()) newErrors.message = "Message is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (validateForm()) {
            const mailtoLink = `mailto:info@aloyfloraproducts.com?subject=${encodeURIComponent(formContent.subject)}&body=${encodeURIComponent(`Name: ${formContent.name}\nEmail: ${formContent.email}\n\n${formContent.message}`)}`;
            window.location.href = mailtoLink;
        }
    };

    return (
        <>
            <div className={`container ${styles.contain} overflow-hidden`}>
                <p data-aos='fade-up' className={`${styles.heading} mx-auto`}>
                    AloeFlora Products Limited We&apos;d Love to Hear From You
                </p>

                <div className="row">
                    <div className="col-md-4" data-aos='fade-right'>
                        <p className={styles.head}>Address</p>
                        <p className={styles.content}>P.O BOX 00100, Manyanja road</p>
                    </div>

                    <div className="col-md-4" data-aos='fade-up' data-aos-offset='100'>
                        <p className={styles.head}>Contact</p>
                        <p className={styles.content}>Mobile: 254 702 283637</p>
                        <p className={styles.content}>Phone: 254759735505</p>
                        <p className={styles.content}>Email: info@aloefloraproducts.com</p>
                    </div>

                    <div className="col-md-4" data-aos='fade-left' data-aos-offset='70'>
                        <p className={styles.head}>Hours</p>
                        <p className={styles.content}>Monday - Friday: 09:00 - 20:00</p>
                        <p className={styles.content}>Sunday &amp; Saturday: 10:30 - 22:00</p>
                    </div>
                </div>

                <p className={styles.email} data-aos='fade-up'>You can email us</p>

                <form className="row" onSubmit={handleSubmit}>
                    <div className="col-md-6" data-aos='fade-right' style={{ textAlign: 'left' }}>
                        <label className={styles.label}>Name</label><br />
                        <input name="name" value={formContent.name} onChange={handleChange} className={styles.input} type="text" />
                        {errors.name && <p className={styles.error}>{errors.name}</p>}

                        <label className={styles.label}>Email</label><br />
                        <input name="email" value={formContent.email} onChange={handleChange} className={styles.input} type="email" />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}

                        <label className={styles.label}>Subject</label><br />
                        <input name="subject" value={formContent.subject} onChange={handleChange} className={styles.input} type="text" />
                        {errors.subject && <p className={styles.error}>{errors.subject}</p>}
                    </div>

                    <div className="col-md-6" data-aos='fade-left' style={{ textAlign: 'left' }}>
                        <label className={styles.label}>Message</label><br />
                        <textarea name="message" value={formContent.message} onChange={handleChange} className={`${styles.input} ${styles.msg}`} />
                        {errors.message && <p className={styles.error}>{errors.message}</p>}

                        <div style={{ textAlign: 'right', marginTop: '15px' }}>
                            <button type="submit" className={styles.greenButton}>SEND</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ContactUsForm;
