# 🏕️ Campers Shop — Full-Stack E-Commerce Application

A fully functional **MERN + Stripe** e-commerce web application built with **React, Redux Toolkit, RTK Query, Node.js, Express, MongoDB**, and **Stripe**.  
It includes complete authentication, product management, cart, checkout, and admin controls.

---

## 🚀 Live Demo

🔗 **Frontend:** https://campers-ecom-frontend.vercel.app/  
🔗 **Backend API:** https://campers-ecom-backend.vercel.app/

---

## ✨ Features

### 🔐 User Authentication
- Register, login, logout  
- JWT authentication with refresh token  
- Persistent login  
- Role-based access (User / Admin)

### 🛒 Product Management
- Browse products  
- Sorting & filtering  
- Product API using **RTK Query**

### 🛍️ Cart & Checkout
- Add/update/remove items  
- Real-time cart state  
- Secure **Stripe checkout**  
- Order history tracking

### 🛠️ Admin Dashboard
- View all users  
- Update user roles  
- Moderate products  
- Protected admin routes

### ⚙️ Error Handling
- Global Express error handler  
- Handles **Mongoose**, **Zod**, and custom errors  

### 🧠 State Management
- Redux Toolkit  
- RTK Query for API calls  
- Redux Persist (auth)

---

## 🔐 Admin Demo Credentials

Use the following credentials to explore admin features:

- **Email:** `admin@admin.com`  
- **Password:** `admin`

---

## 🧰 Tech Stack

### Frontend
- React + Vite  
- Redux Toolkit  
- RTK Query  
- Ant Design  
- Axios  

### Backend
- Node.js  
- Express  
- MongoDB & Mongoose  
- Zod validation schema  
- JWT authentication  
- bcrypt hashing  
- Stripe payment API  

### Deployment
- **Frontend:** Vercel  
- **Backend:** Render / Vercel  

---

## 🛠️ Installation & Setup

### 1️⃣ Clone repository
```bash
git clone https://github.com/devPronob/campers-shop.git
cd campers-shop