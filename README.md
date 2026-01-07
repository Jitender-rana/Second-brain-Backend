# Second Brain – Knowledge & Link Management App

Second Brain is a full-stack web application designed to help users save, organize, and share useful links and knowledge in one place. It focuses on clean architecture, secure authentication, and scalable backend design.

## 🚀 Features

- User authentication using JWT
- Secure password hashing with bcrypt
- Create, view, and manage saved links
- Support for different content types (YouTube, Twitter, articles, etc.)
- Share your “brain” with others using public access links
- Role-based access (owner vs shared viewer)
- Clean and responsive UI

## 🧠 Why Second Brain?

Developers often save resources across multiple platforms. Second Brain centralizes everything into a single, searchable system while keeping ownership and access control intact.

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Custom reusable UI components

### Backend
- Node.js
- Express.js
- MongoDb
- JWT Authentication
- bcrypt for password security

### Database
- PostgreSQL (relational schema with user-link relationships)

## 🏗 Architecture Overview

- Stateless backend using JWT-based auth
- Clear separation between auth, content, and sharing logic
- Prisma for type-safe database access
- REST APIs following clean and predictable patterns

## 🔐 Security Considerations

- Passwords are never stored in plain text
- JWT tokens used for authentication & authorization
- Shared links do not expose private user tokens
- Proper validation on all APIs

## ⚙️ Setup Instructions

1. Clone the repository
   ```bash
   git clone <repo-url>
   cd second-brain
Install dependencies

bash
Copy code
npm install
Configure environment variables

env
Copy code
DATABASE_URL=
JWT_SECRET=
Run database migrations

bash
Copy code
npx prisma migrate dev
Start the application

bash
Copy code
npm run dev
🌱 Future Improvements
Full-text search

Tags & folders

Real-time collaboration

Redis caching

Message queue for async processing

👤 Author
Jitender Rana
Aspiring Full Stack / Backend Engineer

