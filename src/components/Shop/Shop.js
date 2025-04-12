import React, { useState, useEffect } from 'react';
import './Shop.css';
import { FaSearch, FaShoppingCart, FaTrashAlt, FaTimes } from 'react-icons/fa';
import Footer from "../Footer";
import airconditioner from '../../assets/_MG_9314.png';
import handwashsaop from '../../assets/handwashsaop.jpeg';
import toiletcleaner from '../../assets/toiletcleaner.jpg'; 
import lotion from '../../assets/lotion.png'; 
import shampoo from '../../assets/_MG_9316.jpg'; 
import showergel from '../../assets/_MG_9304.jpg'; 
import handwash from '../../assets/handwash.jpeg'; 
import hairtreatment from '../../assets/_MG_9328.jpg'; 

const products = [
  { 
    id: 1, 
    name: 'Aloe Hand Wash', 
    description: '500ml pH-balanced with aloe vera - Removes 99.9% bacteria - Non-drying formula',
    image: handwash, 
    price: 150, 
    category: 'Skincare & Bodycare' 
  },
  { 
    id: 2, 
    name: 'Aloe Shampoo', 
    description: '500ml sulfate-free - Aloe & coconut oil - Reduces hair breakage',
    image: shampoo, 
    price: 250, 
    category: 'Skincare & Bodycare' 
  },
  { 
    id: 4, 
    name: 'Aloe Hair Treatment', 
    description: '500ml repair mask - Aloe & keratin - Restores shine & elasticity',
    image: hairtreatment, 
    price: 250, 
    category: 'Skincare & Bodycare' 
  },
  { 
    id: 7, 
    name: 'Aloe Shower Gel', 
    description: '500ml moisturizing wash - Aloe & vitamin E - Maintains moisture barrier',
    image: showergel, 
    price: 609, 
    category: 'Skincare & Bodycare' 
  },
  { 
    id: 8, 
    name: 'AC Cleaning Solution', 
    description: '500ml specialized formula - Removes allergens - Prevents microbial growth',
    image: airconditioner, 
    price: 350, 
    category: 'Cleaning & Hygiene' 
  },
  { 
    id: 9, 
    name: 'Aloe Body Lotion', 
    description: '400ml fast-absorbing - Aloe & shea butter - 24h hydration',
    image: lotion, 
    price: 300, 
    category: 'Skincare & Bodycare' 
  },
  { 
    id: 10, 
    name: 'Aloe Toilet Cleaner', 
    description: '750ml powerful disinfectant - Citrus extracts - Eliminates stains & odors',
    image: toiletcleaner, 
    price: 500, 
    category: 'Cleaning & Hygiene' 
  },
  { 
    id: 12, 
    name: 'Antibacterial Hand Soap', 
    description: '500ml foaming soap - Tea tree oil - Maintains skin pH balance',
    image: handwashsaop, 
    price: 150, 
    category: 'Cleaning & Hygiene' 
  },
];

const Shop = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [message, setMessage] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null); 
  const [checkoutRequestId, setCheckoutRequestId] = useState(null);
  const [pollingInterval, setPollingInterval] = useState(null);

  // Helper function to format phone numbers
  const formatPhoneNumber = (number) => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.startsWith('0') && cleaned.length === 10) {
      return `254${cleaned.substring(1)}`;
    }
    return cleaned;
  };

  // Validate phone number format
  const validatePhoneNumber = (number) => {
    const cleanedNumber = number.replace(/\s+/g, '');
    const phoneRegex = /^(07\d{8}|01\d{8}|254\d{9})$/; 
    return phoneRegex.test(cleanedNumber);
  };

  // Add to cart function
  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Remove from cart function
  const removeFromCart = (product) => {
    setCartItems(cartItems.filter(item => item.id !== product.id));
  };

  // Update quantity function
  const updateQuantity = (product, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(product);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  // Apply filters and sorting to products
  const applyFilterAndSort = (products) => {
    let filteredProducts = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory ? product.category === filterCategory : true;
      return matchesSearch && matchesCategory;
    });

    if (sortCriteria === 'price-asc') {
      return filteredProducts.sort((a, b) => a.price - b.price);
    }
    if (sortCriteria === 'price-desc') {
      return filteredProducts.sort((a, b) => b.price - a.price);
    }
    if (sortCriteria === 'name-asc') {
      return filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortCriteria === 'name-desc') {
      return filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filteredProducts;
  };

  // Start polling for payment status
  const startPollingPaymentStatus = (requestId) => {
    // Clear any existing interval
    if (pollingInterval) clearInterval(pollingInterval);

    // Start new polling
    const interval = setInterval(async () => {
      try {
        const statusResponse = await fetch(
          `https://aloeflora-lg66.onrender.com/api/stkquery?checkoutRequestId=${requestId}`
        );
        const statusData = await statusResponse.json();

        if (statusData.status === 'success') {
          // Payment successful
          clearInterval(interval);
          setPaymentStatus('success');
          setMessage('Payment successful! Thank you for your purchase.');
          setIsLoadingPayment(false);
          saveTransaction(requestId);
          setCartItems([]); // Clear cart on success
        } else if (statusData.status === 'failed' || statusData.status === 'cancelled') {
          // Payment failed
          clearInterval(interval);
          setPaymentStatus(statusData.status);
          setMessage(
            statusData.status === 'cancelled'
              ? 'Payment was cancelled. Please try again if you wish to complete your purchase.'
              : 'Payment failed. Please check your M-Pesa balance and try again.'
          );
          setIsLoadingPayment(false);
        }
        // If still pending, do nothing and wait for next poll
      } catch (error) {
        console.error('Status check error:', error);
        // Don't stop polling on temporary errors
      }
    }, 5000); // Check every 5 seconds

    setPollingInterval(interval);

    // Timeout after 5 minutes (300 seconds)
    setTimeout(() => {
      clearInterval(interval);
      if (paymentStatus === 'pending') {
        setPaymentStatus('timeout');
        setMessage('Payment request timed out. Please try again.');
        setIsLoadingPayment(false);
      }
    }, 300000);
  };

  // Save transaction to database
  const saveTransaction = async (requestId) => {
    try {
      const transactionData = {
        phoneNumber: formatPhoneNumber(phoneNumber),
        amount: totalAmount,
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        checkoutRequestId: requestId,
        status: 'completed'
      };

      await fetch('https://aloeflora-lg66.onrender.com/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });
    } catch (error) {
      console.error('Failed to save transaction:', error);
    }
  };

  const handlePaymentSubmit = async (e) => {
  e.preventDefault();
  
  // Validate network connection
  if (!navigator.onLine) {
    setMessage('You appear to be offline. Please check your connection.');
    return;
  }

  const valid = validatePhoneNumber(phoneNumber);
  setIsValidPhone(valid);

  if (!valid) {
    setMessage('Please enter a valid M-Pesa number (e.g., 07XXXXXXXX)');
    return;
  }

  const confirmation = window.confirm(
    `Confirm purchase of ${totalQuantity} items worth Ksh ${totalAmount}?`
  );
  if (!confirmation) return;

  setIsLoadingPayment(true);
  setMessage('');
  setPaymentStatus('pending');

  try {
    // Make the payment request
    const stkResponse = await fetch('https://aloeflora-lg66.onrender.com/api/stkpush', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        amount: totalAmount, 
        phoneNumber: formatPhoneNumber(phoneNumber) 
      })
    });

    // Handle response
    if (!stkResponse.ok) {
      let errorMsg = 'Payment failed';
      try {
        const errorData = await stkResponse.json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) {
        console.log('Could not parse error response');
      }
      throw new Error(errorMsg);
    }

    const stkData = await stkResponse.json();
    
    if (!stkData.checkoutRequestID) {
      throw new Error('Invalid response from payment gateway');
    }

    setCheckoutRequestId(stkData.checkoutRequestID);
    setMessage('Payment request sent. Please check your phone.');
    startPollingPaymentStatus(stkData.checkoutRequestID);

  } catch (error) {
    console.error('Payment Error:', error);
    setPaymentStatus('failed');
    
    // Simplified error handling
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      setMessage('Network error. Please check your internet connection and try again.');
    } else {
      setMessage(error.message || 'Payment failed. Please try again.');
    }
    
    setIsLoadingPayment(false);
  }
};

  // Toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    // Reset payment status when closing cart
    if (isCartOpen) {
      setPaymentStatus(null);
      setMessage('');
    }
  };

  // Clean up polling interval when component unmounts
  useEffect(() => {
    return () => {
      if (pollingInterval) clearInterval(pollingInterval);
    };
  }, [pollingInterval]);

  // Calculate totals
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const sortedAndFilteredProducts = applyFilterAndSort(products);

  return (
    <>
      <div className="shop-page-container">
        <header className="shop-header">
          <h1>Our Shop</h1>
          <div className="shop-controls">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearch}
              />
              <FaSearch className="search-icon" size={20} />
            </div>
            <div className="filter-controls">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                <option value="Skincare & Bodycare">Skincare & Bodycare</option>
                <option value="Cleaning & Hygiene">Cleaning & Hygiene</option>
              </select>

              <select 
                value={sortCriteria} 
                onChange={handleSortChange}
                className="filter-select"
              >
                <option value="">Sort by</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
          <div className="cart-icon" onClick={toggleCart}>
            <FaShoppingCart size={30} />
            <span className="cart-count">{totalQuantity}</span>
          </div>
        </header>

        <div className="products-container">
          <div className="product-grid">
            {sortedAndFilteredProducts.length > 0 ? (
              sortedAndFilteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} className="product-image" />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">Ksh {product.price}</p>
                    <button 
                      className="add-to-cart-btn" 
                      onClick={() => addToCart(product)}
                      disabled={paymentStatus === 'pending'}
                    >
                      Add to Basket
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products-message">
                <p>No products found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        {isCartOpen && (
          <div className={`cart-dropdown ${isCartOpen ? 'show' : ''}`}>
            <div className="cart-header">
              <h3>Your Cart ({totalQuantity})</h3>
              <FaTimes className="close-cart-btn" onClick={toggleCart} size={20} />
            </div>
            
            <div className="cart-content">
              {cartItems.length > 0 ? (
                <>
                  <ul className="cart-items-list">
                    {cartItems.map((item) => (
                      <li key={item.id} className="cart-item">
                        <div className="cart-item-container">
                          <img src={item.image} alt={item.name} className="cart-item-img" />
                          <div className="cart-item-details">
                            <h4>{item.name}</h4>
                            <p className="item-price">Ksh {item.price}</p>
                            <div className="cart-item-controls">
                              <button 
                                className="quantity-btn" 
                                onClick={() => updateQuantity(item, item.quantity - 1)}
                                disabled={paymentStatus === 'pending'}
                              >
                                -
                              </button>
                              <span className="quantity">{item.quantity}</span>
                              <button 
                                className="quantity-btn" 
                                onClick={() => updateQuantity(item, item.quantity + 1)}
                                disabled={paymentStatus === 'pending'}
                              >
                                +
                              </button>
                              <button 
                                className="remove-item-btn" 
                                onClick={() => removeFromCart(item)}
                                disabled={paymentStatus === 'pending'}
                              >
                                <FaTrashAlt /> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="cart-summary">
                    <div className="summary-row">
                      <span>Total Quantity:</span>
                      <span>{totalQuantity}</span>
                    </div>
                    <div className="summary-row">
                      <span>Total Amount:</span>
                      <span>Ksh {totalAmount}</span>
                    </div>
                    
                    <form onSubmit={handlePaymentSubmit} className="payment-form">
                      <div className="form-group">
                        <label htmlFor="phoneNumber">M-Pesa Phone Number</label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            setIsValidPhone(true);
                          }}
                          placeholder="e.g. 0712345678"
                          required
                          disabled={paymentStatus === 'pending'}
                          className={!isValidPhone ? 'error' : ''}
                        />
                        {!isValidPhone && (
                          <p className="error-message">
                            Please enter a valid M-Pesa number (e.g., 07XXXXXXXX)
                          </p>
                        )}
                      </div>

                      {paymentStatus === null && (
                        <button 
                          type="submit" 
                          className="submit-payment-btn" 
                          disabled={isLoadingPayment || cartItems.length === 0}
                        >
                          {isLoadingPayment ? (
                            <>
                              <span className="spinner"></span> Processing...
                            </>
                          ) : (
                            'Pay via M-Pesa'
                          )}
                        </button>
                      )}

                      {paymentStatus === 'pending' && (
                        <div className="payment-pending">
                          <div className="spinner"></div>
                          <p>Waiting for payment confirmation...</p>
                          <button 
                            type="button" 
                            className="cancel-payment-btn"
                            onClick={() => {
                              if (pollingInterval) clearInterval(pollingInterval);
                              setPaymentStatus('cancelled');
                              setMessage('Payment process cancelled.');
                              setIsLoadingPayment(false);
                            }}
                          >
                            Cancel Payment
                          </button>
                        </div>
                      )}

                      {message && (
                        <div className={`payment-message ${
                          paymentStatus === 'success' ? 'success' : 
                          paymentStatus === 'pending' ? 'info' : 
                          'error'
                        }`}>
                          {message}
                          {paymentStatus === 'success' && (
                            <div className="success-actions">
                              <button 
                                type="button" 
                                className="continue-shopping-btn"
                                onClick={() => {
                                  setIsCartOpen(false);
                                  setPaymentStatus(null);
                                  setMessage('');
                                }}
                              >
                                Continue Shopping
                              </button>
                            </div>
                          )}
                          {(paymentStatus === 'failed' || paymentStatus === 'cancelled' || paymentStatus === 'timeout') && (
                            <button 
                              type="button" 
                              className="try-again-btn"
                              onClick={() => {
                                setPaymentStatus(null);
                                setMessage('');
                              }}
                            >
                              Try Again
                            </button>
                          )}
                        </div>
                      )}
                    </form>
                  </div>
                </>
              ) : (
                <div className="empty-cart-message">
                  <p>Your cart is empty</p>
                  <button className="continue-shopping-btn" onClick={toggleCart}>
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Shop;