import React, { useState, useEffect } from 'react';
import { Star, User, MessageSquare, Send, X } from 'lucide-react';
import './Reviews.css';

function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [hoverRating, setHoverRating] = useState(0); // Để tạo hiệu ứng hover khi vote sao
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    customerName: '',
    rating: 5,
    title: '',
    comment: ''
  });

  useEffect(() => {
    if (productId) fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${productId}`);
      const data = await response.json();
      if (data.success || response.ok) {
        setReviews(data.data || []);
        // Nếu backend không trả về averageRating, tự tính toán
        const avg = data.averageRating || 
          (data.data?.reduce((acc, curr) => acc + curr.rating, 0) / data.data?.length) || 0;
        setAverageRating(Number(avg).toFixed(1));
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          ...formData,
          date: new Date().toISOString() // Gửi thêm ngày giờ
        })
      });

      const data = await response.json();
      if (data.success || response.ok) {
        setFormData({ customerName: '', rating: 5, title: '', comment: '' });
        setShowForm(false);
        fetchReviews(); // Reload list
      }
    } catch (err) {
      console.error('Failed to add review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper render sao hiển thị (read-only)
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={index < rating ? "star-filled" : "star-empty"} 
        fill={index < rating ? "#ffc107" : "none"} 
      />
    ));
  };

  // Format ngày tháng
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="reviews-section">
      <div className="reviews-header-container">
        <h3>Customer Reviews</h3>
        
        <div className="rating-overview">
          <div className="big-rating">
            <span className="rating-number">{averageRating}</span>
            <div className="rating-stars-static">
              {renderStars(Math.round(averageRating))}
            </div>
          </div>
          <span className="review-count-text">Based on {reviews.length} reviews</span>
        </div>

        <button 
          className={`toggle-review-btn ${showForm ? 'active' : ''}`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <><X size={18}/> Cancel</> : <><MessageSquare size={18}/> Write a Review</>}
        </button>
      </div>

      {showForm && (
        <form className="review-form" onSubmit={handleSubmit}>
          <h4>Write your review</h4>
          
          {/* Interactive Star Rating */}
          <div className="form-group rating-select-group">
            <label>Your Rating</label>
            <div className="interactive-stars">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <Star
                    key={index}
                    size={28}
                    className="star-pointer"
                    fill={ratingValue <= (hoverRating || formData.rating) ? "#ffc107" : "none"}
                    color={ratingValue <= (hoverRating || formData.rating) ? "#ffc107" : "#cbd5e1"}
                    onClick={() => setFormData({...formData, rating: ratingValue})}
                    onMouseEnter={() => setHoverRating(ratingValue)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                );
              })}
            </div>
            <span className="rating-label-text">
              {formData.rating === 5 ? 'Excellent!' : 
               formData.rating === 4 ? 'Very Good' : 
               formData.rating === 3 ? 'Average' : 'Poor'}
            </span>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                placeholder="Ex: Great coffee!"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Review</label>
            <textarea
              placeholder="Tell us what you liked or didn't like..."
              value={formData.comment}
              onChange={(e) => setFormData({...formData, comment: e.target.value})}
              rows="4"
            />
          </div>

          <button type="submit" className="submit-review-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : <><Send size={18}/> Post Review</>}
          </button>
        </form>
      )}

      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div key={review.id || idx} className="review-card">
              <div className="review-user-avatar">
                <div className="avatar-circle">
                  <User size={24} />
                </div>
              </div>
              <div className="review-content">
                <div className="review-card-header">
                  <span className="reviewer-name">{review.customerName}</span>
                  <span className="review-date">{formatDate(review.date || new Date())}</span>
                </div>
                <div className="review-stars">
                  {renderStars(review.rating)}
                </div>
                <h4 className="review-title">{review.title}</h4>
                <p className="review-text">{review.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-reviews">
            <MessageSquare size={48} className="no-review-icon"/>
            <p>No reviews yet.</p>
            <p className="sub-text">Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;