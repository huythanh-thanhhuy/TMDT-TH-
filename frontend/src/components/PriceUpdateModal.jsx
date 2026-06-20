import React, { useState } from 'react';
import styles from './PriceUpdateModal.module.css';

export default function PriceUpdateModal({ product, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        price: product.price || '',
        discount_price: product.discount_price || '',
        promotion_start: product.promotion_start ? product.promotion_start.split('T')[0] : '',
        promotion_end: product.promotion_end ? product.promotion_end.split('T')[0] : ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.price) {
            setError('Giá gốc không được để trống');
            return;
        }

        const price = parseFloat(formData.price);
        const discountPrice = formData.discount_price ? parseFloat(formData.discount_price) : null;

        if (discountPrice && discountPrice >= price) {
            setError('Giá khuyến mãi phải nhỏ hơn giá gốc');
            return;
        }

        if (formData.promotion_start && formData.promotion_end) {
            if (new Date(formData.promotion_start) > new Date(formData.promotion_end)) {
                setError('Ngày bắt đầu phải trước ngày kết thúc');
                return;
            }
        }

        try {
            const updateData = {
                price: price,
                discount_price: discountPrice,
                promotion_start: formData.promotion_start || null,
                promotion_end: formData.promotion_end || null
            };

            await onUpdate(updateData);
        } catch (err) {
            setError('Lỗi khi cập nhật giá');
            console.error(err);
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <h3>Cập nhật Giá & Khuyến mãi</h3>
                    <button className={styles.closeBtn} onClick={onClose} title="Đóng">✕</button>
                </div>

                <div className={styles.productInfo}>
                    <p><strong>Sản phẩm:</strong> {product.product_name}</p>
                    <p><strong>Danh mục:</strong> {product.category_name || <span style={{color: '#94a3b8'}}>Chưa phân loại</span>}</p>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="price">Giá gốc (₫)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            step="0.01"
                            placeholder="Nhập giá bán gốc..."
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="discount_price">Giá khuyến mãi (₫)</label>
                        <input
                            type="number"
                            id="discount_price"
                            name="discount_price"
                            value={formData.discount_price}
                            onChange={handleInputChange}
                            placeholder="Để trống nếu không có khuyến mãi"
                            step="0.01"
                        />
                    </div>

                    <div className={styles.dateGrid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="promotion_start">Ngày bắt đầu</label>
                            <input
                                type="date"
                                id="promotion_start"
                                name="promotion_start"
                                value={formData.promotion_start}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="promotion_end">Ngày kết thúc</label>
                            <input
                                type="date"
                                id="promotion_end"
                                name="promotion_end"
                                value={formData.promotion_end}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>
                            Hủy bỏ
                        </button>
                        <button type="submit" className={styles.submitBtn}>
                            Lưu thay đổi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}