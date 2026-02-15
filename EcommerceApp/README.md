🛒 Full-Stack E-Commerce Application

A fully functional E-Commerce web application built using the MERN stack.
This project focuses on real-world ecommerce architecture, clean state management, and complete frontend-backend integration.

🌐 Live Demo
🔗 Frontend (Deployed on Vercel)

👉 https://full-stack-web-applications-dsgh.vercel.app/

🔗 Backend APIs (Deployed on Vercel)

Products API
👉 https://full-stack-web-applications-6mlh.vercel.app/api/products

Orders API
👉 https://full-stack-web-applications-6mlh.vercel.app/api/orders

🚀 Tech Stack

Frontend

React.js

Context API (State Management)

React Router

Bootstrap

LocalStorage (Cart persistence)

Backend

Node.js

Express.js

MongoDB

Mongoose

🔥 Features
🏠 Home Page

Responsive Navbar

Product Search Functionality

Category Filter

Price Filter

Dynamic Product Listing from Backend

📄 Product Details Page

Product data fetched via API

Size selection logic

Add to Cart

Add to Wishlist

🛒 Smart Cart

Increase / Decrease Quantity

Real-time price recalculation

Percentage-based discount logic

Delivery charge handling

Move to Wishlist

Remove from Cart

Persistent cart using LocalStorage

Cart auto-clears after successful order

❤️ Wishlist

Add / Remove Products

Move to Cart without duplication

🏠 Address Management

Add new address

Fetch saved addresses

Select address during checkout

Address snapshot stored in order (immutable order design)

📦 Checkout System

Cart → Address Selection → Order Summary → Place Order

Dynamic total calculation

Discount + delivery charge logic

Backend validation before order creation

Cart clears only after successful API response

🔐 Backend APIs

Product Model

Address Model

Order Model

REST APIs:

Fetch products

Add product

Delete product

Fetch addresses

Add address

Create order

Fetch orders

Proper async/await handling and error management implemented.

🧠 Architecture Decisions

Used Context API for global cart & wishlist state

Avoided direct state mutation

Implemented correct discount calculation logic

Stored order address snapshot instead of reference

Cleared cart only after successful backend response

Persistent cart using LocalStorage

1️⃣ Clone Repository
git clone https://github.com/vivek1702/Full-Stack-web-Applications
cd EcommerceApp

2️⃣ Backend Setup
cd backend
npm install
npm start


Make sure to create a .env file with:

MONGO_URI=your_mongodb_connection_string
PORT=3000

3️⃣ Frontend Setup
cd frontend/my-vite-project
npm install
npm run dev


👨‍💻 Author

Vivek Singh
Full Stack Developer



