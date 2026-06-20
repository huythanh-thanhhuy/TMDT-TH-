import React, { useState, useEffect } from 'react';
import { getCategories, addCategory } from '../services/api';
import styles from './CategoryManagement.module.css';

export default function CategoryManagement() {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({ category_name: '', category_slug: '', parent_id: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await getCategories();
            setCategories(data);
            setError('');
        } catch (err) {
            setError('Lỗi khi tải danh mục');
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
        if (!formData.category_name.trim() || !formData.category_slug.trim()) {
            setError('Tên danh mục và slug không được để trống');
            return;
        }

        try {
            await addCategory(
                formData.category_name, 
                formData.category_slug,
                formData.parent_id ? parseInt(formData.parent_id) : null
            );
            setFormData({ category_name: '', category_slug: '', parent_id: '' });
            setError('');
            await fetchCategories();
            alert('Thêm danh mục thành công');
        } catch (err) {
            setError('Lỗi khi thêm danh mục');
            console.error(err);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Quản lý Danh mục</h2>

            {error && <div className={styles.error}>{error}</div>}

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="category_name">Tên danh mục</label>
                    <input
                        type="text"
                        id="category_name"
                        name="category_name"
                        value={formData.category_name}
                        onChange={handleInputChange}
                        placeholder="Vd: Nhà bếp, Phòng tắm..."
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="category_slug">Slug (URL)</label>
                    <input
                        type="text"
                        id="category_slug"
                        name="category_slug"
                        value={formData.category_slug}
                        onChange={handleInputChange}
                        placeholder="Vd: nha-bep, phong-tam..."
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="parent_id">Danh mục cha (tùy chọn)</label>
                    <select
                        id="parent_id"
                        name="parent_id"
                        value={formData.parent_id}
                        onChange={handleInputChange}
                    >
                        <option value="">-- Không (danh mục gốc) --</option>
                        {categories.filter(cat => !cat.parent_id).map(cat => (
                            <option key={cat.category_id} value={cat.category_id}>
                                {cat.category_name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className={styles.submitBtn}>
                    + Thêm Danh mục mới
                </button>
            </form>

            <div className={styles.tableContainer}>
                <h3>Danh sách danh mục</h3>
                {loading ? (
                    <p className={styles.loadingText}>Đang tải dữ liệu...</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Mã ID</th>
                                <th>Tên danh mục</th>
                                <th>Slug</th>
                                <th>Danh mục cha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(category => (
                                <tr key={category.category_id}>
                                    <td>
                                        <span className={styles.idBadge}>
                                            #{category.category_id}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: '500' }}>{category.category_name}</td>
                                    <td><code>{category.category_slug}</code></td>
                                    <td>{category.parent_id || <span style={{color: '#94a3b8', fontStyle: 'italic'}}>Danh mục gốc</span>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}