# Getting Started - Coffee Shop Application

## Quick Start (5 minutes)

### Step 1: Open Two Terminals

You'll need two terminal windows open - one for the backend server and one for the frontend.

### Step 2: Start the Backend Server

In the first terminal:
```bash
cd server
npm install
npm start
```

You should see:
```
Coffee Shop API running on http://localhost:5000
```

### Step 3: Start the Frontend App

In the second terminal:
```bash
cd client
npm install
npm start
```

The React app will automatically open in your browser at `http://localhost:3000`

## What You Can Do

1. **Browse Products**: See all coffee products categorized as Hot, Cold, or Specialty
2. **Filter by Category**: Click on category buttons to filter products
3. **Add to Cart**: Click "Add to Cart" on any product
4. **View Cart**: Click the cart button (🛒) in the header to view your items
5. **Adjust Quantities**: Use +/- buttons to change item quantities
6. **Remove Items**: Click the ✕ button to remove items
7. **Checkout**: Enter your name and email to place an order
8. **See Success**: Get confirmation when order is placed

## API Testing

You can test the API directly using curl or Postman:

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Get Hot Drinks Only
```bash
curl http://localhost:5000/api/products/category/hot
```

### Add to Cart
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": "YOUR_PRODUCT_ID", "quantity": 1}'
```

## Troubleshooting

### Port 5000 Already in Use
If you get an error about port 5000 being in use, either:
- Kill the process using that port
- Or modify the PORT in `server/server.js` to a different number

### Can't Connect to API
- Make sure the backend server is running (check the first terminal)
- Verify it's running on `http://localhost:5000`
- Check that CORS is enabled (it is by default)

### React App Not Starting
- Make sure you're in the `client` folder
- Delete `node_modules` and run `npm install` again
- Clear browser cache

## Project Structure

```
coffee-shop/
├── server/
│   ├── server.js          ← Main server file
│   └── package.json
│
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/    ← React components
│   │   │   ├── Header.js
│   │   │   ├── ProductList.js
│   │   │   ├── ProductCard.js
│   │   │   └── Cart.js
│   │   ├── App.js         ← Main React app
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## Key Files to Explore

1. **server/server.js** - Backend API endpoints and fake data
2. **client/src/App.js** - Main React component with data fetching
3. **client/src/components/ProductList.js** - Product display with filtering
4. **client/src/components/Cart.js** - Shopping cart and checkout

## Next Steps

- Customize the coffee products in `server/server.js`
- Change colors and styles in the `.css` files
- Add more product categories
- Implement search functionality
- Add product images

## Stopping the Application

- Press `Ctrl + C` in both terminal windows to stop the servers

Enjoy your coffee shop application! ☕
