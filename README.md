# 🚀 EY Project Management Tool

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-19.1.0-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.16.1-green)](https://www.mongodb.com/)

A modern, full-stack project management application built with React and Node.js, designed to help teams plan, track, and collaborate efficiently in real time.

![EY Project Management Tool](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=EY+Project+Management+Tool)

## ✨ Features

### 🎯 Core Functionality
- **📊 Project Management & Tracking** - Create, update, and monitor projects with detailed progress tracking
- **📋 Task Management (Kanban Board)** - Interactive drag-and-drop task management with customizable stages
- **👥 Team Collaboration** - Work together with role-based access control and team member management
- **📈 Analytics & Reporting** - Visual insights into project progress, team performance, and productivity metrics
- **🔄 Real-Time Updates** - Stay synchronized with your team through instant updates and notifications

### 🎨 User Experience
- **📱 Responsive Design** - Fully responsive UI that works seamlessly across all devices
- **🌙 Modern UI/UX** - Beautiful gradients, smooth animations, and intuitive navigation
- **⚡ Fast Performance** - Optimized with Vite for lightning-fast development and production builds
- **🔒 Secure Authentication** - JWT-based authentication with secure password hashing

### 🛠️ Developer Experience
- **🔧 Hot Reload** - Instant development feedback with Vite's hot module replacement
- **📝 Type Safety** - Modern JavaScript with ESLint for code quality
- **🎨 Consistent Styling** - Tailwind CSS for maintainable and responsive design
- **📚 Well-Documented** - Comprehensive documentation for easy onboarding

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/React-19.1.0-61DAFB) | 19.1.0 | UI Framework |
| ![Vite](https://img.shields.io/badge/Vite-7.0.0-646CFF) | 7.0.0 | Build Tool |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-38B2AC) | 3.4.19 | Styling |
| ![React Router](https://img.shields.io/badge/React_Router-7.11.0-CA4245) | 7.11.0 | Routing |
| ![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-0.562.0-000000) | 0.562.0 | Icon Library |
| ![DND Kit](https://img.shields.io/badge/DND_Kit-6.3.1-FF6B6B) | 6.3.1 | Drag & Drop |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-20+-339933) | 20+ | Runtime |
| ![Express.js](https://img.shields.io/badge/Express.js-5.1.0-000000) | 5.1.0 | Web Framework |
| ![MongoDB](https://img.shields.io/badge/MongoDB-8.16.1-47A248) | 8.16.1 | Database |
| ![Mongoose](https://img.shields.io/badge/Mongoose-8.16.1-880000) | 8.16.1 | ODM |
| ![JWT](https://img.shields.io/badge/JWT-9.0.3-000000) | 9.0.3 | Authentication |
| ![bcrypt](https://img.shields.io/badge/bcrypt-6.0.0-003366) | 6.0.0 | Password Hashing |

## 📁 Project Structure

```
EY-Project-Management-Tool/
├── 📁 backend/                    # Node.js + Express API Server
│   ├── 📁 config/                 # Database and configuration files
│   ├── 📁 controllers/            # Route controllers
│   ├── 📁 middleware/             # Custom middleware functions
│   ├── 📁 models/                 # MongoDB data models
│   ├── 📁 routes/                 # API route definitions
│   ├── 📄 server.js               # Main application entry point
│   ├── 📄 package.json            # Backend dependencies
│   └── 📄 README.md               # Backend documentation
├── 📁 frontend/                   # React + Vite Client Application
│   ├── 📁 public/                 # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/         # Reusable UI components
│   │   ├── 📁 pages/              # Page components
│   │   ├── 📁 services/           # API service functions
│   │   ├── 📁 context/            # React context providers
│   │   ├── 📄 App.jsx             # Main app component
│   │   ├── 📄 main.jsx            # Application entry point
│   │   └── 📄 index.css           # Global styles
│   ├── 📄 package.json            # Frontend dependencies
│   ├── 📄 vite.config.js          # Vite configuration
│   ├── 📄 tailwind.config.js      # Tailwind CSS configuration
│   └── 📄 README.md               # Frontend documentation
├── 📄 LICENSE                     # Project license
├── 📄 CODE_OF_CONDUCT.md          # Community code of conduct
├── 📄 CONTRIBUTING.md             # Contribution guidelines
└── 📄 README.md                   # Main project documentation
```

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local installation or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Git** - [Download here](https://git-scm.com/)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/ey-project-management-tool.git
   cd ey-project-management-tool
   ```

2. **Set Up Backend**
   ```bash
   cd backend
   npm install

   # Create environment file
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

3. **Set Up Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the Application**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm start
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the Application**
   - 🌐 **Frontend**: [http://localhost:5173](http://localhost:5173)
   - 🔌 **Backend API**: [http://localhost:5000](http://localhost:5000)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ey-project-management
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ey-project-management

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

## 📚 API Documentation

The backend provides a comprehensive REST API. Key endpoints include:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/projects` - Retrieve all projects
- `POST /api/projects` - Create new project
- `GET /api/tasks` - Get all tasks
- `PUT /api/tasks/:id` - Update task status

For detailed API documentation, see the [Backend README](backend/README.md).

## 🌐 Deployment

### Production Deployment

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Environment Setup**
   - Set production environment variables
   - Configure production MongoDB database
   - Set up reverse proxy (nginx recommended)

3. **Deploy Backend**
   - Use services like Heroku, Railway, or DigitalOcean
   - Ensure environment variables are set
   - Configure process manager (PM2 recommended)

4. **Deploy Frontend**
   - Upload `dist` folder to static hosting (Netlify, Vercel, etc.)
   - Configure API base URL for production

### Docker Support (Coming Soon)
Docker configuration will be available in future releases for easier deployment.

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm run lint
npm run build

# Backend tests (when implemented)
cd backend
npm test
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute
- 🐛 **Bug Reports** - Report issues via [GitHub Issues](https://github.com/your-repo/issues)
- ✨ **Feature Requests** - Suggest new features
- 📝 **Documentation** - Improve docs and guides
- 💻 **Code** - Submit pull requests
- 🧪 **Testing** - Help test new features

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Submit a pull request

For detailed contribution guidelines, see:
- [General Contributing Guide](CONTRIBUTING.md)
- [Frontend Guide](frontend/README.md#contributing)
- [Backend Guide](backend/README.md#contributing)

## 📋 Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🗺️ Roadmap

### Version 2.0 (Coming Soon)
- [ ] Real-time collaboration with WebSockets
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] API rate limiting and caching
- [ ] Docker containerization
- [ ] CI/CD pipeline setup
- [ ] Multi-language support (i18n)

### Future Enhancements
- [ ] Integration with popular tools (Slack, Jira, etc.)
- [ ] Advanced reporting and export features
- [ ] Time tracking functionality
- [ ] Resource management
- [ ] Custom workflow automation

## 🙏 Acknowledgments

- **Icons**: [Lucide Icons](https://lucide.dev/) for beautiful iconography
- **UI Framework**: [Tailwind CSS](https://tailwindcss.com/) for rapid styling
- **Drag & Drop**: [DND Kit](https://dndkit.com/) for smooth interactions
- **Community**: Thanks to all contributors and users!

## 📞 Support & Contact

- 📧 **Email**: [your-email@example.com](mailto:your-email@example.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- 📖 **Documentation**: [Project Wiki](https://github.com/your-repo/wiki)

## 👥 Contributors

<a href="https://github.com/your-repo/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=your-repo/ey-project-management-tool" />
</a>

---

<div align="center">

**Built with ❤️ by [Shrinivas Mudabe](https://github.com/your-username)**

⭐ Star this repo if you find it useful!

© 2026 Shrinivas Mudabe. All rights reserved.

</div>
