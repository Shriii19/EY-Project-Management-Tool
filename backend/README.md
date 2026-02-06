# EY Project Management Tool - Backend

A robust REST API backend for the EY Project Management Tool, built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **Project Management**: Full CRUD operations for projects
- **Task Management**: Comprehensive task tracking with status updates
- **Team Collaboration**: User management and role-based access
- **RESTful API**: Well-structured endpoints following REST principles
- **MongoDB Integration**: NoSQL database for flexible data storage
- **Input Validation**: Server-side validation using validator library
- **CORS Support**: Cross-origin resource sharing for frontend integration

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.16.1** - MongoDB object modeling
- **JWT 9.0.3** - JSON Web Tokens for authentication
- **bcrypt 6.0.0** - Password hashing
- **validator 13.15.15** - Input validation
- **CORS 2.8.5** - Cross-origin resource sharing
- **Nodemon 3.1.10** - Development auto-restart

## 📦 Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the backend directory with the following variables:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ey-project-management
JWT_SECRET=your_jwt_secret_key
```

4. Start the development server:
```bash
npm start
```

The API will be available at `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection configuration
├── controller/
│   ├── userController.js  # User authentication and management
│   ├── projectController.js # Project CRUD operations
│   └── taskController.js  # Task management
├── middleware/
│   └── validation.js      # Input validation middleware
├── model/
│   ├── userModel.js       # User data model
│   ├── projectModel.js    # Project data model
│   └── taskModel.js       # Task data model
├── routes/
│   ├── userRoute.js       # User-related routes
│   ├── projectRoute.js    # Project routes
│   └── taskRoute.js       # Task routes
├── server.js              # Main application entry point
├── package.json
└── .env                   # Environment variables (create this)
```

## 🔧 Available Scripts

- `npm start` - Start the server with nodemon (development mode)

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

## 🔗 Database Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Update the `MONGO_URI` in your `.env` file
3. The application will automatically create collections when you start using it

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGO_URI` | MongoDB connection string | mongodb://localhost:27017/ey-project-management |
| `JWT_SECRET` | Secret key for JWT tokens | (required) |

## 🚀 Deployment

1. Set up your production MongoDB database
2. Update environment variables for production
3. Build and deploy to your preferred hosting service (Heroku, AWS, etc.)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/ey-project-management-tool.git`
3. Navigate to backend: `cd ey-project-management-tool/backend`
4. Install dependencies: `npm install`
5. Create a feature branch: `git checkout -b feature/your-feature-name`

### Code Guidelines
- Follow ESLint configuration
- Use meaningful commit messages
- Write clear, concise code with comments
- Test your changes thoroughly
- Ensure all tests pass before submitting

### Pull Request Process
1. Update the README.md with details of changes if needed
2. Ensure your code follows the project's style guidelines
3. Submit a pull request with a clear description of your changes
4. Wait for review and address any feedback

### Reporting Issues
- Use the GitHub Issues tab to report bugs
- Provide detailed steps to reproduce the issue
- Include relevant error messages and screenshots
- Specify your environment (OS, Node.js version, etc.)

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

**Shrinivas Mudabe** - Developer / Project Owner

© 2026 Shrinivas Mudabe. All rights reserved.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.