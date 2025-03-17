import React, { useState } from 'react';
import './Payment.css';
import { FaTruck } from 'react-icons/fa'; 

const Payment = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [message, setMessage] = useState('');

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^07\d{8}$/; 
    return phoneRegex.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = validatePhoneNumber(phoneNumber);
    setIsValidPhone(valid);

    if (valid) {
      setIsLoadingPayment(true);
      setMessage('');

      try {
        const response = await fetch('https://aloefloraltds-lg66.onrender.com/api/stk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phoneNumber }),
        });

        const data = await response.json();
        if (data.success) {
          setMessage('Payment request sent successfully. Please check your phone.');
        } else {
          setMessage('Failed to send payment request. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('An error occurred. Please try again.');
      } finally {
        setIsLoadingPayment(false);
      }
    } else {
      console.log('Invalid phone number');
    }
  };

  return (
    <div className="payment-container">
      <h2>Complete Payment</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="phoneNumber">M-Pesa Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            required
            className={!isValidPhone ? 'error' : ''}
          />
          {!isValidPhone && <p className="error-message">Please enter a valid M-Pesa number (e.g., 07XXXXXXXX).</p>}
        </div>

        <p className="delivery-info">
          <FaTruck className="icon" /> Free delivery within Nairobi CBD. Additional charges apply for delivery outside Nairobi.
        </p>

        <button type="submit" className="submit-payment-btn" disabled={isLoadingPayment}>
          {isLoadingPayment ? 'Processing...' : 'Submit Payment'}
        </button>
      </form>

      {message && <p className="payment-message">{message}</p>}

      <div className="tracking-section">
        <h3>Track Your Order</h3>
        <p>After completing your payment, you will be able to track your order here.</p>
        <input type="text" placeholder="Enter your tracking number" />
        <button className="track-btn">Track Order</button>
      </div>
    </div>
  );
};

export default Payment;
