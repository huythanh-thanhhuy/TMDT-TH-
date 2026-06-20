-- =============================================
-- KHỞI TẠO CƠ SỞ DỮ LIỆU TMDT_TH
-- =============================================
CREATE DATABASE TMDT_TH;
GO

USE TMDT_TH;
GO

-- =============================================
-- 1. TẠO BẢNG GỐC (Không chứa khóa ngoại)
-- =============================================

-- Bảng USERS
CREATE TABLE USERS
(
  user_id INT IDENTITY(1,1) NOT NULL,
  email NVARCHAR(255) NOT NULL UNIQUE,
  full_name NVARCHAR(255) NOT NULL,
  password_hash NVARCHAR(255) NOT NULL,
  role NVARCHAR(20) DEFAULT 'customer' CHECK (role IN ('admin', 'customer', 'vendor')),
  created_at DATETIME2 DEFAULT GETDATE(),
  PRIMARY KEY (user_id)
);

-- Bảng CATEGORIES (Danh mục sản phẩm - Hỗ trợ danh mục con)
CREATE TABLE CATEGORIES
(
  category_id INT IDENTITY(1,1) NOT NULL,
  category_name NVARCHAR(255) NOT NULL,
  category_slug NVARCHAR(255) NOT NULL UNIQUE,
  parent_id INT NULL,
  PRIMARY KEY (category_id),
  FOREIGN KEY (parent_id) REFERENCES CATEGORIES(category_id)
);

-- =============================================
-- 2. TẠO BẢNG PHỤ THUỘC BẬC 1
-- =============================================

-- Bảng STORES (Cửa hàng / Người bán)
CREATE TABLE STORES
(
  store_id INT IDENTITY(1,1) NOT NULL,
  store_name NVARCHAR(255) NOT NULL,
  store_slug NVARCHAR(255) NOT NULL UNIQUE,
  status NVARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at DATETIME2 DEFAULT GETDATE(),
  updated_at DATETIME2 DEFAULT GETDATE(),
  user_id INT NOT NULL,
  PRIMARY KEY (store_id),
  FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
);

-- Bảng CARTS (Giỏ hàng của User)
CREATE TABLE CARTS
(
  cart_id INT IDENTITY(1,1) NOT NULL,
  user_id INT NOT NULL,
  created_at DATETIME2 DEFAULT GETDATE(),
  PRIMARY KEY (cart_id),
  FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

-- Bảng ORDERS (Đơn hàng)
CREATE TABLE ORDERS
(
  order_id INT IDENTITY(1,1) NOT NULL,
  user_id INT NOT NULL,
  order_date DATETIME2 DEFAULT GETDATE(),
  total_amount DECIMAL(18, 2) NOT NULL,
  receiver_name NVARCHAR(255) NOT NULL,
  phone_number NVARCHAR(20) NOT NULL,
  shipping_address NVARCHAR(MAX) NOT NULL,
  order_status NVARCHAR(20) DEFAULT 'pending' CHECK (order_status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_method NVARCHAR(20) NOT NULL CHECK (payment_method IN ('cod', 'credit_card', 'paypal', 'bank_transfer')),
  payment_status NVARCHAR(20) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
  created_at DATETIME2 DEFAULT GETDATE(),
  updated_at DATETIME2 DEFAULT GETDATE(),
  PRIMARY KEY (order_id),
  FOREIGN KEY (user_id) REFERENCES USERS(user_id)
);

-- =============================================
-- 3. TẠO BẢNG PHỤ THUỘC BẬC 2 & 3
-- =============================================

-- Bảng PRODUCTS (Hàng gia dụng)
CREATE TABLE PRODUCTS
(
  product_id INT IDENTITY(1,1) NOT NULL,
  product_name NVARCHAR(255) NOT NULL,
  product_slug NVARCHAR(255) NOT NULL UNIQUE,
  
  -- Quản lý giá bán (Giá thay đổi + Khuyến mãi cho Tuần 4)
  price DECIMAL(18, 2) NOT NULL,           
  discount_price DECIMAL(18, 2) NULL,      
  promotion_start DATETIME2 NULL,          
  promotion_end DATETIME2 NULL,            
  
  stock_quantity INT NOT NULL DEFAULT 0,
  description NVARCHAR(MAX),
  meta_title NVARCHAR(255),
  meta_description NVARCHAR(MAX),
  status NVARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'out_of_stock')),
  created_at DATETIME2 DEFAULT GETDATE(),
  updated_at DATETIME2 DEFAULT GETDATE(),
  store_id INT NOT NULL,
  category_id INT NOT NULL,
  PRIMARY KEY (product_id),
  FOREIGN KEY (store_id) REFERENCES STORES(store_id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES CATEGORIES(category_id)
);

-- Bảng PRODUCT_IMAGES (Hình ảnh sản phẩm)
CREATE TABLE PRODUCT_IMAGES
(
  image_id INT IDENTITY(1,1) NOT NULL,
  alt_text NVARCHAR(255),
  image_url NVARCHAR(255) NOT NULL,
  is_primary BIT DEFAULT 0,
  product_id INT NOT NULL,
  PRIMARY KEY (image_id),
  FOREIGN KEY (product_id) REFERENCES PRODUCTS(product_id) ON DELETE CASCADE
);

-- Bảng CART_ITEMS (Chi tiết giỏ hàng)
CREATE TABLE CART_ITEMS
(
  cart_item_id INT IDENTITY(1,1) NOT NULL,
  cart_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
  PRIMARY KEY (cart_item_id),
  FOREIGN KEY (cart_id) REFERENCES CARTS(cart_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES PRODUCTS(product_id)
);

-- Bảng ORDER_DETAILS (Chi tiết đơn hàng)
CREATE TABLE ORDER_DETAILS
(
  order_detail_id INT IDENTITY(1,1) NOT NULL,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(18, 2) NOT NULL, 
  PRIMARY KEY (order_detail_id),
  FOREIGN KEY (order_id) REFERENCES ORDERS(order_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES PRODUCTS(product_id)
);

-- Bảng REVIEWS (Đánh giá sản phẩm)
CREATE TABLE REVIEWS
(
  review_id INT IDENTITY(1,1) NOT NULL,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment NVARCHAR(MAX),
  created_at DATETIME2 DEFAULT GETDATE(),
  PRIMARY KEY (review_id),
  FOREIGN KEY (user_id) REFERENCES USERS(user_id),
  FOREIGN KEY (product_id) REFERENCES PRODUCTS(product_id)
);
GO

-- =============================================
-- SAMPLE DATA (Tùy chọn)
-- =============================================

-- Chèn dữ liệu USERS mẫu
INSERT INTO USERS (email, full_name, password_hash, role) VALUES
('admin@tmdt.com', 'Admin', 'hashed_password_123', 'admin'),
('vendor1@tmdt.com', 'Cửa hàng 1', 'hashed_password_456', 'vendor'),
('customer@tmdt.com', 'Khách hàng', 'hashed_password_789', 'customer');

-- Chèn dữ liệu CATEGORIES mẫu
INSERT INTO CATEGORIES (category_name, category_slug, parent_id) VALUES
('Nhà bếp', 'nha-bep', NULL),
('Phòng tắm', 'phong-tam', NULL),
('Phòng khách', 'phong-khach', NULL),
('Chảo/Nồi', 'chao-noi', 1),
('Dao/Muỗng', 'dao-muong', 1);

-- Chèn dữ liệu STORES mẫu
INSERT INTO STORES (store_name, store_slug, status, user_id) VALUES
('Cửa hàng Gia Dụng 1', 'gia-dung-1', 'active', 2);

-- Chèn dữ liệu PRODUCTS mẫu
INSERT INTO PRODUCTS (product_name, product_slug, price, discount_price, promotion_start, promotion_end, stock_quantity, description, status, store_id, category_id) VALUES
('Chảo chống dính 24cm', 'chao-chong-dinh-24cm', 150000, 120000, '2024-12-18', '2024-12-25', 50, 'Chảo chống dính cao cấp', 'active', 1, 4),
('Nồi áp suất 5L', 'noi-ap-suat-5l', 350000, 280000, '2024-12-18', '2024-12-25', 30, 'Nồi áp suất an toàn', 'active', 1, 4),
('Bộ dao nhà bếp 6 món', 'bo-dao-nha-bep-6-mon', 200000, 160000, '2024-12-18', '2024-12-25', 40, 'Bộ dao thép không gỉ', 'active', 1, 5);
GO
