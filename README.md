# Express TypeScript API – Users + MongoDB + Cache + Rate Limit + Async Queue

This is a production-style REST API built using **Express + TypeScript + MongoDB**.  
It demonstrates clean backend architecture with caching, rate limiting, async queue processing, MongoDB CRUD operations, and Swagger API documentation.

---

## 📌 API Endpoints

| Method | URL                 | Description             |
|--------|----------------------|-------------------------|
| GET    | /api/users          | Get all users           |
| GET    | /api/users/:id      | Get user by ID          |
| POST   | /api/users          | Create new user         |
| GET    | /api/cache/status   | Check cache status      |
| DELETE | /api/cache/clear    | Clear saved cache       |

---

# 📘 Swagger API Documentation

This project includes **Swagger UI** for API documentation.

### ✔ URL to access Swagger UI:
http://localhost:3000/api-docs

python
Copy code

### ✔ Technologies used:
- **swagger-jsdoc**
- **swagger-ui-express**

### ✔ Purpose:
- Provides a visual interface to test APIs  
- Helps understand request/response models  
- Useful for frontend developers and testing teams  
- Makes the project production-grade  


🌱 MongoDB Integration
This backend uses MongoDB + Mongoose to store user data.

User Schema
ts
Copy code
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

export default mongoose.model("User", UserSchema);
🧠 Cache Strategy (LRU + TTL)
This project implements a custom in-memory cache to reduce MongoDB load and improve response time.

✔ How It Works:
When /api/users/:id is requested:

First check cache

If exists → return cached value

Else:

Fetch from MongoDB

Store in cache for future use

✔ TTL (Time-to-Live)
Each cache entry expires after 60 seconds

✔ LRU Policy
If cache reaches the maximum limit:

Remove the least recently used entry

Benefits
Faster API responses

Reduced MongoDB calls

Better scalability

🛡 Rate Limit Logic (Custom)
Limits each client to 10 requests per minute.

Logic:
Track timestamps of each request

Remove timestamps older than 1 minute

If remaining count ≥ 10 → return 429 Too Many Requests

This protects the API from spam or DDoS-style traffic.

🔄 Async Processing (Queue System)
Some MongoDB operations simulate delay (200ms).
To ensure stability, a custom async queue is used:

Queue Flow:
Request hits endpoint

Cache is checked

If cache miss → add DB task to queue

Queue runs tasks one-by-one

DB result is cached

Response returned

This prevents race conditions and makes the API predictable.

📁 Project Folder Structure
pgsql
Copy code
express-typescript-example/
│
├── src/
│   ├── server.ts
│   ├── app.ts
│   ├── model/
│   │   └── UserModel.ts
│   ├── routes/
│   │   └── userRoutes.ts
│   ├── controllers/
│   │   └── userController.ts
│   ├── services/
│   │   ├── cacheService.ts
│   │   ├── rateLimitService.ts
│   │   └── queueService.ts
│   ├── utils/
│   │   └── delay.ts
│   └── types/
│       └── User.ts
│
├── build/ (generated after tsc)
├── tsconfig.json
├── package.json
└── README.md
🚀 Installation & Running
Install dependencies
nginx
Copy code
npm install
Create .env
ini
Copy code
MONGO_URI=your_mongodb_url
PORT=3000
Development
arduino
Copy code
npm run dev
Build TypeScript
arduino
Copy code
npm run build
Run Production
powershell
Copy code
npm start
✔ Features
Express + TypeScript architecture

MongoDB CRUD with Mongoose

Custom LRU Cache (TTL 60s)

Custom Rate-Limiter (10 req/min)

Async Queue (DB load management)

Swagger UI Documentation

Clean folder structure

Fully production-ready design