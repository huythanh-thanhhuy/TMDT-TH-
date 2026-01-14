import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Heart, ShoppingCart, Minus, Plus, 
  MapPin, Loader2, Award, Info, Coffee, ThermometerSnowflake, Sparkles
} from 'lucide-react';
import Reviews from '../components/Reviews';
import './ProductDetailPage.css';

function ProductDetailPage({ onAddToCart, onToggleWishlist, isInWishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false); // Hiệu ứng loading nút Add

  // Hàm chọn icon và màu dựa trên category
  const getCategoryConfig = (category) => {
    switch (category) {
      case 'cold':
        return { icon: <ThermometerSnowflake size={16} />, label: 'Cold', color: '#00d2d3' };
      case 'specialty':
        return { icon: <Sparkles size={16} />, label: 'Specialty', color: '#ff9f43' };
      case 'hot':
      default:
        return { icon: <Coffee size={16} />, label: 'Hot', color: '#ff6b6b' };
    }
  };

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi vào chi tiết
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await response.json();
      if (data.success || response.ok) {
        setProduct(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Logic thêm vào giỏ hàng
    // Nếu hàm onAddToCart của bạn hỗ trợ tham số quantity: onAddToCart(product.id, quantity);
    // Nếu không, giữ vòng lặp như cũ để tương thích:
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product.id);
    }

    // Giả lập delay nhỏ để người dùng thấy phản hồi
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1); // Reset số lượng sau khi thêm
    }, 500);
  };

  if (loading) {
    return (
      <div className="page-loading">
        <Loader2 className="spinner" size={40} />
        <p>Brewing details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page-error">
        <Info size={48} />
        <h2>Product not found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const isLiked = isInWishlist(product.id);

  return (
    <div className="product-detail-page">
      {/* Nút Back */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> Back
      </button>

      <div className="product-detail-container">
        {/* Cột trái: Hình ảnh */}
        <div className="product-image-section">
          <div className="image-wrapper">
             <img src={product.image} alt={product.name} className="main-image" />
             <div className="badges-overlay">
               {product.category && (
                 <span 
                   className="badge category" 
                   style={{ backgroundColor: getCategoryConfig(product.category).color }}
                 >
                   {getCategoryConfig(product.category).icon} {getCategoryConfig(product.category).label}
                 </span>
               )}
             </div>
          </div>
        </div>

        {/* Cột phải: Thông tin */}
        <div className="product-info-section">
          <div className="header-info">
            <h1 className="product-name">{product.name}</h1>
            <div className="meta-tags">
              <span className="meta-item origin">
                <MapPin size={16} /> {product.origin || 'Unknown Origin'}
              </span>
              <span className="meta-item strength-text">
                <Award size={16} /> Strength: {product.strength}/5
              </span>
            </div>
          </div>

          <div className="price-wrapper">
             <span className="current-price">${product.price.toFixed(2)}</span>
          </div>

          <div className="description-box">
            <h3>Description</h3>
            <p className="full-desc">{product.fullDescription || product.description}</p>
          </div>

          {/* Strength Bar Visual */}
          <div className="strength-section">
            <label>Intensity Level</label>
            <div className="strength-bars">
              {[1, 2, 3, 4, 5].map((level) => (
                <div 
                  key={level} 
                  className={`bar-segment ${level <= product.strength ? 'filled' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Actions Area */}
          <div className="actions-container">
            <div className="quantity-wrapper">
              <label>Quantity</label>
              <div className="qty-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                  <Minus size={18} />
                </button>
                <span className="qty-display">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="buttons-row">
              <button 
                className="add-cart-btn-large" 
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? <Loader2 className="spinner" size={20} /> : <ShoppingCart size={20} />}
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </button>

              <button 
                className={`wishlist-btn-large ${isLiked ? 'active' : ''}`}
                onClick={() => onToggleWishlist(product.id)}
                title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Phần Reviews nằm bên dưới */}
      <div className="reviews-container-wrapper">
        <Reviews productId={id} />
      </div>
    </div>
  );
}

export default ProductDetailPage;