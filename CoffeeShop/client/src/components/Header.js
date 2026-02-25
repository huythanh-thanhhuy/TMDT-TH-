import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, FileText, Coffee } from 'lucide-react'; 
import SearchBar from './SearchBar';
import './Header.css';

function Header({ cartCount, onSearch, wishlistCount }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (results, query) => {
    // 1. GỌI HÀM CỦA APP.JS ĐỂ CẬP NHẬT KẾT QUẢ (Chính là dòng bạn bị thiếu)
    if (onSearch) {
      onSearch(results, query);
    }

    // 2. XỬ LÝ CHUYỂN TRANG
    if (query.trim()) {
      // Nếu có chữ -> Bay sang trang Search
      navigate(`/search?q=${encodeURIComponent(query)}`);
    } else if (location.pathname === '/search') {
      // Nếu xóa trắng ô tìm kiếm -> Tự động quay về trang chủ
      navigate('/');
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <Coffee className="logo-icon" size={32} />
          <h1>Coffee Shop</h1>
        </Link>

        <div className="search-wrapper">
          {/* Truyền hàm handleSearch mới vào SearchBar */}
          <SearchBar onSearch={handleSearch} />
        </div>

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

          <Link to="/cart" className="nav-btn cart-btn" title="Shopping Cart">
            <div className="icon-wrapper">
              <ShoppingCart size={24} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </div>
          </Link>
          
        </div>
      </div>
    </header>
  );
}

export default Header;