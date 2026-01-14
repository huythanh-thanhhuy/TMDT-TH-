import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, SearchX, ShoppingBag } from 'lucide-react'; // Import icons
import ProductCard from '../components/ProductCard'; // Đảm bảo đường dẫn đúng
import './SearchResultsPage.css';

function SearchResultsPage({ searchResults, searchQuery, onAddToCart }) {
  const navigate = useNavigate();

  // Scroll lên đầu trang khi có kết quả tìm kiếm mới
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchResults]);

  return (
    <div className="search-results-page">
      <div className="search-header-container">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={20} /> Back to Home
        </button>
        
        <div className="header-text">
          <h2>
            Results for <span className="highlight-text">"{searchQuery}"</span>
          </h2>
          {searchResults.length > 0 && (
            <span className="results-count">Found {searchResults.length} product(s)</span>
          )}
        </div>
      </div>

      {searchResults.length === 0 ? (
        <div className="no-results-container">
          <div className="icon-bg">
            <SearchX size={64} strokeWidth={1.5} />
          </div>
          <h3>No matches found</h3>
          <p>We couldn't find any coffee matching "{searchQuery}".</p>
          <p className="sub-hint">Try checking for typos or use broader keywords.</p>
          
          <button 
            className="browse-all-btn"
            onClick={() => navigate('/')}
          >
            <ShoppingBag size={18} />
            Browse Full Menu
          </button>
        </div>
      ) : (
        <div className="results-grid">
          {searchResults.map(product => (
            /* Không cần onClick ở đây vì ProductCard đã tự xử lý */
            <div key={product.id} className="grid-item">
              <ProductCard 
                product={product}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResultsPage;