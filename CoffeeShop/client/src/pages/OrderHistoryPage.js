import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Calendar, Package, Repeat, 
  ArrowRight, Clock, CheckCircle, XCircle, ShoppingBag 
} from 'lucide-react';
import './OrderHistoryPage.css';

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
    window.scrollTo(0, 0);
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/orders');
      const data = await response.json();
      if (data.success) {
        // Sắp xếp đơn mới nhất lên đầu
        const sortedOrders = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // Helper format ngày tháng
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  // Helper format tiền tệ
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  // Helper lấy config cho trạng thái
  const getStatusConfig = (status) => {
    const s = status?.toLowerCase();
    if (s === 'completed' || s === 'delivered') return { icon: <CheckCircle size={14}/>, label: 'Completed', className: 'status-success' };
    if (s === 'cancelled') return { icon: <XCircle size={14}/>, label: 'Cancelled', className: 'status-error' };
    return { icon: <Clock size={14}/>, label: 'Processing', className: 'status-pending' };
  };

  return (
    <div className="order-history-page">
      {/* Header giống Wishlist */}
      <div className="page-header">
        <h2>
          Order History <FileText className="header-icon" fill="#d2691e" color="#d2691e" />
        </h2>
        {orders.length > 0 && (
          <span className="order-count-badge">{orders.length} past orders</span>
        )}
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Retrieving your coffee history...</p>
        </div>
      ) : orders.length === 0 ? (
        /* Empty State giống Wishlist */
        <div className="empty-orders-container">
          <div className="empty-icon-bg">
            <ShoppingBag size={64} strokeWidth={1.5} />
          </div>
          <h3>No orders yet</h3>
          <p>Looks like you haven't enjoyed our coffee yet.</p>
          <button className="browse-btn" onClick={() => navigate('/')}>
            Browse Menu <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order, index) => {
            const statusConfig = getStatusConfig(order.status);
            const subtotal = order.total;
            const tax = subtotal * 0.1;
            const finalTotal = subtotal + tax;

            return (
              <div key={order.id || index} className="order-card">
                {/* Card Header: ID & Status */}
                <div className="order-card-top">
                  <div className="order-id-group">
                    <span className="order-label">Order</span>
                    <span className="order-id">#{order.orderId || (index + 1).toString().padStart(4, '0')}</span>
                  </div>
                  <div className={`status-pill ${statusConfig.className}`}>
                    {statusConfig.icon} {statusConfig.label}
                  </div>
                </div>

                {/* Date Row */}
                <div className="order-date-row">
                  <Calendar size={14} className="date-icon" /> 
                  {formatDate(order.createdAt)}
                </div>

                {/* Items List (Giới hạn hiển thị 3 món đầu) */}
                <div className="order-items-preview">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="preview-item">
                      <div className="item-dot">
                        <Package size={12} />
                      </div>
                      <span className="item-name-qty">
                        {item.quantity}x {item.name}
                      </span>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="more-items">
                      + {order.items.length - 3} more items...
                    </div>
                  )}
                </div>

                <div className="divider"></div>

                {/* Footer: Total & Action */}
                <div className="order-card-footer">
                  <div className="total-info">
                    <span className="total-label">Total Amount</span>
                    <span className="total-value">{formatPrice(finalTotal)}</span>
                  </div>
                  
                  <button 
                    className="reorder-btn"
                    onClick={() => navigate('/')}
                    title="Order Again"
                  >
                    <Repeat size={16} /> Reorder
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OrderHistoryPage;