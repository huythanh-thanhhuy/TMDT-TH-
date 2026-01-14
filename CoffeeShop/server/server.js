
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- DATA: Coffee Products (Updated with REAL Unsplash Images) ---
// --- DATA: Coffee Products (Updated with REAL High-Quality Images) ---
const coffeeProducts = [
  {
    id: uuidv4(),
    name: 'Espresso',
    category: 'hot',
    price: 2.50,
    description: 'Strong and bold single shot of espresso',
    // Ảnh: Tách Espresso nhỏ, crema đậm
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    fullDescription: 'A single shot of pure, concentrated espresso. Rich, intense, and bold with a smooth crema layer.',
    origin: 'Brazil',
    strength: 5
  },
  {
    id: uuidv4(),
    name: 'Cappuccino',
    category: 'hot',
    price: 4.00,
    description: 'Smooth blend of espresso, steamed milk, and foam',
    // Ảnh: Cappuccino với lớp bọt dày
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
    fullDescription: 'The perfect balance of espresso, steamed milk, and velvety foam. A classic Italian favorite.',
    origin: 'Italy',
    strength: 3
  },
  {
    id: uuidv4(),
    name: 'Latte',
    category: 'hot',
    price: 4.50,
    description: 'Creamy espresso with steamed milk',
    // Ảnh: Latte art hình trái tim
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80',
    fullDescription: 'Smooth espresso combined with creamy steamed milk and a thin layer of foam.',
    origin: 'Italy',
    strength: 2
  },
  {
    id: uuidv4(),
    name: 'Americano',
    category: 'hot',
    price: 3.00,
    description: 'Espresso shots with hot water',
    // Ảnh: Cốc cà phê đen nóng
    image: 'https://images.unsplash.com/photo-1669872484166-e11b9638b50e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1lcmljYW5vJTIwY29mZmVlfGVufDB8fDB8fHww',
    fullDescription: 'Bold espresso diluted with hot water for a smooth, less intense coffee experience.',
    origin: 'USA',
    strength: 4
  },
  {
    id: uuidv4(),
    name: 'Mocha',
    category: 'hot',
    price: 4.75,
    description: 'Espresso with steamed milk and chocolate',
    // Ảnh: Cốc mocha có rắc bột cacao
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=80',
    fullDescription: 'Delicious blend of espresso, steamed milk, and rich chocolate. A treat for chocolate lovers!',
    origin: 'Austria',
    strength: 2
  },
  {
    id: uuidv4(),
    name: 'Iced Coffee',
    category: 'cold',
    price: 3.50,
    description: 'Cold brewed coffee over ice',
    // Ảnh: Ly cà phê đá
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    fullDescription: 'Refreshing cold brew coffee served over ice. Perfect for warm days.',
    origin: 'USA',
    strength: 3
  },
  {
    id: uuidv4(),
    name: 'Iced Latte',
    category: 'cold',
    price: 4.25,
    description: 'Espresso with cold milk and ice',
    // Ảnh: Ly latte đá phân tầng
    image: 'https://plus.unsplash.com/premium_photo-1677607237294-b041e4b57391?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SWNlZCUyMExhdHRlfGVufDB8fDB8fHww',
    fullDescription: 'Smooth espresso with cold milk and ice. Creamy and refreshing.',
    origin: 'Italy',
    strength: 2
  },
  {
    id: uuidv4(),
    name: 'Cold Brew',
    category: 'cold',
    price: 3.75,
    description: 'Smooth cold brewed concentrate',
    // Ảnh: Chai cold brew
    image: 'https://plus.unsplash.com/premium_photo-1671088575920-09f2a5970574?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q29sZCUyMEJyZXd8ZW58MHx8MHx8fDA%3D',
    fullDescription: 'Smooth, mellow cold brew concentrate. Less acidic and naturally sweet.',
    origin: 'USA',
    strength: 4
  },
  {
    id: uuidv4(),
    name: 'Seasonal Blend',
    category: 'specialty',
    price: 5.00,
    description: 'Our special seasonal coffee blend',
    // Ảnh: Hạt cà phê nghệ thuật
    image: 'https://plus.unsplash.com/premium_photo-1669880504259-93586025a91b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2Vhc29uYWwlMjBCbGVuZHxlbnwwfHwwfHx8MA%3D%3D',
    fullDescription: 'Limited edition seasonal blend featuring hand-selected beans from around the world.',
    origin: 'Various',
    strength: 4
  },
  {
    id: uuidv4(),
    name: 'Vanilla Latte',
    category: 'specialty',
    price: 4.75,
    description: 'Latte with vanilla syrup',
    // Ảnh: Latte có hoa hồi/vani
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
    fullDescription: 'Creamy latte infused with aromatic vanilla syrup. Sweet and delicious.',
    origin: 'Italy',
    strength: 2
  },
  {
    id: uuidv4(),
    name: 'Macchiato',
    category: 'hot',
    price: 3.75,
    description: 'Espresso marked with milk foam',
    // Ảnh: Tách macchiato nhỏ
    image: 'https://media.istockphoto.com/id/2212070933/fr/photo/savoureux-latte-macchiato-en-verre-sur-une-table-en-marbre-gros-plan-boisson-au-caf%C3%A9.webp?a=1&b=1&s=612x612&w=0&k=20&c=KxVEzJdaB6cJGYNQcp2LwxguDIItxJvbemO0zARzMpE=',
    fullDescription: 'Bold espresso "marked" with a small amount of milk foam. Strong and concentrated.',
    origin: 'Italy',
    strength: 5
  },
  {
    id: uuidv4(),
    name: 'Flat White',
    category: 'hot',
    price: 4.50,
    description: 'Silky smooth espresso with microfoam',
    // Ảnh: Flat white nghệ thuật
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80',
    fullDescription: 'Premium espresso topped with perfectly steamed milk and fine microfoam. Velvety smooth.',
    origin: 'Australia',
    strength: 4
  },
  {
    id: uuidv4(),
    name: 'Affogato',
    category: 'specialty',
    price: 5.25,
    description: 'Vanilla ice cream drowned in hot espresso',
    // Ảnh: Kem và cà phê
    image: 'https://media.istockphoto.com/id/476824782/fr/photo/caf%C3%A9-latte.webp?a=1&b=1&s=612x612&w=0&k=20&c=geDaV-lBxlaHlq3IPiDidl0y50JUj3ypS-6CdLBg9-4=',
    fullDescription: 'A delightful Italian dessert combining creamy vanilla ice cream with a shot of hot espresso.',
    origin: 'Italy',
    strength: 3
  },
  {
    id: uuidv4(),
    name: 'Cortado',
    category: 'hot',
    price: 3.50,
    description: 'Equal parts espresso and steamed milk',
    // Ảnh: Ly thủy tinh nhỏ cortado
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    fullDescription: 'Perfectly balanced espresso and steamed milk. The best of both worlds in equal measure.',
    origin: 'Spain',
    strength: 4
  },
  {
    id: uuidv4(),
    name: 'Iced Americano',
    category: 'cold',
    price: 3.50,
    description: 'Espresso shots with cold water and ice',
    // Ảnh: Ly đen đá sảng khoái
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
    fullDescription: 'Refreshing cold version of the classic Americano. Bold and crisp with ice.',
    origin: 'USA',
    strength: 4
  },
  {
    id: uuidv4(),
    name: 'Caramel Macchiato',
    category: 'specialty',
    price: 5.00,
    description: 'Macchiato with caramel and whipped cream',
    // Ảnh: Ly có sốt caramel chảy
    image: 'https://images.unsplash.com/photo-1662047102608-a6f2e492411f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2FyYW1lbCUyME1hY2NoaWF0b3xlbnwwfHwwfHx8MA%3D%3D',
    fullDescription: 'Delicious blend of espresso, steamed milk, caramel sauce, and whipped cream.',
    origin: 'USA',
    strength: 2
  },
  {
    id: uuidv4(),
    name: 'Lungo',
    category: 'hot',
    price: 2.75,
    description: 'Long espresso with more water',
    // Ảnh: Tách espresso đầy đặn hơn
    image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&w=600&q=80',
    fullDescription: 'A longer version of espresso with more water, creating a milder yet flavorful cup.',
    origin: 'Italy',
    strength: 3
  },
  {
    id: uuidv4(),
    name: 'Iced Vanilla Coffee',
    category: 'cold',
    price: 4.00,
    description: 'Cold coffee with vanilla and milk',
    // Ảnh: Iced coffee màu sữa sáng
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80',
    fullDescription: 'Refreshing iced coffee flavored with smooth vanilla syrup and chilled milk.',
    origin: 'USA',
    strength: 2
  },
  {
    id: uuidv4(),
    name: 'Espresso Con Panna',
    category: 'specialty',
    price: 3.50,
    description: 'Espresso topped with whipped cream',
    // Ảnh: Espresso có kem tươi
    image: 'https://plus.unsplash.com/premium_photo-1675435646209-24c008f31d92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RXNwcmVzc28lMjBDb24lMjBQYW5uYXxlbnwwfHwwfHx8MA%3D%3D',
    fullDescription: 'Bold espresso shot topped with a dollop of sweet whipped cream.',
    origin: 'Italy',
    strength: 5
  },
  {
    id: uuidv4(),
    name: 'Ristretto',
    category: 'hot',
    price: 2.50,
    description: 'Short and concentrated espresso shot',
    // Ảnh: Tách espresso rất ít nước, đậm đặc
    image: 'https://media.istockphoto.com/id/2215411866/fr/photo/tasse-%C3%A0-caf%C3%A9-et-grains-de-caf%C3%A9-sur-table-en-bois-tasse-%C3%A0-caf%C3%A9-espresso-crema-aromatique.webp?a=1&b=1&s=612x612&w=0&k=20&c=muY-TzRVYPicL2wpGcAmnueAAnqkz_oVYD2rb78ImHs=',
    fullDescription: 'A shorter, more concentrated espresso shot with intense flavor and crema.',
    origin: 'Italy',
    strength: 5
  },
  {
    id: uuidv4(),
    name: 'Honey Oat Latte',
    category: 'specialty',
    price: 4.75,
    description: 'Latte with oat milk and honey drizzle',
    // Ảnh: Latte màu sáng, cảm giác organic
    image: 'https://images.unsplash.com/photo-1626595444746-59219e6838ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEhvbmV5JTIwT2F0JTIwTGF0dGV8ZW58MHx8MHx8fDA%3D',
    fullDescription: 'Creamy oat milk latte sweetened with natural honey. Vegan-friendly and delicious.',
    origin: 'Scandinavia',
    strength: 2
  },
  {
    id: uuidv4(),
    name: 'Nitro Cold Brew',
    category: 'cold',
    price: 4.50,
    description: 'Cold brew infused with nitrogen gas',
    // Ảnh: Ly nitro có lớp bọt mịn dày như bia
    image: 'https://images.unsplash.com/photo-1644764399224-f7d18b1e8d1c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bml0cm8lMjBjb2xkJTIwYnJld3xlbnwwfHwwfHx8MA%3D%3D',
    fullDescription: 'Smooth cold brew infused with nitrogen for a creamy head and velvety texture.',
    origin: 'USA',
    strength: 4
  },
  {
    id: uuidv4(),
    name: 'Irish Coffee',
    category: 'hot',
    price: 5.50,
    description: 'Hot coffee with Irish whiskey and cream',
    // Ảnh: Ly thủy tinh chân cao có kem
    image: 'https://images.unsplash.com/photo-1515442261605-65987783cb6a?auto=format&fit=crop&w=600&q=80',
    fullDescription: 'Classic Irish coffee with smooth whiskey, hot coffee, sugar, and whipped cream on top.',
    origin: 'Ireland',
    strength: 4
  },
  {
    id: uuidv4(),
    name: 'Turkish Coffee',
    category: 'hot',
    price: 3.25,
    description: 'Traditional thick and aromatic coffee',
    // Ảnh: Ấm đồng và tách nhỏ họa tiết
    image: 'https://plus.unsplash.com/premium_photo-1732818133657-f118e2b7c11f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VHVya2lzaCUyMENvZmZlZXxlbnwwfHwwfHx8MA%3D%3D',
    fullDescription: 'Traditional Turkish coffee brewed in a cezve, thick, aromatic, and full-bodied.',
    origin: 'Turkey',
    strength: 5
  },
  {
    id: uuidv4(),
    name: 'Café au Lait',
    category: 'hot',
    price: 4.00,
    description: 'Coffee mixed with hot milk',
    // Ảnh: Bát to hoặc tách rộng miệng
    image: 'https://plus.unsplash.com/premium_photo-1671379526961-1aebb82b317b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2FmJUMzJUE5JTIwYXUlMjBMYWl0fGVufDB8fDB8fHww',
    fullDescription: 'French-style coffee made with equal parts strong coffee and hot milk.',
    origin: 'France',
    strength: 2
  },
  {
    id: uuidv4(),
    name: 'Vietnamese Iced Coffee',
    category: 'cold',
    price: 4.50,
    description: 'Drip coffee with sweetened condensed milk',
    // Ảnh: Phin cà phê hoặc ly nâu đá phân tầng
    image: 'https://images.unsplash.com/photo-1558722141-76ef6ca013be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VmlldG5hbWVzZSUyMEljZWQlMjBDb2ZmZWV8ZW58MHx8MHx8fDA%3D',
    fullDescription: 'Strong Vietnamese coffee brewed over sweetened condensed milk with ice.',
    origin: 'Vietnam',
    strength: 4
  },
  {
    id: uuidv4(),
    name: 'Dalgona Coffee',
    category: 'specialty',
    price: 4.75,
    description: 'Whipped coffee foam over milk',
    // Ảnh: Lớp bọt cà phê dày màu nâu sáng bên trên sữa trắng
    image: 'https://images.unsplash.com/photo-1687467110633-8e90cecd042b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RGFsZ29uYSUyMENvZmZlZXxlbnwwfHwwfHx8MA%3D%3D',
    fullDescription: 'Trendy whipped coffee foam served over cold or hot milk.',
    origin: 'Korea',
    strength: 3
  }
];

// --- Fake storage variables ---
let userCart = [];
let orders = [];
let userWishlist = [];
let reviews = [
  {
    id: '1',
    productId: coffeeProducts[0].id, // Gán tạm vào Espresso để test
    customerName: 'John Coffee',
    rating: 5,
    title: 'Best espresso ever!',
    comment: 'Amazing quality and taste. Highly recommend!',
    date: '2025-12-15'
  },
  {
    id: '2',
    productId: coffeeProducts[1].id, // Gán tạm vào Cappuccino
    customerName: 'Sarah Bean',
    rating: 4,
    title: 'Great cappuccino',
    comment: 'Love the smooth blend. Great service too.',
    date: '2025-12-10'
  }
];

// --- ROUTES ---

// Get all products
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    data: coffeeProducts
  });
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const product = coffeeProducts.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  res.json({
    success: true,
    data: product
  });
});

// Get products by category
app.get('/api/products/category/:category', (req, res) => {
  const products = coffeeProducts.filter(p => p.category === req.params.category);
  res.json({
    success: true,
    data: products
  });
});

// Get cart
app.get('/api/cart', (req, res) => {
  res.json({
    success: true,
    data: userCart,
    total: userCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  });
});

// Add to cart
app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;
  const product = coffeeProducts.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  const existingItem = userCart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity || 1;
  } else {
    userCart.push({
      ...product,
      quantity: quantity || 1,
      cartItemId: uuidv4()
    });
  }

  res.json({
    success: true,
    message: 'Added to cart',
    data: userCart
  });
});

// Remove from cart
app.delete('/api/cart/:cartItemId', (req, res) => {
  userCart = userCart.filter(item => item.cartItemId !== req.params.cartItemId);
  res.json({
    success: true,
    message: 'Removed from cart',
    data: userCart
  });
});

// Update cart item quantity
app.put('/api/cart/:cartItemId', (req, res) => {
  const { quantity } = req.body;
  const item = userCart.find(item => item.cartItemId === req.params.cartItemId);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Cart item not found'
    });
  }

  if (quantity <= 0) {
    userCart = userCart.filter(i => i.cartItemId !== req.params.cartItemId);
  } else {
    item.quantity = quantity;
  }

  res.json({
    success: true,
    data: userCart
  });
});

// Clear cart
app.delete('/api/cart', (req, res) => {
  userCart = [];
  res.json({
    success: true,
    message: 'Cart cleared',
    data: userCart
  });
});

// Create order (checkout)
app.post('/api/orders', (req, res) => {
  const { customerName, email } = req.body;

  if (userCart.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Cart is empty'
    });
  }

  const order = {
    id: uuidv4(),
    orderId: `ORD-${Date.now()}`,
    customerName,
    email,
    items: userCart,
    total: userCart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    status: 'completed',
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  userCart = [];

  res.json({
    success: true,
    message: 'Order placed successfully',
    data: order
  });
});

// Get all orders
app.get('/api/orders', (req, res) => {
  res.json({
    success: true,
    data: orders
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Wishlist endpoints
app.get('/api/wishlist', (req, res) => {
  res.json({
    success: true,
    data: userWishlist
  });
});

app.post('/api/wishlist', (req, res) => {
  const { productId } = req.body;
  const product = coffeeProducts.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  const exists = userWishlist.find(item => item.id === productId);
  if (!exists) {
    userWishlist.push(product);
  }

  res.json({
    success: true,
    message: 'Added to wishlist',
    data: userWishlist
  });
});

app.delete('/api/wishlist/:productId', (req, res) => {
  userWishlist = userWishlist.filter(item => item.id !== req.params.productId);
  res.json({
    success: true,
    message: 'Removed from wishlist',
    data: userWishlist
  });
});

// Reviews endpoints
app.get('/api/reviews/:productId', (req, res) => {
  const productReviews = reviews.filter(r => r.productId === req.params.productId);
  const avgRating = productReviews.length > 0 
    ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
    : 0;

  res.json({
    success: true,
    data: productReviews,
    averageRating: parseFloat(avgRating),
    totalReviews: productReviews.length
  });
});

app.post('/api/reviews', (req, res) => {
  const { productId, customerName, rating, title, comment } = req.body;

  if (!productId || !customerName || !rating) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }

  const newReview = {
    id: uuidv4(),
    productId,
    customerName,
    rating: parseInt(rating),
    title: title || 'No title',
    comment: comment || '',
    date: new Date().toISOString().split('T')[0]
  };

  reviews.push(newReview);

  res.json({
    success: true,
    message: 'Review added successfully',
    data: newReview
  });
});

// Search endpoint
app.get('/api/search', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  
  if (!query) {
    return res.json({
      success: true,
      data: []
    });
  }

  const results = coffeeProducts.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );

  res.json({
    success: true,
    data: results
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Coffee Shop API running on http://localhost:${PORT}`);
});

