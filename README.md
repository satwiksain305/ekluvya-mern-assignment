
# Ekluvya - MERN Stack Assignment

## Project Overview

A MERN stack application that imports users from JSONPlaceholder, stores them in MongoDB Atlas, generates secure passwords, and provides JWT-based authentication.

## Technology Stack

- React.js
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcrypt
- JSON Web Token (JWT)

## Features

1. Bulk import users from JSONPlaceholder API.
2. Generate unique random passwords.
3. Hash passwords using bcrypt.
4. Prevent duplicate users using source API IDs.
5. Authenticate users using name and password.
6. Generate JWT tokens after successful login.
7. Protect user profile API.
8. Display personalized welcome dashboard.
9. Logout functionality.

## Project Structure

```text
ekluvya-task/
├── client/
│   └── src/
│       ├── pages/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
├── server/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
├── .gitignore
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd ekluvya-task
```

### 2. Backend setup

```bash
cd server
npm install
```

Create a `.env` file inside the server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret
JWT_EXPIRES_IN=1d
```

### 3. Start backend

```bash
npm run dev
```

### 4. Frontend setup

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs at:

http://localhost:5173

Backend runs at:

http://localhost:5000

## API Documentation

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/users/import | Import users |
| POST | /api/auth/login | Authenticate user |
| GET | /api/auth/me | Get logged-in user |

### Authentication

The protected profile endpoint requires:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## Source API

https://jsonplaceholder.typicode.com/users

## Security

- Passwords are hashed using bcrypt.
- JWT is used for authentication.
- Environment variables store sensitive configuration.
- Duplicate users are prevented using unique source IDs.

## Author

Ekluvya Developer Assignment
