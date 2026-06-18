# 💬 Real-Time Chat Application

A full-stack real-time chat application built using React, Node.js, Express, MongoDB, JWT Authentication, and Socket.IO. Users can register, log in securely, view other users, and exchange messages in real time.

---

## 🔗 Live Demo

**Frontend (Vercel):**
[https://full-stack-web-applications-vt8q-hpltbp3zb.vercel.app/](https://full-stack-web-applications-vt8q-hpltbp3zb.vercel.app/)

**Backend API (Render):**
[https://full-stack-web-applications-2-nf6p.onrender.com](https://full-stack-web-applications-2-nf6p.onrender.com/)

**GitHub Repository:**
[https://github.com/vivek1702/Full-Stack-web-Applications](https://github.com/vivek1702/Full-Stack-web-Applications)

---

## 📸 Application Screenshots

### Login Page

> Add screenshot here

---

### Registration Page

[!register_login](./images/register_login_page.png)

---

### Chat Dashboard

> [!](./images/chat_page.png)

---

---

## 🚀 Features

### Authentication

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Token Generation
- Secure Authentication Flow

### Real-Time Communication

- Socket.IO Integration
- Real-Time Message Delivery
- Persistent Socket Connections
- Event-Based Communication

### User Management

- View Available Users
- Exclude Logged-In User from User List
- Select Users to Start Conversations

### Message Management

- Store Messages in MongoDB
- Retrieve Chat History
- Real-Time Message Updates
- Sender and Receiver Tracking

---

## 🛠 Tech Stack

### Frontend

- React.js
- Axios
- Socket.IO Client
- Bootstrap

### Backend

- Node.js
- Express.js
- Socket.IO
- JWT
- bcrypt

### Database

- MongoDB Atlas
- Mongoose

### Deployment

- Vercel
- Render

---

## 📂 Project Structure

```text
chat-app/
│
├── backend/
│   ├── models/
│   │   ├── User.model.js
│   │   └── Messages.model.js
│   │
│   ├── routes/
│   │   └── auth.js
│   │
│   ├── index.js
│   ├── package.json
│   └── .env
│
└── frontend/
    └── chat-application-frontend/
        ├── src/
        │   ├── components/
        │   ├── App.js
        │   └── index.js
        │
        ├── public/
        └── package.json
```

---

## 🔐 Authentication Flow

### User Registration

1. User submits username and password.
2. Password is hashed using bcrypt.
3. User is saved in MongoDB.
4. JWT token is generated.
5. Token is returned to the client.

### User Login

1. User enters credentials.
2. User is searched in MongoDB.
3. bcrypt compares entered password with stored hash.
4. JWT token is generated after successful validation.
5. User information and token are returned.

---

## ⚡ Real-Time Messaging Flow

### Sending Messages

```text
Client A
   ↓
Socket Emit
   ↓
Backend Socket.IO Server
   ↓
Store Message in MongoDB
   ↓
Emit to Receiver
   ↓
Client B
```

### Message Persistence

Every message is:

- Sent through WebSockets
- Stored in MongoDB
- Retrieved when users reopen the chat

This ensures messages remain available even after refreshing the application.

---

## 🌐 API Endpoints

### Authentication

#### Register User

```http
POST /auth/register
```

Request:

```json
{
  "username": "vivek",
  "password": "password123"
}
```

---

#### Login User

```http
POST /auth/login
```

Request:

```json
{
  "username": "vivek",
  "password": "password123"
}
```

---

### Users

#### Get Users

```http
GET /users
```

Query Parameters:

```text
currentUser=username
```

Example:

```http
GET /users?currentUser=vivek
```

---

### Messages

#### Get Messages

```http
GET /messages
```

Query Parameters:

```text
sender
receiver
```

Example:

```http
GET /messages?sender=vivek&receiver=john
```

---

## 📚 Key Learnings

This project helped strengthen my understanding of:

- JWT Authentication
- Password Hashing with bcrypt
- WebSockets and Socket.IO
- Real-Time Client-Server Communication
- MongoDB Data Modeling
- REST API Design
- Debugging Authentication Flows
- Deployment on Render and Vercel
- Managing Frontend and Backend Integration

A particularly valuable learning experience was debugging real-time communication and authentication issues across the frontend, backend, database, and deployment environments.

---

## 🔧 Environment Variables

Backend `.env`

```env
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

PORT=5001
```

---

## 🚀 Local Setup

### Clone Repository

```bash
git clone https://github.com/vivek1702/Full-Stack-web-Applications.git
```

### Backend Setup

```bash
cd backend

npm install

npm start
```

### Frontend Setup

```bash
cd frontend/chat-application-frontend

npm install

npm start
```

---

## 👨‍💻 Author

Vivek Singh

GitHub:
[https://github.com/vivek1702](https://github.com/vivek1702)

LinkedIn:
(Add your LinkedIn profile URL here)

---

⭐ If you found this project interesting, consider giving the repository a star.
