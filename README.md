
<div align="center">

# 🐾 PetLove — Backend

### REST API for a Full-Stack Pet Discovery & Adoption Platform

A Node.js and Express API powering pet discovery, user accounts, personal pet listings, favourites, and profile management.

**[🌐 Live Application](https://petlove-frontend.vercel.app/) · [💻 Frontend Repository](https://github.com/MarinaHurricane/petlove-frontend)**

</div>

---

## 📖 About the Project

PetLove is a full-stack platform for discovering pets and managing a personalised pet profile. This repository contains its backend REST API, built with **Node.js, Express, MongoDB, and Mongoose**.

The API handles user authentication, searchable and paginated pet data, favourites and viewed pets, user-owned pet records, image uploads, and supporting content such as news, friends, and cities.

## 🛠️ Tech Stack

| Area | Technologies |
|------|--------------|
| Runtime & Framework | Node.js, Express.js 5 |
| Database & ODM | MongoDB, Mongoose |
| Authentication | Database-backed sessions, HTTP-only cookies, bcrypt, Node.js `crypto` |
| Password Recovery | JSON Web Tokens (JWT), Nodemailer, Handlebars |
| Image Handling | Multer, Cloudinary |
| Validation | Celebrate, Joi |
| API Middleware | CORS, Cookie Parser, Helmet |
| Logging & Errors | Pino HTTP, http-errors, centralised error handling |
| Development & Hosting | Nodemon, npm, Git, Render |

---

## ✨ Features

### 🐶 Pet Discovery

- Search by keywords across pet attributes
- Filter by category, species, gender, and location
- Sort by price or popularity, with a date-ordering option
- Paginate results with total result and page counts
- Retrieve individual pets and random pets by species
- Retrieve available filter options

### 🔐 Authentication & Session Management

- User registration and login
- Secure password hashing with bcrypt
- Database-backed sessions with access and refresh tokens
- HTTP-only cookies for authentication credentials
- Session refresh and logout
- Authentication middleware for protected endpoints
- Password recovery through email with time-limited JWT links

### 👤 User Profiles & Personalisation

- Retrieve and update authenticated user profiles
- Upload profile avatars to Cloudinary
- Add and remove favourite pets
- Track recently viewed pets
- Create and remove user-owned pet records
- Upload images for personal pet listings

### 📰 Supporting Content

- Retrieve news and partner information
- Retrieve cities and locations associated with pets
- Validate incoming API requests
- Return structured errors

---

## 🏗️ Architecture

The backend separates HTTP routing, controller logic, MongoDB models, validation, middleware, and supporting services.

```text
                React / Vite Frontend
                      (Vercel)
                         |
                         | HTTP Requests + Cookies
                         v
                  Express REST API
                      (Render)
                         |
                         v
                      Routes
                         |
                         v
             Validation & Authentication
                         |
                         v
                    Controllers
                         |
                         v
                   Mongoose Models
                         |
                         v
                    MongoDB Atlas

             External Integrations
                    /       \
                   v         v
             Cloudinary   Nodemailer
             Image Uploads Password Reset
```

### Project Structure

The backend is organised into separate modules:

- **Routes:** Define API endpoints and connect them to controllers
- **Controllers:** Handle application logic and responses
- **Models:** Define MongoDB schemas and relationships
- **Middleware:** Handle authentication, uploads, and errors
- **Validations:** Validate request data
- **Services:** Handle supporting functionality
- **Utils:** Shared helper functions
- **DB:** Database connection configuration

---

## 🔗 API Endpoints

All endpoints are prefixed with `/api`.

Endpoints marked 🔒 require authentication.

### Authentication — `/api/auth`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Authenticate a user |
| POST | `/logout` | Invalidate the current session |
| POST | `/refresh` | Refresh authentication credentials |
| POST | `/request-reset-password` | Request a password-reset email |
| POST | `/reset-password` | Reset a password using a token |

### Pets — `/api/pets`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Search, filter, sort, and paginate pets |
| GET | `/random/:species` | Retrieve a random pet by species |
| GET | `/categories` | Retrieve available categories |
| GET | `/gender` | Retrieve gender options |
| GET | `/species` | Retrieve species options |
| GET | `/:petId` 🔒 | Retrieve a pet by ID |
| POST | `/` 🔒 | Create a user-owned pet record |
| DELETE | `/:petId` 🔒 | Remove an owned pet |

### Example: Pet Search

```http
GET /api/pets?page=1&perPage=6&species=dog&sort=popular
```

Supported query parameters include:

| Parameter | Purpose |
|-----------|---------|
| `page` | Current page |
| `perPage` | Number of results per page |
| `search` | Keyword search |
| `category` | Filter by category |
| `species` | Filter by species |
| `location` | Filter by location |
| `gender` | Filter by gender |
| `byDate` | Date-based ordering |
| `sort` | Sorting option |

Pagination defaults to six results per page.

### User — `/api/user`

All user endpoints require authentication.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/me` | Retrieve the authenticated user |
| PATCH | `/me` | Update profile details |
| PATCH | `/me/avatar` | Upload a profile image |
| PATCH | `/me/addViewed/:petId` | Add a pet to recently viewed |
| PATCH | `/me/favorites/:petId` | Add a pet to favourites |
| DELETE | `/me/:petId` | Remove a pet from favourites |

### Other Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/news` | Retrieve news |
| GET | `/api/friends` | Retrieve friends and partner content |
| GET | `/api/cities` | Retrieve available cities |
| GET | `/api/cities/locations` | Retrieve pet-related locations |

---

## 🔐 Authentication Flow

PetLove implements **database-backed session authentication**, rather than using JWTs for normal authenticated API requests.

### How It Works

1. The user registers or logs in.
2. The backend hashes or verifies the password using bcrypt.
3. A new session is created in MongoDB.
4. Randomly generated access and refresh tokens are stored in the session.
5. The server sends authentication credentials in HTTP-only cookies.
6. Authentication middleware validates the access token and retrieves the user.
7. Expired access sessions can be refreshed using the refresh token and session ID.
8. Logout removes the database session and clears the cookies.

### Password Recovery

Password recovery uses a separate JWT-based mechanism:

1. The user requests a password reset.
2. The backend generates a time-limited JWT.
3. Nodemailer sends an email containing the reset link.
4. The backend validates the reset token.
5. The new password is hashed and saved.
6. Existing sessions are invalidated.

This separates normal session authentication from password-reset functionality.

---

## 🗄️ Database Design

PetLove uses MongoDB with Mongoose for document modelling, queries, and relationships.

### Main Models

| Model | Purpose |
|-------|---------|
| `User` | User accounts, profile information, favourites, viewed pets, and owned pets |
| `Session` | Authentication tokens and expiration timestamps |
| `Pet` | Public pet listings, categories, locations, and other attributes |
| `OwnPet` | User-created pet records |
| `City` | Location information for pet discovery |

### Data Relationships

Mongoose references connect related documents.

For example:

- Users reference their favourite pets.
- Users maintain recently viewed pet references.
- Users reference their own pet records.
- Sessions reference the authenticated user.
- Personal pet records reference their owners.

The application uses Mongoose `populate()` to retrieve related documents when building user responses.

---

## 🖼️ Image Uploads

The backend integrates **Multer and Cloudinary** for handling profile images and personal pet photos.

### Upload Workflow

1. The client sends an image using `multipart/form-data`.
2. Multer processes the uploaded file.
3. The upload middleware validates the file.
4. Cloudinary stores the image.
5. The returned image URL is saved in MongoDB.
6. The frontend receives the updated resource information.

The current upload configuration accepts image MIME types and enforces a **2 MB file-size limit**.

---

## 🛡️ Validation & Error Handling

The backend uses several tools to improve API reliability.

**Celebrate & Joi**
- Validate incoming request data
- Reject invalid inputs
- Apply consistent validation rules

**Helmet**
- Adds security-related HTTP headers

**CORS**
- Controls allowed frontend origins
- Supports credentialed requests

**Pino HTTP**
- Provides structured HTTP request logging

**Centralised Error Handling**
- Processes application errors
- Returns consistent API error responses

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- MongoDB or MongoDB Atlas
- Cloudinary account for image uploads
- SMTP credentials for password-reset emails

### 1. Clone the Repository

```bash
git clone https://github.com/MarinaHurricane/petlove-backend.git
cd petlove-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

JWT_SECRET=your_strong_password_reset_signing_secret
FRONTEND_DOMAIN=http://localhost:5173

SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASSWORD=your_smtp_password
SMTP_FROM=your_verified_sender_email
```

Replace the placeholders with your own configuration values.

**Never commit `.env` files containing credentials to GitHub.**

### 4. Start the Development Server

```bash
npm run dev
```

The API runs at:

`http://localhost:3000`

API routes are available under `/api`.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with Nodemon |
| `npm start` | Start the server using Node.js |

**Local authentication note:** The deployed cookie configuration uses `secure: true` and `sameSite: 'none'`. Local HTTP development may require environment-specific cookie settings for authentication to work correctly.

---

## ☁️ Deployment

PetLove is deployed using separate frontend and backend services.

| Component | Service |
|-----------|---------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Image Storage | Cloudinary |

The Express backend communicates with the React frontend through REST APIs and supports credentialed requests for authentication.

**[🌐 Live Application](https://petlove-frontend.vercel.app/)**

---

## 💡 Technical Highlights

Key implementation decisions and challenges include:

- Designing a modular REST API using Express controllers, routes, and middleware
- Implementing MongoDB queries with search, filtering, sorting, and pagination
- Building database-backed authentication with access and refresh sessions
- Implementing secure cookie handling and protected routes
- Managing relationships between users, favourites, viewed pets, and personal pet records
- Using Mongoose references and `populate()` for related data
- Integrating image uploads through Multer and Cloudinary
- Implementing request validation and centralised error handling
- Connecting a separately deployed React frontend to an Express backend

---

## 🔗 Related Project

### PetLove Frontend

The React and TypeScript frontend provides pet discovery, filtering, favourites, profile management, and personalised user interactions.

**[Frontend Repository](https://github.com/MarinaHurricane/petlove-frontend)**

**[Live Demo](https://petlove-frontend.vercel.app/)**

---

## 👩‍💻 Author

**Maryna Ishchenko**

[GitHub Profile](https://github.com/MarinaHurricane)

