# Coffee Shop Application

A full-stack coffee shop e-commerce application built with React, Node.js/Express, and fake data (no backend database required).

## Features

- ☕ Browse coffee products (Hot, Cold, Specialty)
- 🛒 Add items to shopping cart
- 📊 Manage cart quantities
- 💳 Checkout system with customer info
- 📱 Responsive design
- 🎨 Beautiful UI with coffee-themed styling

## Tech Stack

### Frontend
- **React 18** - UI library
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin requests
- **UUID** - Unique ID generation

## Project Structure

```
coffee-shop/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── ProductList.js
│   │   │   ├── ProductCard.js
│   │   │   └── Cart.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── server/                # Node.js/Express backend
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Setup Instructions

### 1. Install Dependencies

#### Backend (Node.js)
```bash
cd server
npm install
```

#### Frontend (React)
```bash
cd client
npm install
```

### 2. Start the Server

Open a terminal and navigate to the server folder:
```bash
cd server
npm start
```

The API will be running on `http://localhost:5000`

### 3. Start the React App

Open a new terminal and navigate to the client folder:
```bash
cd client
npm start
```

The app will open at `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category

### Shopping Cart
- `GET /api/cart` - Get current cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:cartItemId` - Update item quantity
- `DELETE /api/cart/:cartItemId` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Orders
- `POST /api/orders` - Create order (checkout)
- `GET /api/orders` - Get all orders

### Health
- `GET /api/health` - Health check

## Available Product Categories

- **Hot Drinks**: Espresso, Cappuccino, Latte, Americano, Mocha
- **Cold Drinks**: Iced Coffee, Iced Latte, Cold Brew
- **Specialty**: Seasonal Blend, Vanilla Latte

## Sample Data

All data is fake and stored in memory. The application includes:
- 10 pre-loaded coffee products
- In-memory shopping cart
- Order history storage

## Development

### Adding More Products

Edit `server/server.js` and add items to the `coffeeProducts` array:

```javascript
{
  id: uuidv4(),
  name: 'Your Coffee Name',
  category: 'hot|cold|specialty',
  price: 4.50,
  description: 'Description here',
  image: 'image.jpg'
}
```

### Customizing Styles

All component styles are in the `client/src/components/` folder. Modify the `.css` files to customize appearance.

## Features Implemented

✅ Product listing with filtering
✅ Add to cart functionality
✅ Cart management (add, remove, update quantity)
✅ Checkout form
✅ Order completion
✅ Responsive design
✅ Fake data (no database)

## Future Enhancements

- User authentication
- Order history for users
- Product reviews/ratings
- Inventory management
- Payment integration
- Admin dashboard
- Search functionality
- Product images
- Email notifications

## Notes

- No database is used; all data is stored in memory
- Cart and orders reset when the server restarts
- This is a demo application for learning purposes

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
