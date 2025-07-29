# 🛒 Grocery Web App

A full-stack grocery web application that allows users to browse products, add to cart, and place orders. The app also provides seller/admin functionalities to manage inventory and orders efficiently.

---

## 🚀 Features

### 👤 User Side
- User registration and login
- Browse groceries with images, prices, and descriptions
- Add/remove items from the shopping cart
- Place orders
- Responsive and user-friendly UI

### 🔐 Admin/Seller Side
- Admin login panel
- Add/Edit/Delete products
- View and manage orders
- Product stock tracking

---

## 🛠️ Tech Stack

| Layer        | Technology                       |
|-------------|----------------------------------|
| Frontend    |  HTML, CSS, JavaScript           |
| Backend     | Node.js, Express.js              |
| Database    | MySQL                            |
| Auth        | JWT-based Authentication         |
| Styling     | Bootstrap / Custom CSS           |

---

## 📁 Project Structure
Grocery_Web-App
- GMS/
|── client/ 
├── server.js # Node + Express Server
├── routes/ # Express Routes
├── models/ # MongoDB Models
├── package.json
├── .gitignore
├── README.md

## ⚙️ Setup & Run Locally
### 🖥️ Steps

```bash
# 1. Clone the repo
git clone https://github.com/uborkar/Grocery_Web-App.git

# 2. Navigate to project directory
cd Grocery_Web-App

# 3. Install dependencies
npm install

# 4. Start backend server
node server.js

# 5. Run With Live Server
vs code open with live server
