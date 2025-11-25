# 🍔 Food Delivery Site

<div align="center">

**A robust full-stack web application for seamless food ordering and delivery management**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green.svg)](https://www.mongodb.com/)

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Endpoints](#-api-endpoints) • [Contributing](#-contributing)

</div>

---

## 🌟 About

Food Delivery Site is a complete solution for online food ordering and restaurant management. The platform features a customer-facing application for browsing menus and placing orders, a powerful admin dashboard for restaurant management, and a robust backend API that ties everything together.

## 📂 Project Structure

```
Food-Delivery-Site/
│
├── backend/                # Server-side application (Node.js/Express)
│   ├── models/            # Database Schemas (User, Food, Order)
│   ├── routes/            # API Routes
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Auth & validation
│   ├── config/            # Database & environment config
│   └── server.js          # Entry point
│
├── front-end/             # Customer-facing application (React.js)
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # UI components (Navbar, FoodCard, Cart)
│   │   ├── pages/        # Pages (Home, Menu, Checkout, Orders)
│   │   ├── context/      # State management (Context API/Redux)
│   │   └── App.js        # Main component
│   └── package.json      # Frontend dependencies
│
├── admin/                 # Admin dashboard (React.js)
│   ├── src/
│   │   ├── components/   # Admin UI components
│   │   ├── pages/        # Admin pages (Products, Orders, Users)
│   │   └── App.js        # Admin main component
│   └── package.json      # Admin dependencies
│
└── README.md             # Documentation
```

## ✨ Key Features

### 👤 User Application (Front-end)

<table>
<tr>
<td>

**🔐 Authentication**
- User registration
- Secure login system
- Session management

</td>
<td>

**🍕 Food Browsing**
- Browse food categories
- Detailed item descriptions
- High-quality food imagery

</td>
</tr>
<tr>
<td>

**🛒 Cart Management**
- Add/remove items
- Adjust quantities
- Real-time price calculations

</td>
<td>

**💳 Order Placement**
- Secure checkout process
- Multiple payment options
- Order confirmation

</td>
</tr>
<tr>
<td colspan="2">

**📜 Order History**
- View past orders
- Track current order status
- Reorder functionality

</td>
</tr>
</table>

### 🛡️ Admin Dashboard

<table>
<tr>
<td>

**📦 Product Management**
- Add new food items
- Edit existing products
- Delete items
- Manage categories

</td>
<td>

**📋 Order Management**
- View incoming orders
- Update order status
- Order filtering and search
- Status tracking (Preparing, Out for Delivery, Delivered)

</td>
</tr>
<tr>
<td colspan="2">

**👥 User Overview**
- View registered users
- User activity tracking
- Customer insights

</td>
</tr>
</table>

### 🔙 Backend (API)

- **RESTful API Architecture**: Clean, structured endpoints
- **MongoDB Integration**: Robust data persistence with Mongoose ODM
- **Image Storage**: Efficient handling of food image uploads (Multer/Cloud storage)
- **Authentication & Authorization**: JWT-based security
- **Payment Integration**: Stripe/Payment gateway support
- **Error Handling**: Comprehensive error management

## 🛠️ Tech Stack

<div align="center">

| Component | Technology |
|-----------|-----------|
| **Frontend** | React.js, CSS/SCSS/Tailwind CSS |
| **State Management** | Context API / Redux |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | JWT (JSON Web Tokens) |
| **File Upload** | Multer / Cloud Storage |
| **Payment** | Stripe API |
| **Tools** | Git, npm/yarn |

</div>

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local installation or Atlas account)
- [Git](https://git-scm.com/)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Wright-Moseti200/Food-Delivery-Site.git
   cd Food-Delivery-Site
   ```

### 1. Backend Setup

2. **Navigate to the backend folder and install dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   
   # If using Stripe/Payment Gateway
   STRIPE_SECRET_KEY=your_stripe_key
   
   # Cloud Storage (Optional)
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Run the backend server**
   ```bash
   npm start
   # OR for development with auto-restart
   npm run dev
   ```
   
   The backend should now be running on `http://localhost:4000`

### 2. Admin Panel Setup

5. **Open a new terminal, navigate to the admin folder**
   ```bash
   cd admin
   npm install
   ```

6. **Run the admin dashboard**
   ```bash
   npm start
   # OR for Vite-based setup
   npm run dev
   ```
   
   The admin panel typically runs on:
   - `http://localhost:5173` (Vite)
   - `http://localhost:3000` (Create React App)

### 3. Frontend (User App) Setup

7. **Open a third terminal, navigate to the front-end folder**
   ```bash
   cd front-end
   npm install
   ```

8. **Run the frontend application**
   ```bash
   npm start
   # OR for Vite-based setup
   npm run dev
   ```
   
   The user app typically runs on:
   - `http://localhost:3000` (Create React App)
   - `http://localhost:5174` (Vite)

## 📡 API Endpoints

### Food Items
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/food/list` | Get all food items | No |
| `POST` | `/api/food/add` | Add a new food item | Admin |
| `PUT` | `/api/food/update/:id` | Update food item | Admin |
| `DELETE` | `/api/food/delete/:id` | Delete food item | Admin |

### User Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/user/register` | User registration | No |
| `POST` | `/api/user/login` | User login | No |
| `GET` | `/api/user/profile` | Get user profile | Yes |

### Orders
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/order/place` | Place a new order | Yes |
| `GET` | `/api/order/userOrders` | Get user-specific orders | Yes |
| `GET` | `/api/order/list` | Get all orders (Admin) | Admin |
| `PUT` | `/api/order/status` | Update order status | Admin |

### Cart
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/cart/add` | Add item to cart | Yes |
| `DELETE` | `/api/cart/remove` | Remove item from cart | Yes |
| `GET` | `/api/cart/get` | Get user cart | Yes |

## 🗺️ Roadmap

- [ ] Real-time order tracking with WebSockets
- [ ] Restaurant ratings and reviews
- [ ] Delivery driver application
- [ ] Push notifications for order updates
- [ ] Advanced search and filtering
- [ ] Loyalty points and rewards system
- [ ] Mobile application (React Native)
- [ ] Multi-restaurant support

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Write clear, descriptive commit messages
- Follow the existing code style and structure
- Test your changes thoroughly
- Update documentation as needed
- Add comments for complex logic

## 🐛 Bug Reports

If you discover a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- System information (OS, Node version, etc.)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Wright Moseti**

- GitHub: [@Wright-Moseti200](https://github.com/Wright-Moseti200)
- Project Link: [Food Delivery Site](https://github.com/Wright-Moseti200/Food-Delivery-Site)

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [Multer](https://github.com/expressjs/multer)

## 💡 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check existing documentation
- Review closed issues for solutions

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by Wright Moseti

</div>
