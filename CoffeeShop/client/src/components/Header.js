import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, FileText, Coffee } from 'lucide-react'; // Import icons
import SearchBar from './SearchBar';
import './Header.css';

function Header({ cartCount, onCartClick, onSearch, wishlistCount }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (results, query) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`, { state: { results, query } });
    }
  };

  const handleCartClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    onCartClick();
  };

  const handleLogoClick = (e) => {
    navigate('/');
    onCartClick();
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo" onClick={handleLogoClick}>
          <Coffee className="logo-icon" size={32} />
          <h1>Coffee Shop</h1>
        </div>

        {/* Search Section */}
        <div className="search-wrapper">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Actions Section */}
        <div className="header-actions">
          
          <Link to="/wishlist" className="nav-btn" title="Wishlist">
            <div className="icon-wrapper">
              <Heart size={24} />
              {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </div>
          </Link>

          <Link to="/orders" className="nav-btn" title="Order History">
            <FileText size={24} />
          </Link>

          <button className="nav-btn cart-btn" onClick={handleCartClick} title="Shopping Cart">
            <div className="icon-wrapper">
              <ShoppingCart size={24} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </div>
          </button>
          
        </div>
      </div>
    </header>
  );
}

export default Header;