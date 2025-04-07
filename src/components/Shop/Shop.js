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
    price: 600, 
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
  const [locationInput, setLocation] = useState('');
  const [useLiveLocation, setUseLiveLocation] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [message, setMessage] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

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

  const removeFromCart = (product) => {
    setCartItems(cartItems.filter(item => item.id !== product.id));
  };

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

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

  const sortedAndFilteredProducts = applyFilterAndSort(products);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const validatePhoneNumber = (number) => {
    const cleanedNumber = number.replace(/\s+/g, '');
    const phoneRegex = /^(07\d{8}|01\d{8}|254\d{9})$/; 
    return phoneRegex.test(cleanedNumber);
  };
  
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const valid = validatePhoneNumber(phoneNumber);
    setIsValidPhone(valid);

    if (valid) {
        const confirmation = window.confirm(`Confirm purchase of ${totalQuantity}Aloe Flora Products worth Ksh ${totalAmount}?`);
        if (!confirmation) return;

        setIsLoadingPayment(true);
        setMessage('');

        try {
            const response = await fetch('https://aloeflora-lg66.onrender.com/api/stk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: totalAmount, phoneNumber }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
            } else {
                setMessage(data.error || 'Failed to send payment request. Please try again.');
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

  const handleUseLiveLocation = () => {
    if (!useLiveLocation) {
      setIsLoadingLocation(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation(`Lat: ${latitude}, Long: ${longitude}`);
            setUseLiveLocation(true);
            setIsLoadingLocation(false);
          },
          (error) => {
            console.error('Error getting location:', error);
            setIsLoadingLocation(false);
          }
        );
      } else {
        alert('Geolocation is not supported by this browser.');
        setIsLoadingLocation(false);
      }
    }
  };

  return (
    <>
      <div className="our-shop-container">
        <header className="shop-header">
          <h1>Our Shop</h1>
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
              style={{
                padding: '8px 12px',
                borderRadius: '20px',
                border: '2px solid #4CAF50',
                margin: '0 10px',
                backgroundColor: '#f8f8f8',
                color: '#333',
                fontSize: '14px',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="">All Categories</option>
              <option value="Skincare & Bodycare">Skincare & Bodycare</option>
              <option value="Cleaning & Hygiene">Cleaning & Hygiene</option>
            </select>

            <select 
              value={sortCriteria} 
              onChange={handleSortChange}
              style={{
                padding: '8px 12px',
                borderRadius: '20px',
                border: '2px solid #4CAF50',
                margin: '0 10px',
                backgroundColor: '#f8f8f8',
                color: '#333',
                fontSize: '14px',
                cursor: 'pointer',
                outline: 'none'
              }}
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
        </header>

        <div className="product-grid">
          {sortedAndFilteredProducts.length > 0 ? (
            sortedAndFilteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Ksh {product.price}</p>
                <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                  Add to Basket
                </button>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>

        {isCartOpen && (
          <div className="cart-dropdown">
            <div className="cart-header">
              <h3>Your Cart</h3>
              <FaTimes className="close-cart-btn" onClick={toggleCart} size={20} />
            </div>
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <div className="cart-item">
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <div className="cart-item-controls">
                          <button className="quantity-btn" onClick={() => updateQuantity(item, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button className="quantity-btn" onClick={() => updateQuantity(item, item.quantity + 1)}>+</button>
                          <button className="remove-item-btn" onClick={() => removeFromCart(item)}>
                            <FaTrashAlt /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Your cart is empty</p>
            )}

            {cartItems.length > 0 && (
              <div className="cart-summary">
                <p>Total Quantity: {totalQuantity}</p>
                <p>Total Amount: Ksh {totalAmount}</p>
                <form onSubmit={handlePaymentSubmit} className="payment-form">
                  <div className="form-group">
                    <label htmlFor="phoneNumber">M-Pesa Phone Number</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter your phone number"
                      required
                      className={!isValidPhone ? 'error' : ''} />
                    {!isValidPhone && <p className="error-message">Please enter a valid M-Pesa number (e.g., 07XXXXXXXX).</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="location">Delivery Location</label>
                    <input
                      type="text"
                      id="location"
                      value={locationInput}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter your location or use live location"
                      disabled={useLiveLocation}
                      required={!useLiveLocation} />
                  </div>

                  <button
                    type="button"
                    className={`live-location-btn ${useLiveLocation ? 'active' : ''}`}
                    onClick={handleUseLiveLocation}
                    disabled={isLoadingLocation}>
                    {isLoadingLocation ? 'Getting Location...' : (useLiveLocation ? 'Using Live Location' : 'Use Live Location')}
                  </button>

                  <button type="submit" className="submit-payment-btn" disabled={isLoadingPayment}>
                    {isLoadingPayment ? 'Processing...' : 'Submit Payment'}
                  </button>
                </form>
                {message && <p className="payment-message">{message}</p>}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
  
};

export default Shop;