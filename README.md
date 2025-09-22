# Campers Shop

A full-stack e-commerce web application built with **React**, **Redux Toolkit**, **RTK Query**, **Node.js**, **Express**, and **MongoDB**. The app allows users to register, login, browse products, manage their cart, and perform secure checkout using **Stripe**. Admin users can manage users, update roles, and moderate the platform.

---

## Features

- **User Authentication**
  - Register, login, and logout
  - JWT-based authentication with token persistence
  - Role-based access (user/admin)

- **Product Management**
  - Browse products with filtering
  - Product API integration with Redux Toolkit Query

- **Cart & Checkout**
  - Add, update, remove items in the cart
  - Checkout integration with Stripe
  - Order history tracking

- **Admin Features**
  - View all users
  - Update user roles
  - Moderate products

- **Error Handling**
  - Global Express error handler
  - Handles Mongoose, Zod, and custom validation errors

- **State Management**
  - Redux Toolkit with persisted auth state
  - RTK Query for API calls

---

## Admin Credentials

Use the following credentials to log in as an admin:

- **Email:** admin@admin.com  
- **Password:** admin

---

## Tech Stack

- **Frontend:** React, Redux Toolkit, RTK Query, Ant Design, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose, Zod
- **Authentication:** JWT, bcrypt
- **Payments:** Stripe API
- **Persistence:** Redux Persist (auth)
- **Deployment:** Vite (frontend), Node.js server (backend)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/devPronob/campers-shop.git
cd campers-shop
