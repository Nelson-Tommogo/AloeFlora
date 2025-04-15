import React, { useState } from 'react';
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

  // Format phone number to M-Pesa format
  const formatPhoneNumber = (number) => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.startsWith('0') && cleaned.length === 10) {
      return `254${cleaned.substring(1)}`;
    }
    return cleaned;
  };

  // Validate phone number
  const validatePhoneNumber = (number) => {
    const cleanedNumber = number.replace(/\s+/g, '');
    const phoneRegex = /^(07\d{8}|01\d{8}|254\d{9})$/; 
    return phoneRegex.test(cleanedNumber);
  };

  // Add product to cart
  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Remove product from cart
  const removeFromCart = (product) => {
    setCartItems(cartItems.filter(item => item.id !== product.id));
  };

  // Update product quantity
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

  // Filter and sort products
  const applyFilterAndSort = (products) => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory ? product.category === filterCategory : true;
      return matchesSearch && matchesCategory;
    });

    switch(sortCriteria) {
      case 'price-asc': return filtered.sort((a, b) => a.price - b.price);
      case 'price-desc': return filtered.sort((a, b) => b.price - a.price);
      case 'name-asc': return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc': return filtered.sort((a, b) => b.name.localeCompare(a.name));
      default: return filtered;
    }
  };

  // Handle payment submission
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    if (!navigator.onLine) {
      setMessage('You appear to be offline. Please check your connection.');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setMessage('Please enter a valid M-Pesa number (e.g., 07XXXXXXXX)');
      return;
    }

    const confirmation = window.confirm(
      `Confirm purchase of ${totalQuantity} items worth Ksh ${totalAmount}?`
    );
    if (!confirmation) return;

    setIsLoadingPayment(true);
    setMessage('Initiating payment...');
    setPaymentStatus('pending');

    try {
      const response = await fetch('https://aloebackend-g1a7.onrender.com/api/stkpush', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: totalAmount,
          phoneNumber: formatPhoneNumber(phoneNumber)
        })
      });

      if (!response.ok) {
        throw new Error('Payment initiation failed');
      }

      const data = await response.json();
      setMessage('Payment request sent! Check your phone for M-Pesa prompt.');
      setPaymentStatus('success');
      
    } catch (error) {
      console.error('Payment Error:', error);
      setMessage(error.message || 'Payment failed. Please try again.');
      setPaymentStatus('failed');
    } finally {
      setIsLoadingPayment(false);
    }
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (isCartOpen) {
      setPaymentStatus(null);
      setMessage('');
    }
  };

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
            <div className="cart-icon" onClick={toggleCart}>
              <FaShoppingCart size={30} />
              <span className="cart-count">{totalQuantity}</span>
            </div>
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
                          <p>Processing payment request...</p>
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
                          )}
                          {paymentStatus === 'failed' && (
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