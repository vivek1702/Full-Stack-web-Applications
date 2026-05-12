# Meetup App 🚀

A full-stack Meetup application built using React, Node.js, Express, and MongoDB. This app allows users to view meetup events and see detailed information about each event. The project demonstrates clean frontend–backend separation, REST API design, environment variable handling, and real-world deployment using Vercel.

---

## 🌐 Deployment Links

**\*#######This links has been removed from the deployment** #################

- Frontend: https://full-stack-web-applications-78sh.vercel.app/
- Backend API: https://full-stack-web-applications-lemon.vercel.app/api/meetups

## 📌 Project Overview

The Meetup App is a learning-focused full-stack project where:

- The **backend** exposes REST APIs to manage meetup data stored in MongoDB.
- The **frontend** consumes these APIs to display meetups and their details.
- Both frontend and backend are deployed independently on Vercel.

---

## 🧱 Project Structure

```
Meetup_App/
│
├── BE/                        # Backend (Node.js + Express + MongoDB)
│   ├── models/                # Mongoose schemas for meetup data
│   ├── db/                    # MongoDB connection logic
│   ├── SeedMeetupData.js      # Script to seed initial meetup data
│   ├── meetUpSeedData.json    # Static seed data
│   ├── index.js               # Express server entry point
│   ├── package.json
│   └── .env                   # Environment variables (not committed)
│
├── FE/                        # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/            # Static assets (images, icons, etc.)
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   │   └── Application header and navigation
│   │   │
│   │   │   ├── meetupCard.jsx
│   │   │   │   ├── Renders meetup data in a card-based layout
│   │   │   │   ├── Implements search functionality (by title and tags)
│   │   │   │   ├── Implements dropdown-based filtering
│   │   │   │   └── Handles client-side data rendering logic
│   │   │
│   │   │   └── MeetupDetails.jsx
│   │   │       ├── Displays detailed meetup information
│   │   │       ├── Shows event details and description
│   │   │       ├── Renders address and location information
│   │   │       ├── Displays speaker details
│   │   │       └── Shows associated event tags
│   │   │
│   │   ├── App.jsx            # Root component with routing setup
│   │   ├── App.css            # Global app styles
│   │   ├── index.css          # Base CSS styles
│   │   ├── main.jsx           # React entry point
│   │   └── useFetch.jsx       # Custom reusable data-fetching hook
│   │
│   ├── index.html             # HTML entry file
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js         # Vite configuration
│   ├── eslint.config.js       # ESLint configuration
│   └── README.md              # Frontend documentation
│
└── .gitignore
```

---

## 🛠 Backend (BE)

### Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv

### Features

- Designed a **Meetup schema** using Mongoose
- Supports event attributes like:
  - Event title
  - Event type (online/offline)
  - Hosted by
  - Date & time
  - Location
  - Paid / free flag
  - Event description
  - Speakers

- REST APIs implemented:
  - `GET /meetups` → Fetch all meetups
  - `GET /meetups/:id` → Fetch details of a single meetup

- Seeded initial data using JSON and a seed script
- Environment variables used for sensitive credentials

### Backend Deployment

- Deployed on **Vercel**
- MongoDB hosted on **MongoDB Atlas (free tier)**
- Environment variables configured in Vercel dashboard

---

## 🎨 Frontend (FE)

### Tech Stack

- React
- Vite
- React Router DOM
- CSS

### Features

- Meetup listing page showing all events
- Meetup details page with full event information
- Dynamic routing using `useParams()`
- Custom reusable `useFetch` hook for API calls
- Loading and error state handling
- Environment-based API URL configuration

### Frontend Deployment

- Deployed on **Vercel**
- Backend API base URL managed via environment variables

---

## 🔐 Environment Variables

The project uses environment variables to keep sensitive data secure.

### Backend (`.env`)

```
MONGODB_URI=your_mongodb_connection_string
```

### Frontend (`.env`)

```
VITE_API_BASE_URL=your_backend_api_url
deployed link:
```

> Note: `.env` files are excluded from GitHub using `.gitignore`.

---

## 🌐 Deployment

- **Frontend**: Vercel
- **Backend**: Vercel
- **Database**: MongoDB Atlas

The frontend communicates with the backend using the deployed API URL.

---

## 💡 Learnings & Highlights

- Full-stack application architecture
- REST API design with Express
- MongoDB schema design using Mongoose
- Custom React hooks
- Environment variable management
- Git & GitHub best practices
- Real-world deployment and debugging on Vercel

---

## 🚀 Future Improvements

- User authentication
- RSVP / Join meetup feature
- Admin panel for managing meetups
- Pagination & search
- UI enhancements

---

## 📎 Author

**Vivek Singh**
Learning-focused full-stack development project

---

⭐ If you find this project helpful, feel free to star the repository!
