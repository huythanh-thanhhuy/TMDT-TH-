import React, { useState, useEffect } from 'react';
import { getProducts, getCategories, addProduct, updateProductPrice } from '../services/api';
import PriceUpdateModal from './PriceUpdateModal';
import styles from './ProductManagement.module.css';

export default function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        product_name: '',
        product_slug: '',
        category_id: '',
        price: '',
        store_id: '1', // Default store_id
        description: '',
        stock_quantity: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [productsData, categoriesData] = await Promise.all([
                getProducts(),
                getCategories()
            ]);
            setProducts(productsData);
            setCategories(categoriesData);
            setError('');
        } catch (err) {
            setError('Lỗi khi tải dữ liệu');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.product_name.trim() || !formData.product_slug.trim() || !formData.price) {
            setError('Tên, slug và giá sản phẩm không được để trống');
            return;
        }

        try {
            await addProduct({
                product_name: formData.product_name,
                product_slug: formData.product_slug,
                price: parseFloat(formData.price),
                category_id: formData.category_id ? parseInt(formData.category_id) : null,
                store_id: parseInt(formData.store_id),
                description: formData.description,
                stock_quantity: formData.stock_quantity ? parseInt(formData.stock_quantity) : 0
            });
            setFormData({
                product_name: '',
                product_slug: '',
                category_id: '',
                price: '',
                store_id: '1',
                description: '',
                stock_quantity: ''
            });
            setError('');
            await fetchData();
            alert('Thêm sản phẩm thành công');
        } catch (err) {
            setError('Lỗi khi thêm sản phẩm');
            console.error(err);
        }
    };

    const handleEditPrice = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const handlePriceUpdate = async (priceData) => {
        try {
            await updateProductPrice(selectedProduct.product_id, priceData);
            await fetchData();
            handleModalClose();
            alert('Cập nhật giá thành công');
        } catch (err) {
            setError('Lỗi khi cập nhật giá');
            console.error(err);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Quản lý Sản phẩm</h2>

            {error && <div className={styles.error}>{error}</div>}

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                        <label htmlFor="product_name">Tên sản phẩm</label>
                        <input
                            type="text"
                            id="product_name"
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleInputChange}
                            placeholder="Vd: Chảo chống dính 24cm"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="product_slug">Slug (URL)</label>
                        <input
                            type="text"
                            id="product_slug"
                            name="product_slug"
                            value={formData.product_slug}
                            onChange={handleInputChange}
                            placeholder="Vd: chao-chong-dinh-24cm"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="category_id">Danh mục</label>
                        <select
                            id="category_id"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleInputChange}
                        >
                            <option value="">-- Chọn danh mục --</option>
                            {categories.map(cat => (
                                <option key={cat.category_id} value={cat.category_id}>
                                    {cat.category_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="price">Giá gốc (₫)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="Nhập giá sản phẩm..."
                            step="0.01"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="stock_quantity">Số lượng kho</label>
                        <input
                            type="number"
                            id="stock_quantity"
                            name="stock_quantity"
                            value={formData.stock_quantity}
                            onChange={handleInputChange}
                            placeholder="Vd: 100"
                            min="0"
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Mô tả chi tiết</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Nhập thông tin mô tả sản phẩm..."
                        rows="3"
                    />
                </div>

                <button type="submit" className={styles.submitBtn}>
                    + Thêm Sản phẩm
                </button>
            </form>

            <div className={styles.tableContainer}>
                <h3>Danh sách sản phẩm</h3>
                {loading ? (
                    <p style={{ textAlign: 'center', color: '#64748b' }}>Đang tải dữ liệu...</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Mã ID</th>
                                <th>Tên sản phẩm</th>
                                <th>Danh mục</th>
                                <th>Giá gốc</th>
                                <th>Giá khuyến mãi</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.product_id}>
                                    <td><span className={styles.idBadge}>#{product.product_id}</span></td>
                                    <td style={{ fontWeight: '500' }}>{product.product_name}</td>
                                    <td>{product.category_name || <span style={{color: '#94a3b8'}}>Chưa có</span>}</td>
                                    <td className={styles.priceText}>{product.price.toLocaleString('vi-VN')} ₫</td>
                                    <td>
                                        {product.discount_price ? (
                                            <span className={styles.discountText}>
                                                {product.discount_price.toLocaleString('vi-VN')} ₫
                                            </span>
                                        ) : (
                                            <span style={{ color: '#cbd5e1' }}>-</span>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className={styles.editBtn}
                                            onClick={() => handleEditPrice(product)}
                                        >
                                            Cập nhật giá
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {showModal && selectedProduct && (
                <PriceUpdateModal
                    product={selectedProduct}
                    onClose={handleModalClose}
                    onUpdate={handlePriceUpdate}
                />
            )}
        </div>
    );
}