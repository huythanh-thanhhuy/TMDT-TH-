import React, { useState } from 'react';
import { Trash2, Plus, Minus, CheckCircle, Coffee, ArrowRight } from 'lucide-react';
import './Cart.css';

function Cart({ cart, onRemove, onUpdateQuantity, onClear }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Thêm trạng thái loading

  // Helper format tiền tệ
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = total * 0.1;
  const grandTotal = total + tax;

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerInfo.name,
          email: customerInfo.email,
          items: cart, // Nên gửi cả items lên server
          total: grandTotal
        })
      });

      const data = await response.json();
      
      // Giả lập delay 1 xíu để thấy hiệu ứng loading (nếu api quá nhanh)
      // await new Promise(r => setTimeout(r, 800)); 

      if (data.success || response.ok) { // Check thêm response.ok cho chắc chắn
        setOrderPlaced(true);
        setShowCheckout(false);
        setCustomerInfo({ name: '', email: '' });
        
        setTimeout(() => {
          setOrderPlaced(false);
          onClear();
        }, 3000);
      }
    } catch (err) {
      console.error('Failed to place order:', err);
      alert('Something went wrong. Please try again!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="cart-container success-container">
        <div className="order-success">
          <CheckCircle size={64} className="success-icon" />
          <h2>Order Placed Successfully!</h2>
          <p>Thank you, <b>{customerInfo.name}</b>.</p>
          <p>Your coffee is brewing and will be ready soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header-title">
        <h2>Your Cart</h2>
        <span className="item-count">{cart.length} items</span>
      </div>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <Coffee size={64} className="empty-icon" />
          <p>Your cart feels a bit light.</p>
          <p className="sub-text">Let's find some delicious coffee for you!</p>
        </div>
      ) : (
        <div className="cart-content">
          {/* Danh sách sản phẩm */}
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.cartItemId} className="cart-item">
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">{formatPrice(item.price)}</p>
                </div>
                
                <div className="item-actions">
                  <div className="quantity-control">
                    <button 
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="qty">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="item-total">
                    {formatPrice(item.price * item.quantity)}
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => onRemove(item.cartItemId)}
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tổng tiền & Checkout Form */}
          <div className="cart-sidebar">
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="divider"></div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>

              {!showCheckout ? (
                <div className="cart-actions-column">
                  <button className="checkout-btn" onClick={() => setShowCheckout(true)}>
                    Proceed to Checkout <ArrowRight size={18} />
                  </button>
                  <button className="clear-btn" onClick={onClear}>
                    Clear Cart
                  </button>
                </div>
              ) : (
                <form className="checkout-form" onSubmit={handleCheckout}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. john@example.com"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-actions-row">
                     <button 
                      type="button" 
                      className="cancel-btn"
                      onClick={() => setShowCheckout(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;