## 📦 Project Description

**Food Delivery** is a full-stack web application for ordering food online. It includes a user-facing frontend, an admin dashboard, and a backend API to manage orders, products, users, and more.

## 🚀 Technologies Used

### Frontend
- **React**: JavaScript library for building user interfaces.
- **React Router**: Handles routing between pages.
- **CSS Modules**: Scoped styling for React components.
- **Vite**: Fast build tool for frontend development.

### Backend
- **Node.js**: JavaScript runtime for server-side programming.
- **Express**: Minimal and flexible Node.js web application framework.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM for MongoDB and Node.js.
- **Stripe**: For online payments.

### Admin Dashboard
- Built with React + Vite for a unified development experience

## 🗂 Directory Structure

**food_delivery/**
```
├── **frontend**/ # User interface
│ ├── src/
│ │ ├── Assets/ # Static assets (images, fonts, media)
│ │ ├── Components/ # Reusable components
│ │ ├── Pages/ # Main pages
│ │ ├── Context/ # State management via Context API
│ ├── public/ # Static files (index.html, favicon, etc.)

├── **admin**/ # Admin dashboard
│ ├── src/
│ │ ├── Assets/ # Static assets (images, fonts, media)
│ │ ├── Components/ # Admin reusable components
│ │ ├── Pages/ # Admin pages
│ ├── public/ # Admin static assets

├── **backend**/ # Server, API, database
│ ├── routes/ # API route definitions
│ ├── models/ # Mongoose models
│ ├── controllers/ # Logic for handling requests
│ ├── upload/ # Uploaded images/files
```
**🚀 Getting Started**

- **Step 1:** Clone the Repository
git clone https://github.com/your-username/food_delivery.git

- **Step 2:** Setup Frontend
cd frontend
npm install
npm run dev

**Step 3:** Setup Admin Panel
cd ../admin
npm install
npm run dev

- **Step 4:** Setup Backend
cd ../backend
npm install
npm start  # or: node index.js

**🔐 Login Info (Demo)**
- **Username:** kieuoanh10824@gmail.com
- **Password:** 12345678

**💳 Online Payment**
- This project supports online payments via Stripe. Users can securely pay for their orders during checkout.

**🔗 Useful References**
- **ReactJS:** https://legacy.reactjs.org/docs/getting-started.html
- **React Router**: https://reactrouter.com/en/v6.3.0/getting-started/overview
- **Vite:** https://vite.dev/guide/
- **Node.js:** https://nodejs.org/docs/latest/api/
- **ExpressJS:** https://expressjs.com/en/starter/installing.html
- **MongoDB:** https://www.mongodb.com/docs/
- **Mongoose:** https://mongoosejs.com/docs/guide.html
- **GreatStack (YouTube):** https://www.youtube.com/@GreatStack

**✨ Key Features Developed**
- Online payment with Stripe
- User and admin authentication
- Product management
- Order tracking

**📌 Features to Develop Next**
- Discount and coupon system
- Email notifications after placing orders
