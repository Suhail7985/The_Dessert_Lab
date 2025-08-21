import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { AppContext } from "../App";
import axios from "axios";

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const [placingOrder, setPlacingOrder] = useState(false);
  const Navigate = useNavigate();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    if (qty <= 1) {
      // Remove item from cart when quantity reaches 0 or below
      const updatedCart = cart.filter((product) => product._id !== id);
      setCart(updatedCart);
    } else {
      // Decrease quantity if it's greater than 1
      const updatedCart = cart.map((product) =>
        product._id === id ? { ...product, qty: qty - 1 } : product
      );
      setCart(updatedCart);
    }
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => {
        return sum + value.qty * value.price;
      }, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      setPlacingOrder(true);
      setError("");
      
      if (!user?.token) {
        setError("Please login to place an order");
        return;
      }

      const url = `${API_URL}/api/orders`;
      const newOrder = {
        orderValue,
        items: cart,
      };
      
      const result = await axios.post(url, newOrder, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      
      setCart([]);
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2 className="cart-title">My Cart</h2>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Start shopping to add delicious desserts to your cart!</p>
          <button onClick={() => navigate("/products")} className="browse-btn">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart</h2>
      {error && <p className="error-message">{error}</p>}
      
      {cart.map((value) => (
        value.qty > 0 && (
          <div key={value._id} className="cart-item">
            <img 
              src={value.imgUrl} 
              alt={value.productName} 
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{value.productName}</h3>
              <p className="cart-item-price">₹{value.price} each</p>
            </div>
            <div className="qty-buttons">
              <button 
                onClick={() => decrement(value._id, value.qty)}
                disabled={value.qty <= 1}
              >
                -
              </button>
              <span>{value.qty}</span>
              <button onClick={() => increment(value._id, value.qty)}>
                +
              </button>
            </div>
            <div className="cart-item-total">
              ₹{value.price * value.qty}
            </div>
          </div>
        )
      ))}
      
      <div className="order-summary">
        <h3 className="order-value">Total: ₹{orderValue}</h3>
        
        <div className="cart-actions">
          {user?.token ? (
            <button
              className={`place-order-btn ${placingOrder ? 'loading' : ''}`}
              onClick={placeOrder}
              disabled={placingOrder}
            >
              {placingOrder ? (
                <>
                  <div className="loading-spinner"></div>
                  Placing Order...
                </>
              ) : (
                'Place Order'
              )}
            </button>
          ) : (
            <button
              className="login-to-order-btn"
              onClick={() => navigate("/login")}
            >
              Login to Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}