# TaskFlow

TaskFlow is a premium, modern full-stack task management dashboard designed for tracking individual workflows. For this project, I chose the **Task Management Application with Database Integration** exercise, implementing a responsive front-end dashboard coupled with a robust REST API backed by MongoDB. The application allows users to seamlessly create, edit, search, filter, and delete tasks while maintaining a clean, glassmorphic UI with real-time status transitions (New, Active, Complete), dynamic metrics, due-date flags (e.g., Overdue, Due Today), and interactive feedback.

---

## 🚀 Live Demo Links

*   **Live Deployed Application**: [TaskFlow on Vercel](https://task-flow-three-lilac.vercel.app)

---

## 🛠️ Tech Stack

*   **Next.js 16 (App Router)**: Handled routing, Server Component rendering, and Server API endpoints within a unified structure to simplify database and frontend interactions.
*   **React 19 & TypeScript**: Enabled robust type-safe state management, dynamic UI component handling, and custom client hooks for responsive interactivity.
*   **Tailwind CSS v4 & PostCSS**: Used to build a stunning, premium dark-theme interface with custom animations (e.g., floating layers, fade-ins), glassmorphism styles, and mobile-friendly responsive grid designs.
*   **Mongoose & MongoDB**: Employed as the Object Data Modeling (ODM) library to connect to the MongoDB Atlas database and enforce a structured schema for task creation.
*   **Lucide React**: Leveraged for a clean, modern, and light icon design system throughout the dashboard.
*   **Clsx & Tailwind Merge**: Integrated in a custom `cn` utility to handle conditional classes cleanly without layout/styling conflicts.

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

All backend API routes reside under `/api/task`.

### 1. Get All Tasks
*   **Method**: `GET`
*   **Path**: `/api/task`
*   **Request Body**: None
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
          "status": "active",
          "createdAt": "2026-06-02T12:00:00.000Z",
          "updatedAt": "2026-06-02T12:05:00.000Z",
          "__v": 0
        }
      ]
    }
    ```

### 2. Create Task
*   **Method**: `POST`
*   **Path**: `/api/task`
*   **Request Body** (JSON):
    ```json
    {
      "title": "Complete code review",       // Required (string)
      "description": "Review pull request #12", // Optional (string)
      "due_date": "2026-06-10T12:00:00.000Z",   // Optional (ISO date string)
      "status": "new"                           // Required (string: 'new' | 'active' | 'complete' | 'New' | 'Active' | 'Complete')
    }
    ```
*   **Response Shape (210 Created / 201)**:
    ```json
    {
      "success": true,
      "message": "Task Created",
      "task": {
        "_id": "65bfa7b8cfdfa30012bcab12",
        "title": "Complete code review",
        "description": "Review pull request #12",
        "due_date": "2026-06-10T12:00:00.000Z",
        "status": "new",
        "createdAt": "2026-06-02T12:10:00.000Z",
        "updatedAt": "2026-06-02T12:10:00.000Z",
        "__v": 0
      }
    }
    ```
*   **Response Shape (400 Bad Request)**:
    ```json
    {
      "success": false,
      "message": "Title and status is required"
    }
    ```

### 3. Update Task
*   **Method**: `PUT`
*   **Path**: `/api/task/[id]`
*   **Request Body** (JSON - all fields optional):
    ```json
    {
      "title": "Updated Task Title",
      "description": "Updated Task Description",
      "due_date": "2026-06-12T00:00:00.000Z",
      "status": "complete"
    }
    ```
*   **Response Shape (200 OK)**:
    ```json
    {
      "success": true,
      "message": "Task Updated",
      "task": {
        "_id": "65bfa7b8cfdfa30012bcab12",
        "title": "Updated Task Title",
        "description": "Updated Task Description",
        "due_date": "2026-06-12T00:00:00.000Z",
        "status": "complete",
        "createdAt": "2026-06-02T12:10:00.000Z",
        "updatedAt": "2026-06-02T12:15:00.000Z",
        "__v": 0
      }
    }
    ```
*   **Response Shape (404 Not Found)**:
    ```json
    {
      "success": false,
      "message": "No Task Found"
    }
    ```

### 4. Delete Task
*   **Method**: `DELETE`
*   **Path**: `/api/task/[id]`
*   **Request Body**: None
*   **Response Shape (200 OK)**:
    ```json
    {
      "success": true,
      "message": "Task Delete"
    }
    ```

---

## 📂 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router root, pages, layouts, and API routes
│   │   ├── api/             # Backend API endpoint routes
│   │   │   └── task/        # Endpoints for task actions (/api/task and /api/task/[id])
│   │   ├── globals.css      # Custom global CSS styles (Tailwind configurations)
│   │   ├── layout.tsx       # Main layout wrapper containing the custom Navbar
│   │   └── page.tsx         # The interactive TaskFlow dashboard page
│   ├── components/          # Reusable React components
│   │   └── ui/              # Design System UI components (e.g., Navbar.tsx)
│   ├── lib/                 # Third-party configurations and utils
│   │   └── utils.ts         # Utility class merger function (cn) using clsx & tailwind-merge
│   ├── models/              # Mongoose schema models
│   │   └── Task.ts          # Mongoose Schema definition for tasks database collection
│   └── utils/               # Server-side utilities
│       └── dbConnect.ts     # Mongoose connection layer and database caching
├── public/                  # Public static assets
├── eslint.config.mjs        # ESLint rules settings
├── next.config.ts           # Next.js configurations
├── package.json             # Application dependencies and run scripts
├── postcss.config.mjs       # PostCSS configuration for Tailwind CSS v4
└── tsconfig.json            # TypeScript compile configurations
```

---

## 🔮 Next Steps

### What I Chose Not to Do (For Scope)
*   **Local State Mocking**: Opted to skip frontend-only mock state and fully integrated the dashboard with Mongoose, ensuring data persistence out of the box.
*   **Multi-tenant Spaces**: Currently configured only for a singular personal workspace badge without user segregation.

### What to Build Next
1.  **Add auth system to handle multiple users**: Implement NextAuth.js or Clerk to enable secure user sign-ups, logins, and private workspaces.
2.  **Add notification system**: Build email alerts or in-app push notifications for tasks that are approaching due dates or are marked as overdue.
3.  **Hierarchical level data exchange between different layers in a company**: Enable task delegation, supervisor permissions, and progress monitoring reports across team leads, managers, and executives.
