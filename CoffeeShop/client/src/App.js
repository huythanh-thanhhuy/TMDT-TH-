import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';

import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage from './pages/WishlistPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import SearchResultsPage from './pages/SearchResultsPage';
import './App.css';

// Component Toast Notification nội bộ
const Toast = ({ message, type, onClose }) => (
  <div className={`toast-notification ${type}`}>
    {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
    <span>{message}</span>
    <button onClick={onClose} className="toast-close"><X size={16} /></button>
  </div>
);

function AppContent() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  
  // UI States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }

  // Search States
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();

  // Tự động đóng Cart và cuộn lên đầu khi chuyển trang
  useEffect(() => {
    setShowCart(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Tự động tắt Toast sau 3 giây
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    fetchProducts();
    // Fetch cart & wishlist initial data if needed here
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      if (data.success) setProducts(data.data);
    } catch (err) {
      setError('Failed to load coffee menu. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật: Hỗ trợ thêm số lượng (quantity)
  const addToCart = async (productId, quantity = 1) => {
    try {
      // Loop call tạm thời nếu backend chưa hỗ trợ param quantity
      // Nếu backend hỗ trợ, hãy sửa body: { productId, quantity }
      let lastData;
      for (let i = 0; i < quantity; i++) {
        const response = await fetch('http://localhost:5000/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, quantity: 1 }) 
        });
        lastData = await response.json();
      }

      if (lastData && lastData.success) {
        setCart(lastData.data);
        showToast(`Added ${quantity} item(s) to cart!`, 'success');
      }
    } catch (err) {
      console.error('Failed to add to cart:', err);
      showToast('Failed to add to cart', 'error');
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${cartItemId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        setCart(data.data);
        showToast('Item removed from cart', 'success');
      }
    } catch (err) {
      console.error('Failed to remove:', err);
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${cartItemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });
      const data = await response.json();
      if (data.success) setCart(data.data);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart', { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        setCart([]);
        showToast('Cart cleared', 'success');
      }
    } catch (err) {
      console.error('Clear failed:', err);
    }
  };

  const toggleWishlist = async (productId) => {
    const isin = isInWishlist(productId);
    const method = isin ? 'DELETE' : 'POST';
    const url = isin 
      ? `http://localhost:5000/api/wishlist/${productId}`
      : 'http://localhost:5000/api/wishlist';

    try {
      const options = { method };
      if (!isin) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify({ productId });
      }

      const response = await fetch(url, options);
      const data = await response.json();
      
      if (data.success) {
        setWishlist(data.data);
        showToast(
          isin ? 'Removed from wishlist' : 'Added to wishlist ❤️', 
          'success'
        );
      }
    } catch (err) {
      console.error('Wishlist error:', err);
      showToast('Something went wrong', 'error');
    }
  };

  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  const handleSearch = (results, query) => {
    setSearchResults(results);
    setSearchQuery(query);
  };

  return (
    <div className="App">
      {/* Toast Notification Container */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <Header 
        cartCount={cart.length} 
        onCartClick={() => setShowCart(!showCart)}
        onSearch={handleSearch}
        wishlistCount={wishlist.length}
      />
      
      <main className="main-container">
        {error ? (
          <div className="error-state">
            <AlertCircle size={48} color="#ff4757" />
            <p>{error}</p>
            <button onClick={fetchProducts} className="retry-btn">Try Again</button>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={
              showCart ? (
                <Cart 
                  cart={cart}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                  onClear={clearCart}
                />
              ) : (
                loading ? (
                  <div className="loading-state">
                    <Loader2 className="spinner" size={48} />
                    <p>Brewing your menu...</p>
                  </div>
                ) : (
                  <ProductList products={products} onAddToCart={addToCart} />
                )
              )
            } />

            <Route path="/product/:id" element={
              <ProductDetailPage 
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isInWishlist={isInWishlist}
              />
            } />

            <Route path="/wishlist" element={
              <WishlistPage 
                wishlist={wishlist}
                onToggleWishlist={toggleWishlist}
                onAddToCart={addToCart}
              />
            } />

            <Route path="/orders" element={<OrderHistoryPage />} />

            <Route path="/search" element={
              <SearchResultsPage 
                searchResults={searchResults}
                searchQuery={searchQuery}
                onAddToCart={addToCart}
              />
            } />
          </Routes>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;