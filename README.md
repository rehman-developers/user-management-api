# User Management REST API

This project is a simple **User Management REST API** built with **Node.js, Express.js, and MySQL (XAMPP)**.  
It demonstrates basic CRUD operations (Create, Read, Update, Delete) for managing user data.

---

## 🚀 Features
- Create a new user (POST)
- Fetch all users (GET)
- Fetch user by ID (GET)
- Update user by ID (PUT)
- Delete user by ID (DELETE)

---

## 🛠️ Technologies Used
- Node.js
- Express.js
- MySQL (via XAMPP)
- Postman (for API testing)

---

## ⚙️ Setup Instructions

**### 1. Clone the Repository**

git clone https://github.com/rehman-developers/user-management-api.git
cd user-management-api

**###2. Install Dependencies**
npm install
npm start

**###3. Setup Database in XAMPP**

Open phpMyAdmin → Create a new database userdb
Run this SQL script:

CREATE DATABASE userdb;
USE userdb;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  age INT NOT NULL
);

**###4. Start the Server**
npm start
Server will run at: http://localhost:3000

📡 API Routes
1.Get all users
GET /users

2.Get user by ID
GET /users/:id

3.Create new user
POST /users
Body (JSON):
{
  "name": "Ali Raza",
  "email": "ali@example.com",
  "age": 23
}

4.Update user
PUT /users/:id
Body (JSON):
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "age": 25
}

5.Delete user
DELETE /users/:id

**📸 Postman Testing Screenshots
**
Screenshots of API testing using Postman are available in the /Screenshots
get-users.png
get-user-by-id.png
post-user.png
put-user.png
delete-user.png

**🧪 Postman Collection**
The Postman collection is exported as:
Import this into Postman to test all routes directly.

