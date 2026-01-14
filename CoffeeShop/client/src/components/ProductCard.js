import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Coffee, ThermometerSnowflake, Sparkles } from 'lucide-react'; // Import icons
import './ProductCard.css';

function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  // Hàm chọn icon dựa trên category
  const getCategoryConfig = (category) => {
    switch (category) {
      case 'cold':
        return { icon: <ThermometerSnowflake size={14} />, label: 'Cold', color: '#00d2d3' };
      case 'specialty':
        return { icon: <Sparkles size={14} />, label: 'Specialty', color: '#ff9f43' };
      case 'hot':
      default:
        return { icon: <Coffee size={14} />, label: 'Hot', color: '#ff6b6b' };
    }
  };

  const categoryConfig = getCategoryConfig(product.category);

  // Format giá tiền cho đẹp
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(product.price);

  const handleCardClick = (e) => {
    // Ngăn chặn chuyển trang khi bấm nút Add
    if (e.target.closest('.add-btn')) return;
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      
      {/* Phần hình ảnh có chứa badge category */}
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-img" />
        <span 
          className="category-badge" 
          style={{ backgroundColor: categoryConfig.color }}
        >
          {categoryConfig.icon} {categoryConfig.label}
        </span>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        
        {/* Giới hạn hiển thị mô tả 2 dòng */}
        <p className="product-description">{product.description}</p>
        
        <div className="product-footer">
          <span className="price">{formattedPrice}</span>
          
          <button 
            className="add-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product.id);
            }}
            title="Add to Cart"
          >
            <Plus size={18} />
            <span className="btn-text">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;