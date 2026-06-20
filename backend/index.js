const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sql, connectDB } = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// ==================== CATEGORIES APIs ====================

// GET /api/categories - Lấy danh sách danh mục
app.get('/api/categories', async (req, res) => {
    try {
        const result = await sql.query(
            `SELECT category_id, category_name, category_slug, parent_id 
             FROM CATEGORIES 
             ORDER BY category_name`
        );
        res.json(result.recordset);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Lỗi lấy danh sách danh mục' });
    }
});

// POST /api/categories - Thêm danh mục mới
app.post('/api/categories', async (req, res) => {
    try {
        const { category_name, category_slug, parent_id } = req.body;

        if (!category_name || !category_slug) {
            return res.status(400).json({ error: 'Tên danh mục và slug không được để trống' });
        }

        const request = new sql.Request();
        request.input('category_name', sql.NVarChar, category_name);
        request.input('category_slug', sql.NVarChar, category_slug);
        request.input('parent_id', sql.Int, parent_id || null);

        const result = await request.query(
            `INSERT INTO CATEGORIES (category_name, category_slug, parent_id) 
             VALUES (@category_name, @category_slug, @parent_id);
             SELECT SCOPE_IDENTITY() AS category_id`
        );

        res.status(201).json({
            category_id: result.recordset[0].category_id,
            category_name,
            category_slug,
            parent_id: parent_id || null
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Lỗi thêm danh mục' });
    }
});

// ==================== PRODUCTS APIs ====================

// GET /api/products - Lấy danh sách sản phẩm (kèm giá gốc và giá khuyến mãi)
app.get('/api/products', async (req, res) => {
    try {
        const result = await sql.query(
            `SELECT p.product_id, p.product_name, p.product_slug, p.price, p.discount_price, 
                    p.promotion_start, p.promotion_end, p.stock_quantity, p.description, 
                    p.status, p.category_id, p.store_id,
                    c.category_name, c.category_slug,
                    s.store_name
             FROM PRODUCTS p
             LEFT JOIN CATEGORIES c ON p.category_id = c.category_id
             LEFT JOIN STORES s ON p.store_id = s.store_id
             ORDER BY p.product_id DESC`
        );
        res.json(result.recordset);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Lỗi lấy danh sách sản phẩm' });
    }
});

// POST /api/products - Thêm sản phẩm mới
app.post('/api/products', async (req, res) => {
    try {
        const { product_name, product_slug, price, category_id, store_id, description, stock_quantity } = req.body;

        if (!product_name || !product_slug || !price || !store_id) {
            return res.status(400).json({ 
                error: 'Tên sản phẩm, slug, giá và store_id không được để trống' 
            });
        }

        const request = new sql.Request();
        request.input('product_name', sql.NVarChar, product_name);
        request.input('product_slug', sql.NVarChar, product_slug);
        request.input('price', sql.Decimal(18, 2), parseFloat(price));
        request.input('category_id', sql.Int, category_id || null);
        request.input('store_id', sql.Int, store_id);
        request.input('description', sql.NVarChar, description || null);
        request.input('stock_quantity', sql.Int, stock_quantity || 0);

        const result = await request.query(
            `INSERT INTO PRODUCTS (product_name, product_slug, price, category_id, store_id, description, stock_quantity, status) 
             VALUES (@product_name, @product_slug, @price, @category_id, @store_id, @description, @stock_quantity, 'active');
             SELECT SCOPE_IDENTITY() AS product_id`
        );

        res.status(201).json({
            product_id: result.recordset[0].product_id,
            product_name,
            product_slug,
            price: parseFloat(price),
            category_id: category_id || null,
            store_id,
            description,
            stock_quantity: stock_quantity || 0
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Lỗi thêm sản phẩm' });
    }
});

// PUT /api/products/:id/price - Cập nhật giá & khuyến mãi
app.put('/api/products/:id/price', async (req, res) => {
    try {
        const { id } = req.params;
        const { price, discount_price, promotion_start, promotion_end } = req.body;

        if (!price) {
            return res.status(400).json({ error: 'Giá sản phẩm không được để trống' });
        }

        const request = new sql.Request();
        request.input('product_id', sql.Int, id);
        request.input('price', sql.Decimal(18, 2), parseFloat(price));
        request.input('discount_price', sql.Decimal(18, 2), discount_price ? parseFloat(discount_price) : null);
        request.input('promotion_start', sql.DateTime2, promotion_start || null);
        request.input('promotion_end', sql.DateTime2, promotion_end || null);

        await request.query(
            `UPDATE PRODUCTS 
             SET price = @price,
                 discount_price = @discount_price,
                 promotion_start = @promotion_start,
                 promotion_end = @promotion_end,
                 updated_at = GETDATE()
             WHERE product_id = @product_id`
        );

        res.json({
            message: 'Cập nhật giá thành công',
            product_id: id,
            price: parseFloat(price),
            discount_price: discount_price ? parseFloat(discount_price) : null,
            promotion_start,
            promotion_end
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Lỗi cập nhật giá' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên port ${PORT}`);
});
