# Airbnb Clone Backend

A modular and scalable backend built with Node.js, Express, and Prisma. It supports user authentication, place listings, RSVP functionality, and friend/follow relationships.

## 🧱 Features

- User registration, login, and JWT authentication
- Role-based access (USER / ADMIN)
- RSVP to places
- Friend/follow system (both mutual and one-way)
- Modular structure with services, repositories, and domain entities
- Prisma ORM with MySQL (or other DB)

## 📦 Scripts

```bash
npm install       # install dependencies
npm run dev       # run in dev mode with ts-node-dev
npm run build     # compile TypeScript
npm start         # run compiled JS
```

## ⚙️ Technologies

- Express
- Prisma
- TypeScript
- JWT
- bcrypt
- dotenv
- Rollbar (optional for error tracking)

## 🔧 Setup

1. Copy `.env.example` to `.env`
2. Configure your database connection and secrets
3. Run Prisma migration:
```bash
npx prisma migrate dev --name init
```

4. Start the app:
```bash
npm run dev
```
