# Store Rating Platform

A full-stack Store Rating Platform built using React.js, Node.js, Express.js, MySQL, and Sequelize ORM.

The platform allows users to register, log in, browse stores, submit ratings, and manage platform data using role-based access control.

---

# Features

## Authentication System

- User Signup
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Role-Based Authorization

---

# User Roles

## 1. System Administrator

Admin users can:

- Add new users
- Add new stores
- View all users
- View all stores
- Filter users by:
  - Name
  - Email
  - Address
  - Role
- Filter stores by:
  - Name
  - Email
  - Address
- Sort users and stores in ascending/descending order
- View dashboard statistics:
  - Total Users
  - Total Stores
  - Total Ratings

---

## 2. Normal User

Normal users can:

- Register an account
- Login securely
- Browse all stores
- Search and filter stores by:
  - Name
  - Address
- Submit ratings between 1–5
- Modify existing ratings
- Update password
- Logout

---

## 3. Store Owner

Store owners can:

- Login securely
- View ratings submitted for their store
- View average store rating
- Update password
- Logout

---

# Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS

## Backend

- Node.js
- Express.js
- Sequelize ORM
- JWT Authentication
- bcryptjs

## Database

- MySQL

---

# Project Structure

## Backend Structure

```bash
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── ratingController.js
│   ├── storeController.js
│   ├── storeOwnerController.js
│   └── userController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Store.js
│   └── Rating.js
│
├── routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── ratingRoutes.js
│   ├── storeRoutes.js
│   ├── storeOwnerRoutes.js
│   └── userRoutes.js
│
├── utils/
│   ├── generateToken.js
│   └── validatePassword.js
│
├── app.js
└── package.json
```

---

## Frontend Structure

```bash
frontend/
│
├── src/
│   ├── components/
│   │   ├── AdminSidebar.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Stores.jsx
│   │   ├── ManageUsers.jsx
│   │   ├── ManageStores.jsx
│   │   └── UpdatePassword.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
└── package.json
```

---

# Database Schema

## User Table

| Field | Type |
|------|------|
| id | Integer |
| name | String |
| email | String |
| password | String |
| address | String |
| role | ENUM |

---

## Store Table

| Field | Type |
|------|------|
| id | Integer |
| name | String |
| email | String |
| address | String |
| ownerId | Foreign Key |

---

## Rating Table

| Field | Type |
|------|------|
| id | Integer |
| rating | Integer |
| UserId | Foreign Key |
| StoreId | Foreign Key |

---

# API Endpoints

## Authentication Routes

### Signup

```http
POST /api/auth/signup
```

### Login

```http
POST /api/auth/login
```

---

## Store Routes

### Get All Stores

```http
GET /api/stores
```

---

## Rating Routes

### Submit Rating

```http
POST /api/ratings
```

---

## User Routes

### Update Password

```http
PUT /api/users/password
```

---

## Admin Routes

### Dashboard

```http
GET /api/admin/dashboard
```

### Add User

```http
POST /api/admin/users
```

### Add Store

```http
POST /api/admin/stores
```

### Get Users

```http
GET /api/admin/users
```

### Get Stores

```http
GET /api/admin/stores
```

---

## Store Owner Routes

### Store Owner Dashboard

```http
GET /api/store-owner/dashboard
```

---

# Form Validations

## Name

- Minimum 20 characters
- Maximum 60 characters

## Address

- Maximum 400 characters

## Password

Password must contain:

- At least 8 characters
- Maximum 16 characters
- One uppercase letter
- One special character

## Email

- Must follow standard email format

---

# Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/shreyashahi30/store-rating-platform.git
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

---

## 3. Create .env File

Create a `.env` file inside backend folder:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=store_rating_platform

JWT_SECRET=your_jwt_secret
```

---

## 4. Create MySQL Database

```sql
CREATE DATABASE store_rating_platform;
```

---

## 5. Run Backend Server

```bash
npm start
```

Backend runs on:

```bash
http://localhost:3000
```

---

## 6. Frontend Setup

```bash
cd frontend
npm install
```

---

## 7. Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Authentication Flow

1. User logs in
2. JWT token is generated
3. Token stored in localStorage
4. Axios interceptor sends token automatically
5. Protected APIs validate token
6. Role middleware authorizes access

---

# Security Features

- Password hashing using bcrypt
- JWT authentication
- Protected routes
- Role-based authorization
- Sequelize ORM protection against SQL injection

---

# Future Improvements

- Pagination
- Better frontend role protection
- Profile page
- Store details page
- Email verification
- Forgot password feature
- Docker deployment

---

# Demo Credentials

## Note:
Demo users can be added manually in the database for testing purposes.

---

## Admin Login

Email:
```bash
admin@gmail.com
```

Password:
```bash
Admin@123
```

---

## Store Owner Login

Email:
```bash
storeowner@gmail.com
```

Password:
```bash
Owner@123
```

---

## Normal User Login

Email:
```bash
user@gmail.com
```

Password:
```bash
User@123
```

---

# Author

Developed as part of Full Stack Intern Coding Challenge.
