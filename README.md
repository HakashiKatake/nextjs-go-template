# Next.js + Go Template

A modern full-stack application template using Next.js for the frontend and Go for the backend, with Clerk authentication and MongoDB for data storage.

## Features

- **Next.js Frontend**: Modern React framework with server-side rendering
- **Go Backend**: Fast and efficient API server
- **Clerk Authentication**: Secure user authentication and management
- **MongoDB**: Document database for storing application data
- **User Sync**: Automatic synchronization of user data between Clerk and your database

## Project Structure

```
.
├── backend/                # Go backend
│   ├── config/             # Configuration settings
│   ├── handlers/           # API route handlers
│   ├── middleware/         # HTTP middleware
│   ├── models/            # Data models
│   └── main.go            # Entry point
├── frontend/              # Next.js frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── app/           # Next.js App Router
│   │   ├── components/    # React components
│   │   │   └── auth/      # Authentication components
│   │   └── api/          # API routes
│   ├── .env.local         # Environment variables
│   └── next.config.js     # Next.js configuration
└── README.md              # Project documentation
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Go](https://golang.org/dl/) (v1.20 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (or MongoDB Atlas account)
- [Clerk Account](https://clerk.com/)

## Getting Started

### Backend Setup

1. **Install Go**:

   Follow instructions at [https://golang.org/dl/](https://golang.org/dl/) to install Go for your operating system.

2. **Navigate to the backend directory**:

   ```bash
   cd backend
   ```

3. **Install dependencies**:

   ```bash
   go mod download
   ```

4. **Create a .env file in the backend directory**:

   ```
   PORT=8080
   MONGO_URI=mongodb://localhost:27017
   MONGO_DB_NAME=webapp
   CLERK_SECRET_KEY=your_clerk_secret_key
   FRONTEND_URL=http://localhost:3000
   ```

   Replace `your_clerk_secret_key` with your actual Clerk secret key from your Clerk dashboard.

5. **Start MongoDB**:

   If using local MongoDB, start your MongoDB service:

   ```bash
   # macOS (if installed via Homebrew)
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod
   ```

   Or configure your .env file to connect to MongoDB Atlas.

6. **Run the backend**:

   ```bash
   go run main.go
   ```

   The API server should now be running at http://localhost:8080.

### Frontend Setup

1. **Navigate to the frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. **Set up Clerk**:

   Sign up for a Clerk account at [https://clerk.com/](https://clerk.com/) and create a new application.

4. **Create a .env.local file in the frontend directory**:

   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

   Replace the Clerk keys with your actual keys from the Clerk dashboard.

5. **Start the frontend development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   The frontend should now be running at http://localhost:3000.

## How It Works

### Authentication Flow

1. Users sign in or sign up using Clerk on the frontend
2. The UserSync component automatically sends authenticated user data to your backend
3. The backend stores or updates user information in MongoDB
4. Backend APIs use authentication middleware to verify requests

### API Routes

#### Backend (Go)

- `GET /api/health`: Health check endpoint
- `POST /api/users`: Create or update a user
- `GET /api/users/:clerkId`: Get a user by their Clerk ID
- `GET /api/users`: List users (with pagination)

#### Frontend (Next.js)

- `/api/user/sync`: Middleware endpoint that forwards user data to backend

## Production Deployment

### Backend

1. Build the Go application:

   ```bash
   go build -o app
   ```

2. Set up environment variables on your server or container platform

3. Run the compiled binary:

   ```bash
   ./app
   ```

### Frontend

1. Build the Next.js application:

   ```bash
   npm run build
   # or
   yarn build
   # or
   pnpm build
   ```

2. Start the production server:

   ```bash
   npm start
   # or
   yarn start
   # or
   pnpm start
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.