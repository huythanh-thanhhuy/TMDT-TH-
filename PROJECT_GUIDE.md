# E-Commerce Project - Admin Module

Dự án TMDT (Thương mại điện tử) với backend Node.js/Express và frontend React. Hệ thống quản lý danh mục sản phẩm và giá bán cho e-commerce.

## 📁 Cấu trúc Dự án

```
d:\TMDT(TH)
├── backend/              # Backend Node.js/Express
│   ├── node_modules/
│   ├── .env             # Cấu hình database
│   ├── db.js            # Kết nối SQL Server
│   ├── index.js         # Server chính với các API routes
│   ├── database-schema.sql  # Script tạo database và tables
│   ├── package.json
│   └── package-lock.json
├── frontend/             # Frontend React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── CategoryManagement.jsx
│   │   │   ├── CategoryManagement.module.css
│   │   │   ├── ProductManagement.jsx
│   │   │   ├── ProductManagement.module.css
│   │   │   ├── PriceUpdateModal.jsx
│   │   │   └── PriceUpdateModal.module.css
│   │   ├── services/
│   │   │   └── api.js   # Gọi API
│   │   ├── App.jsx      # Main App với routing
│   │   ├── App.css
│   │   ├── main.js      # Entry point React
│   │   └── style.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🚀 Cách Chạy Project

### 1. **Setup Database (SQL Server)**

Chạy script SQL để tạo database và tables. File `backend/database-schema.sql` chứa toàn bộ cấu trúc:

**Cách 1: Dùng SQL Server Management Studio**
- Mở SQL Server Management Studio
- Chọn File → Open → File...
- Mở file `backend/database-schema.sql`
- Nhấn Execute hoặc Ctrl+E

**Cách 2: Dùng Command Line (sqlcmd)**
```bash
sqlcmd -S localhost -U sa -P MatKhauCuaBan123 -i backend/database-schema.sql
```

Script sẽ tạo:
- Database: `TMDT_TH`
- Bảng USERS, CATEGORIES, STORES, PRODUCTS, PRODUCT_IMAGES, CARTS, ORDERS, ORDER_DETAILS, CART_ITEMS, REVIEWS
- Dữ liệu mẫu (optional)

### 2. **Chạy Backend**

```bash
cd backend

# Development (với auto-reload)
npm run dev

# Production
npm start
```

Server sẽ chạy trên `http://localhost:5000`

### 3. **Chạy Frontend**

Mở terminal mới:

```bash
cd frontend

npm run dev
```

App sẽ mở trên `http://localhost:5173`

## 📋 Các API Endpoints

### Categories

- **GET /api/categories** - Lấy danh sách danh mục
  - Response: `[{ category_id, category_name, category_slug, parent_id }, ...]`

- **POST /api/categories** - Thêm danh mục mới
  - Body: `{ "category_name": "Nhà bếp", "category_slug": "nha-bep", "parent_id": null }`
  - Response: `{ category_id, category_name, category_slug, parent_id }`

### Products

- **GET /api/products** - Lấy danh sách sản phẩm (kèm giá khuyến mãi)
  - Response: `[{ product_id, product_name, price, discount_price, promotion_start, promotion_end, category_name, store_name, ... }, ...]`

- **POST /api/products** - Thêm sản phẩm mới
  - Body:
    ```json
    {
      "product_name": "Chảo chống dính",
      "product_slug": "chao-chong-dinh",
      "price": 150000,
      "category_id": 1,
      "store_id": 1,
      "description": "Chảo cao cấp",
      "stock_quantity": 50
    }
    ```
  - Response: `{ product_id, product_name, product_slug, price, store_id, ... }`

- **PUT /api/products/:id/price** - Cập nhật giá & khuyến mãi
  - Body:
    ```json
    {
      "price": 150000,
      "discount_price": 120000,
      "promotion_start": "2024-12-18",
      "promotion_end": "2024-12-25"
    }
    ```
  - Response: `{ message, product_id, price, discount_price, promotion_start, promotion_end }`

## 🔧 Cấu hình Database (.env)

File `.env` trong thư mục `backend/`:

```env
DB_USER=sa
DB_PASSWORD=MatKhauCuaBan123
DB_SERVER=localhost
DB_NAME=TMDT_TH
DB_PORT=1433
```

**Thay đổi thông tin theo server SQL của bạn:**
- `DB_USER`: Username SQL Server (mặc định: sa)
- `DB_PASSWORD`: Password của user
- `DB_SERVER`: Địa chỉ server (localhost nếu máy cục bộ)
- `DB_NAME`: Tên database (TMDT_TH)
- `DB_PORT`: Port SQL Server (mặc định: 1433)

## 🎨 Frontend Features

### 1. **Trang Quản lý Danh mục** (`/`)
- Danh sách danh mục hiển thị trong bảng
- Form thêm danh mục mới (tên, slug, danh mục cha)
- Hỗ trợ danh mục con (hierarchical categories)
- Tự động load lại sau khi thêm

### 2. **Trang Quản lý Sản phẩm** (`/products`)
- Danh sách sản phẩm với giá gốc và giá khuyến mãi
- Form thêm sản phẩm (tên, slug, giá, danh mục, số lượng)
- Modal cập nhật giá & khuyến mãi:
  - Giá gốc
  - Giá khuyến mãi
  - Ngày bắt đầu khuyến mãi
  - Ngày kết thúc khuyến mãi
  - Validation: giá khuyến mãi < giá gốc

### 3. **Routing**
- `/` - Quản lý Danh mục
- `/products` - Quản lý Sản phẩm

## 📦 Dependencies

### Backend
- `express` - Web framework
- `mssql` - SQL Server driver
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `nodemon` - Auto-reload (dev)

### Frontend
- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Routing
- `axios` - HTTP client
- `vite` - Build tool

## 🛠️ Build Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Hoặc test build locally
npm run preview
```

## 📊 Database Schema

### CATEGORIES
- `category_id` (PK): Mã danh mục
- `category_name`: Tên danh mục
- `category_slug`: URL slug (unique)
- `parent_id` (FK): Danh mục cha (null = danh mục gốc)

### PRODUCTS
- `product_id` (PK): Mã sản phẩm
- `product_name`: Tên sản phẩm
- `product_slug`: URL slug (unique)
- `price`: Giá gốc
- `discount_price`: Giá khuyến mãi (nullable)
- `promotion_start`: Ngày bắt đầu khuyến mãi
- `promotion_end`: Ngày kết thúc khuyến mãi
- `stock_quantity`: Số lượng kho
- `status`: active/inactive/out_of_stock
- `store_id` (FK): Cửa hàng bán
- `category_id` (FK): Danh mục

### STORES
- `store_id` (PK): Mã cửa hàng
- `store_name`: Tên cửa hàng
- `store_slug`: URL slug
- `status`: active/inactive
- `user_id` (FK): Người quản lý

### USERS
- `user_id` (PK): Mã người dùng
- `email`: Email (unique)
- `full_name`: Tên đầy đủ
- `password_hash`: Hash mật khẩu
- `role`: admin/customer/vendor

## 🐛 Troubleshooting

### Lỗi kết nối database
```
Lỗi: Connection refused / Unable to connect
```
**Giải pháp:**
- Kiểm tra SQL Server đang chạy: `services.msc`
- Kiểm tra thông tin `.env`
- Kiểm tra firewall cho port 1433
- Đảm bảo user sa đã enable

### Frontend không tải API
```
Lỗi: Network error / 404 not found
```
**Giải pháp:**
- Kiểm tra backend đang chạy trên port 5000
- Kiểm tra CORS headers
- Mở DevTools (F12) để xem error chi tiết
- Kiểm tra URL trong `frontend/src/services/api.js`

### Port đã được sử dụng
```
Lỗi: EADDRINUSE / Port 5000 already in use
```
**Giải pháp - Backend:**
```bash
# Thay đổi PORT trong .env
PORT=5001
npm run dev
```

**Giải pháp - Frontend:**
```bash
npm run dev -- --port 5174
```

### Database không được tạo
```
Lỗi: Database 'TMDT_TH' does not exist
```
**Giải pháp:**
- Chạy lại script `database-schema.sql`
- Kiểm tra permissions của user SQL
- Xóa database cũ trước khi tạo lại:
  ```sql
  DROP DATABASE TMDT_TH;
  ```

## 📝 Ghi chú

- CORS được cấu hình để frontend có thể gọi API từ backend
- Các form đều có validation cơ bản
- Giá sử dụng kiểu DECIMAL(18, 2) để đảm bảo độ chính xác
- Promotion dates hỗ trợ DATETIME2 cho độ chính xác cao
- Danh mục hỗ trợ phân cấp (subcategories)

## 🔐 Security Notes

**Trong production:**
- Thay đổi mật khẩu SA trong SQL Server
- Sử dụng HTTPS thay vì HTTP
- Thêm authentication/authorization
- Validate input trên backend
- Hash password khi lưu user
- Sử dụng environment variables an toàn

## 📞 Support

Nếu gặp lỗi:
1. Kiểm tra lại các bước setup
2. Xem chi tiết error trong DevTools
3. Kiểm tra các log trong terminal
4. Tham khảo section Troubleshooting

