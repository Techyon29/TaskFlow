# TaskFlow

TaskFlow is a premium, modern full-stack task management dashboard designed for tracking individual workflows. Originally designed as a task manager, TaskFlow has been expanded with role-based authentication, an OTP verification system, and a dedicated administrative console for managing registered platform users and system performance metrics.

---

## 🚀 Live Demo Links

*   **Live Deployed Application**: [TaskFlow on Vercel](https://task-flow-three-lilac.vercel.app)

---

## 🛠️ Tech Stack

*   **Next.js 16 (App Router)**: Handled routing, Server Component rendering, and Server API endpoints within a unified structure.
*   **React 19 & TypeScript**: Enabled robust type-safe state management, dynamic UI component handling, and custom client hooks for responsive interactivity.
*   **Tailwind CSS v4 & PostCSS**: Used to build a stunning, premium dark-theme interface with custom animations (e.g., floating layers, fade-ins), glassmorphism styles, and mobile-friendly responsive grid designs.
*   **Role-Based Middleware Security**: Implemented Jose JWT session authentication inside an Edge-compatible Next.js Middleware (`src/middleware.ts`) to secure user and admin-level zones separately.
*   **MongoDB & Mongoose**: Used as the Object Data Modeling (ODM) library to connect to the MongoDB Atlas database and enforce structured schemas for tasks, users, and OTP validation.
*   **OTP Email Authentication**: Implemented email verification via OTP during signups or password resets.
*   **Lucide React**: Leveraged for a clean, modern, and light icon design system throughout the dashboard.

---

## 💻 How to Run Locally

Follow these steps to run the application locally on your computer.

### Prerequisites
Make sure you have only **Node.js** (v18+ recommended) and `npm` installed on your machine. You will also need a **MongoDB database connection string** (either a local installation or a free cluster on MongoDB Atlas).

### Commands

Copy and paste the following commands to get started:

```bash
# 1. Clone the project repository (or navigate to the project directory)
cd taskflow

# 2. Install dependencies
npm install

# 3. Setup your environment variables
# Create a .env.local file in the root of the project and add your MongoDB connection string:
echo 'MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskflow"' > .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to access the dashboard.

### Production Build
To create an optimized production bundle and run it:
```bash
# Build the project
npm run build

# Start the server
npm run start
```

---

## 📖 API Documentation

### Task Endpoints (`/api/user/task` & `/api/user/task/[id]`)

#### 1. Get All Tasks
*   **Method**: `GET`
*   **Path**: `/api/user/task`
*   **Headers**: `token` (JWT Cookie)
*   **Response Shape (200 OK)**:
    ```json
    {
      "success": true,
      "message": "Task retrieve success",
      "task": [
        {
          "_id": "65bfa782cfdfa30012bcab11",
          "title": "Submit final report",
          "description": "Compile the financial and development metrics.",
          "due_date": "2026-06-15T00:00:00.000Z",
          "status": "incomplete",
          "createdAt": "2026-06-02T12:00:00.000Z",
          "updatedAt": "2026-06-02T12:05:00.000Z"
        }
      ]
    }
    ```

#### 2. Create Task
*   **Method**: `POST`
*   **Path**: `/api/user/task`
*   **Request Body** (JSON):
    ```json
    {
      "title": "Complete code review",
      "description": "Review pull request #12",
      "due_date": "2026-06-10T12:00:00.000Z",
      "status": "incomplete"
    }
    ```
*   **Response Shape (201 Created)**:
    ```json
    {
      "success": true,
      "message": "Task Created",
      "task": {
        "_id": "65bfa7b8cfdfa30012bcab12",
        "title": "Complete code review",
        "description": "Review pull request #12",
        "due_date": "2026-06-10T12:00:00.000Z",
        "status": "incomplete"
      }
    }
    ```

### Admin Endpoints (`/api/admin`)

#### 1. Get Dashboard Overview Stats
*   **Method**: `GET`
*   **Path**: `/api/admin/dashboard`
*   **Response Shape (200 OK)**:
    ```json
    {
      "success": true,
      "message": "Dashboard Stats Retrieve",
      "data": {
        "totalUser": 150,
        "totalTask": 890,
        "newUserCount": 8,
        "user": [...]
      }
    }
    ```

#### 2. Get User Directory (Paginated)
*   **Method**: `GET`
*   **Path**: `/api/admin/user?page=1&limit=10`
*   **Response Shape (200 OK)**:
    ```json
    {
      "success": true,
      "message": "User Data Retrieve",
      "data": [
        {
          "_id": "65bfa7b8cfdfa30012bcab12",
          "name": "Jane Doe",
          "email": "jane@example.com",
          "role": "user",
          "createdAt": "2026-06-02T12:10:00.000Z",
          "updatedAt": "2026-06-02T12:10:00.000Z"
        }
      ]
    }
    ```

---

## 📂 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router root, pages, layouts, and API routes
│   │   ├── admin/           # Admin console pages (Dashboard & User Management)
│   │   ├── api/             # Backend API endpoint routes
│   │   │   ├── admin/       # Dashboard analytics and user retrieval routes
│   │   │   ├── auth/        # Login, logout, signup, OTP, resetPassword APIs
│   │   │   └── user/        # User task routes
│   │   ├── auth/            # Auth pages (Login, Signup)
│   │   ├── user/            # User-specific dashboard pages
│   │   ├── globals.css      # Custom global CSS styles (Tailwind configurations)
│   │   └── layout.tsx       # Main layout wrapper
│   ├── components/          # Reusable React components
│   │   └── ui/              # Design System UI components
│   │       ├── admin/       # Admin sidebar navigation
│   │       └── home/        # Home/Landing UI components
│   ├── lib/                 # Third-party configurations and utils
│   │   └── utils.ts         # Utility class merger function (cn) using clsx & tailwind-merge
│   ├── middleware.ts        # Role-based route guard for admins and users
│   ├── models/              # Mongoose schema models (Task, User, OTP)
│   └── utils/               # Server-side utilities (dbConnect)
```

---

## 🤖 AI Assistance & Acceleration

This project was built and accelerated using advanced AI programming assistants:
*   **Antigravity (by Google DeepMind)**: Assisted in writing logic, designing responsive UI layouts, debugging TypeScript errors, and implementing premium dark-theme elements. This pair-programming collaboration significantly improved development speed and code quality.

---

## 🔮 Next Steps

### What to Build Next
1.  **Add notification system**: Build email alerts or in-app push notifications for tasks that are approaching due dates or are marked as overdue.
2.  **Task Categories and Labels**: Allow users to filter tasks based on custom-assigned tags or category groupings.
3.  **Analytics Page for Users**: Create charts and visualization pages showing completion ratios and weekly performance metrics.
