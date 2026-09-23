# Event Planner Platform

A full-stack event management and media platform built with **React, Node.js, Express, MongoDB, Cloudinary, and Socket.IO**.

The platform provides authenticated users with event-related functionality, media management, user administration, and real-time messaging through a responsive web interface.

## Live Demo

**Frontend:** https://chizzyevent.netlify.app

**Backend API:** https://event-planner-ib64.onrender.com

---

## Overview

Event Planner is a production-deployed full-stack web application designed to manage event content and administrative operations from a centralized dashboard.

The application combines a React frontend with a Node.js/Express REST API and MongoDB database, while Cloudinary handles media storage and Socket.IO provides real-time communication.

The project demonstrates practical experience building and deploying a complete web application across both frontend and backend layers.

---

## Key Features

* User registration and authentication
* JWT-based authentication
* Access and refresh token system
* Password hashing with bcrypt
* Role-based authorization
* Admin dashboard
* User management
* Event management
* Media upload and management
* Cloudinary cloud storage
* Real-time messaging with Socket.IO
* Dashboard statistics
* Search and pagination for user management
* Responsive React interface
* Toast notifications
* Animated UI interactions

---

## Architecture

```text
                    ┌──────────────────────┐
                    │      React Client    │
                    │                      │
                    │  Pages / Components  │
                    │  Context / Hooks     │
                    │  API / Authentication│
                    └──────────┬───────────┘
                               │
                    REST API / Socket.IO
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │                      │
                    │ Routes               │
                    │ Middleware           │
                    │ Controllers          │
                    └───────┬───────┬──────┘
                            │       │
                            ▼       ▼
                    ┌──────────┐ ┌───────────┐
                    │ MongoDB  │ │ Cloudinary│
                    │ Mongoose │ │   Media   │
                    └──────────┘ └───────────┘
```

---

## Authentication & Authorization

The application uses JWT-based authentication with separate access and refresh tokens.

### Authentication flow

```text
User
 │
 ├── Register
 │      │
 │      └── Password hashed with bcrypt
 │
 └── Login
        │
        ├── Access Token
        │
        └── Refresh Token
                │
                └── HTTP-only Cookie
```

Protected API routes verify the access token before allowing access to restricted resources.

The application also implements role-based authorization so different users can access different functionality.

---

## Role-Based Access Control

The backend includes reusable authorization middleware for restricting routes according to user roles.

For example:

```js
roleCheck("admin", "vendor")
```

This allows authorization rules to be applied at the route level instead of duplicating permission logic throughout the application.

---

## Media Management

Media uploads are handled through the backend using **Multer** and stored using **Cloudinary**.

```text
React Client
     │
     │ multipart/form-data
     ▼
Express API
     │
     ▼
Multer
     │
     ▼
Cloudinary
     │
     ▼
MongoDB
```

The database stores the relevant media information while Cloudinary provides cloud-based media storage.

---

## Real-Time Messaging

The application uses **Socket.IO** to provide real-time communication.

When a new message is created, connected clients can receive the message without requiring a manual page refresh.

The real-time system is also used for dashboard updates such as message counts.

---

## Admin Dashboard

The administrative interface provides functionality for managing key areas of the platform, including:

* Dashboard statistics
* Messages
* Media
* Users/members
* Events
* Settings

The dashboard communicates with the backend through protected API endpoints.

---

---

## Screenshots

<p align="center">
  <img src="docs/screenshots/event_menu.png" width="30%" alt="Admin_Dashboard">
  <img src="docs/screenshots/events.png" width="30%" alt="Portfolio">
  <img src="docs/screenshots/messages.png" width="30%" alt="Admin_Real-time_Message">
  <img src="docs/screenshots/messages1.png" width="30%" alt="Message">
  <img src="docs/screenshots/messages2.png" width="30%" alt="Message">
  <img src="docs/screenshots/users.png" width="30%" alt="Users">
</p>

## Tech Stack

### Frontend

* React
* JavaScript (ES6+)
* React Router
* Axios
* SCSS
* Framer Motion
* React Hot Toast
* Socket.IO Client
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Socket.IO
* Multer
* Cloudinary
* CORS
* Cookie Parser

### Development & Deployment

* Git
* GitHub
* Netlify
* Render

---

## Project Structure

```text
event-planner-platform/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── components/
│   │   ├── config/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── utils/
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seeds/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB
* Git

You will also need a Cloudinary account if you want to use the media upload functionality.

### Clone the repository

```bash
git clone https://github.com/ifeanyiD/event-planner-platform.git

cd event-planner-platform
```

### Install frontend dependencies

```bash
cd client
npm install
```

### Install backend dependencies

```bash
cd ../server
npm install
```

---

## Environment Variables

Create a `.env` file inside the `server` directory.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_access_token_secret

JWT_REFRESH_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

CLOUDINARY_API_KEY=your_cloudinary_api_key

CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Never commit environment variables or private credentials to GitHub.

---

## Running Locally

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

The frontend can then communicate with the local Express API.

---

## API Overview

The backend is organized into resource-based routes.

```text
/api/auth
/api/users
/api/events
/api/messages
/api/stats
/api/image
```

The API follows a separation between:

```text
Routes
   ↓
Middleware
   ↓
Controllers
   ↓
Models
   ↓
MongoDB
```

This structure makes individual features easier to maintain and extend.

---

## Engineering Highlights

Some of the main engineering concepts demonstrated by this project include:

### Separation of concerns

Routes, controllers, middleware, models, configuration, and utilities are separated into their own modules.

### Authentication

JWT access tokens and refresh tokens are used to maintain authenticated sessions.

### Authorization

Reusable middleware is used to enforce role-based permissions.

### File processing

Multer handles incoming file uploads before they are sent to cloud storage.

### Real-time communication

Socket.IO enables server-to-client updates without relying exclusively on traditional HTTP requests.

### Database operations

Mongoose provides the data modeling and MongoDB interaction layer.

### Deployment

The application is deployed using separate frontend and backend environments.

---

## Future Improvements

Planned improvements include:

* Automated frontend and backend testing
* Expanded API documentation
* Improved search and filtering
* More detailed analytics
* Improved error handling and validation
* Performance optimization
* CI/CD automation
* Docker containerization
* Improved monitoring and logging

---

## What I Learned

Building this project provided practical experience working across the complete lifecycle of a web application—from designing the frontend and API architecture to authentication, database operations, cloud media storage, real-time communication, and deployment.

The project also helped strengthen my understanding of how frontend and backend systems communicate in a production environment.

---

## License

This project is intended for portfolio and educational purposes.
