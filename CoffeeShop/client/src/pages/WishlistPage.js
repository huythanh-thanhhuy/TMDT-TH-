import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, HeartOff, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import './WishlistPage.css';

function WishlistPage({ wishlist, onToggleWishlist, onAddToCart }) {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (e, id) => {
    e.stopPropagation(); // Ngăn việc click xuyên qua card
    onAddToCart(id);
  };

  const handleRemove = (e, id) => {
    e.stopPropagation();
    onToggleWishlist(id);
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h2>
           My Wishlist <Heart className="header-icon" fill="#ff4757" color="#ff4757" />
        </h2>
        {wishlist.length > 0 && (
          <span className="wishlist-count">{wishlist.length} item(s) saved</span>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist-container">
          <div className="empty-icon-bg">
            <HeartOff size={64} strokeWidth={1.5} />
          </div>
          <h3>Your wishlist is empty</h3>
          <p>Seems like you haven't found your favorite coffee yet.</p>
          <button 
            className="browse-btn"
            onClick={() => navigate('/')}
          >
            Start Shopping <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map(product => (
            <div 
              key={product.id} 
              className="wishlist-card"
              onClick={() => handleCardClick(product.id)}
            >
              {/* Image Section */}
              <div className="wishlist-image-wrapper">
                <img src={product.image} alt={product.name} />
                <button
                  className="remove-icon-btn"
                  onClick={(e) => handleRemove(e, product.id)}
                  title="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Info Section */}
              <div className="wishlist-info-card">
                <div className="card-details">
                  <span className="category-tag">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="description-truncate">{product.description}</p>
                </div>

                <div className="card-footer">
                  <span className="price">${product.price.toFixed(2)}</span>
                  <button
                    className="add-cart-btn-small"
                    onClick={(e) => handleAddToCart(e, product.id)}
                    title="Add to Cart"
                  >
                    <ShoppingCart size={18} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;