🍔 Food Delivery Site

A robust full-stack web application designed for food ordering and delivery management. This project features a customer-facing frontend for browsing and ordering food, a dedicated admin panel for restaurant management, and a powerful backend API.

📂 Project Structure

The repository is organized into three main directories:

backend/: The server-side application (Node.js/Express) that handles API requests, database connections, and business logic.

front-end/: The client-side application (React.js) where users can browse menus, add items to the cart, and place orders.

admin/: A specialized dashboard (React.js) for administrators to manage food items, view orders, and update order statuses.

✨ Key Features

👤 User Application (Front-end)

Authentication: User login and registration functionality.

Food Browsing: View food categories and detailed item descriptions.

Cart Management: Add/remove items and adjust quantities.

Order Placement: Secure checkout process.

Order History: View past orders and current status.

🛡️ Admin Dashboard (Admin)

Product Management: Add, edit, or delete food items and categories.

Order Management: View incoming orders and update their status (e.g., Preparing, Out for Delivery, Delivered).

User Overview: View registered users (optional).

🔙 Backend (API)

RESTful API: Structured endpoints for users, products, and orders.

Database: MongoDB integration for data persistence.

Image Storage: Handling of food image uploads (e.g., via Multer or Cloud storage).

🛠️ Tech Stack

Frontend: React.js, CSS/SCSS/Tailwind (Context API/Redux for state management).

Backend: Node.js, Express.js.

Database: MongoDB (Mongoose ODM).

Tools: Git, npm/yarn.

🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

Prerequisites

Node.js (v14 or higher)

MongoDB (Local or Atlas URL)

1. Backend Setup

Navigate to the backend folder and install dependencies:

cd backend
npm install


Configuration:
Create a .env file in the backend directory and add the following (adjust as needed):

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
# If using Stripe/Payment
STRIPE_SECRET_KEY=your_stripe_key


Run the server:

npm start
# OR for development
npm run dev


The backend should now be running on http://localhost:4000.

2. Admin Panel Setup

Open a new terminal, navigate to the admin folder, and install dependencies:

cd admin
npm install


Run the admin dashboard:

npm start
# OR
npm run dev


The admin panel usually runs on http://localhost:5173 or http://localhost:3000 (depending on Vite/CRA).

3. Frontend (User App) Setup

Open a third terminal, navigate to the front-end folder, and install dependencies:

cd front-end
npm install


Run the frontend application:

npm start
# OR
npm run dev


The user app usually runs on http://localhost:3000 or http://localhost:5174.

📡 API Endpoints (Examples)

Method

Endpoint

Description

GET

/api/food/list

Get all food items

POST

/api/food/add

Add a new food item (Admin)

POST

/api/user/login

User login

POST

/api/user/register

User registration

POST

/api/order/place

Place a new order

GET

/api/order/userOrders

Get user specific orders

🤝 Contributing

Contributions are welcome!

Fork the project.

Create your feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

Developed by Wright-Moseti200
