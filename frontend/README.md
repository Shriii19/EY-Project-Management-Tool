# EY Project Management Tool - Frontend

A modern, feature-rich project management application built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Dashboard**: Overview of all projects, tasks, and team activity
- **Projects Management**: Create, view, and manage projects with detailed information
- **Kanban Board**: Drag-and-drop task management with visual workflow
- **Task Management**: Unified view of all tasks across projects
- **Analytics**: Project metrics and team performance insights
- **Team Management**: Collaborate with team members effectively
- **Responsive Design**: Fully responsive UI that works on all devices
- **Modern UI/UX**: Beautiful gradients, animations, and smooth transitions

## 🛠️ Tech Stack

- **React 19.1.0** - Latest React with modern features
- **React Router DOM 7.11.0** - Client-side routing
- **Vite 7.0.0** - Next-generation frontend tooling
- **Tailwind CSS 3.4.19** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **@dnd-kit** - Modern drag-and-drop toolkit
- **Axios** - HTTP client for API requests

## 📦 Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx     # Navigation bar with routing
│   │   ├── ProjectCard.jsx
│   │   ├── TaskCard.jsx
│   │   ├── Modal.jsx
│   │   ├── Loading.jsx    # Loading spinner component
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── Dashboard.jsx  # Main dashboard
│   │   ├── Projects.jsx   # Projects list
│   │   ├── ProjectDetails.jsx
│   │   ├── KanbanBoard.jsx
│   │   ├── Tasks.jsx      # All tasks view
│   │   ├── Analytics.jsx  # Analytics & metrics
│   │   ├── Team.jsx       # Team management
│   │   └── NotFound.jsx   # 404 page
│   ├── App.jsx            # Main app with routing
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── public/                # Static assets
└── package.json

```

## 🎨 Available Pages

- **/** - Dashboard (home page)
- **/projects** - Projects list view
- **/projects/:projectId** - Individual project details
- **/projects/:projectId/tasks** - Project Kanban board
- **/tasks** - All tasks unified view
- **/analytics** - Analytics and insights
- **/team** - Team members management
- **404** - Custom not found page

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Features

### Navigation
- Smooth client-side routing with React Router
- Active route highlighting in navbar
- Mobile-responsive menu
- Theme toggle (light/dark mode)
- User profile dropdown

### Components
- Reusable modal components
- Loading states and spinners
- Card-based layouts
- Drag-and-drop functionality
- Form components with validation

### Styling
- Tailwind CSS for rapid styling
- Custom gradient designs
- Smooth animations and transitions
- Dark theme optimized
- Responsive breakpoints

## 🔗 API Integration

The frontend connects to the backend API running on `http://localhost:5000`. Make sure the backend server is running before using the application.

## 📝 Environment Setup

Create a `.env` file in the frontend directory if needed:

```env
VITE_API_URL=http://localhost:5000
```

## 🚀 Deployment

Build the application for production:

```bash
npm run build
```

The optimized files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/ey-project-management-tool.git`
3. Navigate to frontend: `cd ey-project-management-tool/frontend`
4. Install dependencies: `npm install`
5. Start development server: `npm run dev`
6. Create a feature branch: `git checkout -b feature/your-feature-name`

### Code Guidelines
- Follow ESLint configuration (`npm run lint`)
- Use meaningful commit messages
- Write clear, concise React components
- Use functional components with hooks
- Follow Tailwind CSS best practices
- Ensure responsive design
- Test your changes thoroughly

### Component Development
- Place reusable components in `src/components/`
- Use proper prop types and default props
- Follow consistent naming conventions
- Add JSDoc comments for complex components
- Ensure accessibility (ARIA labels, keyboard navigation)

### Pull Request Process
1. Update the README.md with details of changes if needed
2. Ensure your code follows the project's style guidelines
3. Test across different browsers and devices
4. Submit a pull request with a clear description of your changes
5. Wait for review and address any feedback

### Reporting Issues
- Use the GitHub Issues tab to report bugs
- Provide detailed steps to reproduce the issue
- Include browser console errors
- Specify your environment (OS, browser, Node.js version)
- Add screenshots for UI-related issues

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

**Shrinivas Mudabe** - Developer / Project Owner

© 2026 Shrinivas Mudabe. All rights reserved.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.
