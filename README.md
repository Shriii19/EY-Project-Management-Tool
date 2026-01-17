# 🚀 EY Project Management Tool

A comprehensive, modern project management application built with React and Node.js, featuring a beautiful dark theme UI with glassmorphism design, complete authentication, and real-time task management capabilities.

## ✨ Features

### 🔐 Authentication & Security
- **Secure Login/Signup System** with JWT token-based authentication
- Password encryption using bcrypt (10 salt rounds)
- Protected routes with automatic redirection
- Password strength indicator and validation
- "Remember Me" functionality
- Demo credentials for quick testing

### 📊 Project Management
- **Create and manage multiple projects** with detailed information
- Project status tracking (Active, On Hold, Completed)
- Priority levels (Low, Medium, High)
- Project progress visualization with progress bars
- Project archiving and editing capabilities
- Detailed project overview with statistics

### ✅ Task Management
- **Interactive Kanban Board** with drag-and-drop functionality
- Task status management (To Do, In Progress, Done)
- Task priority levels and due dates
- Task assignment to team members
- Task filtering and search
- Add, edit, and delete tasks
- Task progress tracking

### 👥 Team Collaboration
- Team member management
- Role-based access (Admin, Manager, Member)
- Team member avatars and profiles
- Activity timeline tracking
- User profile management

### 📈 Analytics & Reporting
- Project statistics and metrics
- Task completion rates
- Team performance analytics
- Visual data representation
- Timeline and progress tracking

### 🎨 Modern UI/UX
- **Dark theme with glassmorphism design**
- Responsive layout for all devices
- Smooth animations and transitions
- Interactive components with Lucide icons
- Beautiful gradient effects
- Professional navbar with navigation
- Loading states and error boundaries

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern features
- **Vite 7** - Lightning-fast build tool and dev server
- **TailwindCSS 3.4** - Utility-first CSS framework
- **React Router DOM 7** - Client-side routing
- **Lucide React** - Beautiful icon library
- **DND Kit** - Powerful drag-and-drop functionality
  - @dnd-kit/core
  - @dnd-kit/sortable
  - @dnd-kit/utilities
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication tokens
- **Bcrypt** - Password hashing
- **Validator** - Data validation
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management
- **Nodemon** - Auto-restart during development

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd EY-Project-Management-Tool

2. **Install backend dependencies**
```bash
cd backend
npm install

3. **Install frontend dependencies**
```bash
cd frontend
npm install

4️⃣ Environment Variables Setup

Create a .env file inside the backend folder:

4. **Set up environment variables**

Create a `.env` file in the `backend` directory with the following:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/ey-project-management
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

5. **Start MongoDB**

Make sure MongoDB is running on your system:
```bash
# Windows
net start MongoDB

# macOS (using Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

6. **Start the development servers**

Backend (runs on http://localhost:4000):
```bash
cd backend
npm start

Frontend (runs on http://localhost:5173):
```bash
cd frontend
npm run dev
```

7. **Access the application**

Open your browser and navigate to: `http://localhost:5173`

### Demo Credentials
```
Email: demo@taskflow.app
Password: demo123
```

## 📁 Project Structure

```
EY-Project-Management-Tool/
├── backend/
│   ├── config/          # Database configuration
│   ├── controller/      # Route controllers
│   ├── middleware/      # Custom middleware (auth, validation)
│   ├── model/          # MongoDB models (User, Project, Task)
│   ├── routes/         # API routes
│   └── server.js       # Express app entry point
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # React Context (AuthContext)
│   │   ├── pages/      # Page components
│   │   ├── services/   # API service layers
│   │   ├── App.jsx     # Main App component
│   │   └── main.jsx    # React entry point
│   └── index.html      # HTML template
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/user/signup` - Register new user
- `POST /api/user/login` - Authenticate user
- `GET /api/user/me` - Get current user (protected)

### Projects
- `GET /api/projects` - Get all projects (protected)
- `GET /api/projects/:id` - Get project by ID (protected)
- `POST /api/projects` - Create new project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Tasks
- `GET /api/tasks` - Get all tasks (protected)
- `GET /api/tasks/:id` - Get task by ID (protected)
- `GET /api/tasks/project/:projectId` - Get tasks by project (protected)
- `POST /api/tasks` - Create new task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

## 📱 Application Pages

- **Dashboard** (`/`) - Overview of projects and tasks
- **Projects** (`/projects`) - List all projects with cards
- **Project Details** (`/projects/:id`) - Detailed project view with tabs
- **Tasks** (`/tasks`) - Task management page
- **Kanban Board** (`/kanban`) - Interactive drag-and-drop board
- **Team** (`/team`) - Team member management
- **Analytics** (`/analytics`) - Statistics and reports
- **Profile** (`/profile`) - User profile settings
- **Login** (`/login`) - User authentication
- **Signup** (`/signup`) - User registration

## 🎯 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Backend
```bash
npm start        # Start development server with nodemon
```

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with extended colors and animations. Configuration file: `frontend/tailwind.config.js`

### Vite
Vite is configured with React plugin for fast HMR. Configuration file: `frontend/vite.config.js`

### ESLint
ESLint is configured for React 19 best practices. Configuration file: `frontend/eslint.config.js`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icon set
- DND Kit for drag-and-drop functionality

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ for EY Project Management**
