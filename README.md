# Task Management App
This is a Task Management App built using React.js with TypeScript for the frontend and Node.js (ExpressJS) with MongoDB for the backend. It allows users to register, log in, create, update, delete, and filter tasks.

# Features

User Authentication (JWT-based login & registration)

CRUD operations on tasks (Create, Read, Update, Delete)

Task status management (Pending / Completed)

Filtering tasks by status

Real-time toast notifications


# Technologies Used

# Frontend:

React.js (TypeScript)

Tailwind CSS

Axios (for API calls)

React Router DOM

React Hot Toast (for notifications)

# Backend:

Node.js with Express.js (or NestJS)

MongoDB (via Mongoose)

JWT Authentication

# How to Run the Project
git clone https://github.com/kaushalkumarkk/TaskManagment.git
cd TaskManagment

# Frontend Setup
cd frontend
npm install

# Set Up Environment Variables
Create a .env file in the frontend directory with the following:

REACT_APP_BASE_URL=http://localhost:5000/api or http://localhost:your_port/api

# Start the React App
npm start

#  Backend Setup
cd backend
npm install 

# Set Up Environment Variables
Create a .env file in the backend directory with the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

 # Start the Backend Server
 
 npm start or node server.js
