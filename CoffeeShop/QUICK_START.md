# 🚀 Quick Start - Updated Coffee Shop with 6 New Features

## Installation

### Step 1: Install Dependencies for Client

```bash
cd client
npm install react-router-dom@6.8.0
npm install
```

### Step 2: Start Backend Server

Open Terminal 1:
```bash
cd server
npm start
```

Expected output:
```
Coffee Shop API running on http://localhost:5000
```

### Step 3: Start React App

Open Terminal 2:
```bash
cd client
npm start
```

The app will open at `http://localhost:3000`

---

## 🎯 What's New - Quick Demo

### 1. **Product Details** 
- Click any product card → See full details
- Images, description, origin, strength rating

### 2. **Reviews** 
- On product detail page → Scroll to reviews
- Submit your review with rating

### 3. **Wishlist**
- Click ❤️ in header → View saved items
- Add items to wishlist from anywhere

### 4. **Order History**
- Click 📜 in header → See past orders
- View complete order details

### 5. **Search**
- Use search bar in header
- Type coffee name or category
- See matching products

### 6. **Product Images**
- Real images on all products
- Hover effects on cards
- Large images on detail pages

---

## 🗂️ File Structure

```
coffee-shop/
├── server/
│   ├── server.js          (Enhanced with new endpoints)
│   └── package.json
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js        (+ search bar, nav buttons)
│   │   │   ├── SearchBar.js     (NEW)
│   │   │   ├── Reviews.js       (NEW)
│   │   │   ├── ProductCard.js   (updated with images)
│   │   │   └── Cart.js
│   │   │
│   │   ├── pages/
│   │   │   ├── ProductDetailPage.js   (NEW)
│   │   │   ├── WishlistPage.js        (NEW)
│   │   │   ├── OrderHistoryPage.js    (NEW)
│   │   │   └── SearchResultsPage.js   (NEW)
│   │   │
│   │   └── App.js             (Updated with routes)
│   │
│   └── package.json           (Added react-router-dom)
│
├── NEW_FEATURES.md            (Detailed feature documentation)
├── README.md                  (Original documentation)
└── GETTING_STARTED.md         (Original setup guide)
```

---

## 🔗 Navigation

**Header Buttons:**
- ☕ Logo → Home (product listing)
- 🔍 Search Bar → Search functionality
- ❤️ Wishlist → View saved items
- 📜 Orders → View order history
- 🛒 Cart → Shopping cart

**Product Cards:**
- Click anywhere → Go to details page
- Click "Add to Cart" → Add item

**Detail Pages:**
- Back button → Return to previous page

---

## 📱 Browser Navigation

| Where | Action | Result |
|-------|--------|--------|
| Home | Click product | Go to `/product/:id` |
| Product Detail | Scroll down | See reviews |
| Product Detail | Click ❤️ | Add/remove wishlist |
| Header | Click ❤️ | Go to `/wishlist` |
| Header | Type search | Go to `/search?q=query` |
| Header | Click 📜 | Go to `/orders` |
| Header | Click 🛒 | Show/hide cart on home |

---

## ⚡ API Testing

### Search Products
```bash
curl "http://localhost:5000/api/search?q=latte"
```

### Get Reviews
```bash
curl "http://localhost:5000/api/reviews/{productId}"
```

### Add Review
```bash
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "{id}",
    "customerName": "John",
    "rating": 5,
    "title": "Great!",
    "comment": "Amazing coffee"
  }'
```

### Wishlist Management
```bash
# Get wishlist
curl http://localhost:5000/api/wishlist

# Add to wishlist
curl -X POST http://localhost:5000/api/wishlist \
  -H "Content-Type: application/json" \
  -d '{"productId": "{id}"}'

# Remove from wishlist
curl -X DELETE http://localhost:5000/api/wishlist/{productId}
```

---

## ✅ Checklist Before Running

- [ ] Node.js installed
- [ ] Both `server` and `client` have `node_modules` (or ready to install)
- [ ] Port 5000 is free (backend)
- [ ] Port 3000 is free (frontend)
- [ ] Internet connection (for product images from Unsplash)

---

## 🎨 Test the Features

1. **Browse Products** - Home page with filters
2. **Click a Product** - See details page with image
3. **Add Review** - Scroll down on product page
4. **Add to Wishlist** - Click ❤️ button
5. **Search** - Type "iced" in search bar
6. **Add to Cart** - Click "Add to Cart"
7. **Checkout** - Click 🛒, then "Proceed to Checkout"
8. **View Orders** - Click 📜 to see order history

---

## 🐛 Troubleshooting

### "Cannot GET /product/..."
- Make sure React Router is installed: `npm install react-router-dom@6.8.0`

### Images not loading
- Check internet connection (Unsplash API)
- Images will show as fallback color if offline

### Search not working
- Make sure backend is running on port 5000
- Check browser console for API errors

### Cart/Wishlist not saving on refresh
- This is normal (in-memory data)
- Data resets when server restarts

---

**You're all set! Enjoy your coffee shop app! ☕✨**
