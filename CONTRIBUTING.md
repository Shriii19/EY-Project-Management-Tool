# Contributing to EY Project Management Tool

Thank you for your interest in contributing to the EY Project Management Tool! We welcome contributions from developers of all skill levels. This document provides guidelines and information to help you get started.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Code Style](#code-style)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)
- [Community](#community)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** - Version control system
- **Code Editor** (VS Code recommended with ESLint and Prettier extensions)

### Project Structure

This is a full-stack application with separate frontend and backend:

```
EY-Project-Management-Tool/
├── frontend/          # React application
├── backend/           # Node.js/Express API
├── LICENSE            # Project license
├── CODE_OF_CONDUCT.md # Community guidelines
└── README.md          # Main project documentation
```

## Development Setup

1. **Fork the Repository**
   - Click the "Fork" button on GitHub
   - Clone your fork: `git clone https://github.com/your-username/ey-project-management-tool.git`

2. **Set Up Backend**
   ```bash
   cd ey-project-management-tool/backend
   npm install
   # Create .env file with required variables
   npm start
   ```

3. **Set Up Frontend** (in a new terminal)
   ```bash
   cd ey-project-management-tool/frontend
   npm install
   npm run dev
   ```

4. **Verify Setup**
   - Backend API: http://localhost:5000
   - Frontend App: http://localhost:5173

## Contributing Guidelines

### Types of Contributions

- **Bug Fixes**: Fix existing issues
- **Features**: Add new functionality
- **Documentation**: Improve docs, READMEs, comments
- **UI/UX**: Enhance user interface and experience
- **Performance**: Optimize code and improve speed
- **Testing**: Add or improve test coverage

### Development Workflow

1. **Choose an Issue**
   - Check [GitHub Issues](https://github.com/your-repo/issues) for open tasks
   - Comment on the issue to indicate you're working on it

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-number-description
   ```

3. **Make Changes**
   - Write clear, concise code
   - Follow the established code style
   - Test your changes thoroughly
   - Update documentation if needed

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```
   Use conventional commit format:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `style:` for formatting
   - `refactor:` for code restructuring

5. **Push and Create Pull Request**
   ```bash
   git push origin your-branch-name
   ```
   Then create a PR on GitHub with a clear description.

## Code Style

### Frontend (React)
- Use functional components with hooks
- Follow ESLint configuration
- Use Tailwind CSS classes consistently
- Ensure responsive design
- Add proper TypeScript types (if applicable)
- Use meaningful component and variable names

### Backend (Node.js)
- Use ES6+ features
- Follow consistent naming conventions
- Add JSDoc comments for functions
- Handle errors appropriately
- Validate input data
- Use async/await for asynchronous operations

### General
- Write clear, readable code
- Add comments for complex logic
- Keep functions small and focused
- Use descriptive variable names
- Follow DRY (Don't Repeat Yourself) principle

## Testing

### Frontend Testing
```bash
cd frontend
npm run lint  # Check code style
npm run build # Ensure build succeeds
# Test manually across different browsers
```

### Backend Testing
```bash
cd backend
npm start  # Ensure server starts without errors
# Test API endpoints with tools like Postman
# Verify database operations
```

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Project creation and management
- [ ] Task creation and drag-drop functionality
- [ ] Responsive design on mobile/tablet
- [ ] Error handling and validation
- [ ] Performance and loading states

## Submitting Changes

### Pull Request Requirements

1. **Title**: Clear, descriptive title following conventional commits
2. **Description**: Detailed explanation of changes
3. **Screenshots**: For UI changes, include before/after screenshots
4. **Testing**: Describe how you tested your changes
5. **Related Issues**: Reference any related issues with #issue-number

### PR Template

```
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested API endpoints
- [ ] Verified build process

## Screenshots (if applicable)
Add screenshots to show visual changes.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes
```

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Clear Title**: Summarize the issue
2. **Steps to Reproduce**: Numbered steps to reproduce the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, browser, Node.js version
6. **Screenshots/Logs**: Visual evidence or error logs
7. **Additional Context**: Any other relevant information

### Feature Requests

For new features, please provide:

1. **Clear Description**: What feature you want
2. **Use Case**: Why this feature would be useful
3. **Implementation Ideas**: How you think it could be implemented
4. **Mockups**: Visual representations if applicable

## Community

### Communication
- **GitHub Issues**: For bugs, features, and general discussion
- **Pull Requests**: For code contributions
- **Discussions**: For questions and community topics

### Getting Help
- Check existing issues and documentation first
- Be respectful and patient when asking questions
- Provide context and details when seeking help

### Recognition
Contributors will be recognized in:
- GitHub repository contributors list
- Release notes for significant contributions
- Project documentation acknowledgments

Thank you for contributing to the EY Project Management Tool! Your efforts help make this project better for everyone. 🚀