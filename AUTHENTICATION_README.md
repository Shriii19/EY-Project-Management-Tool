# Authentication System Documentation

## Overview

The EY Project Management Tool now includes a complete authentication system with login, signup, and logout functionality. Users must authenticate before accessing the main application features.

## Features Implemented

### 1. **Login Page** (`/login`)
- Email and password authentication
- Form validation (email format, required fields)
- Show/hide password toggle
- Remember me checkbox
- Link to signup page for new users
- Forgot password link (placeholder)
- Demo credentials display
- Error handling with user-friendly messages

### 2. **Signup Page** (`/signup`)
- User registration with name, email, and password
- Password strength indicator (Weak/Medium/Strong)
- Password confirmation with visual match indicator
- Form validation:
  - Email format validation
  - Password requirements (min 6 chars, uppercase, lowercase, numbers)
  - Password match confirmation
- Terms and conditions checkbox
- Link to login page
- Error handling

### 3. **Authentication Backend**

#### **New API Endpoints:**
- `POST /api/user/signup` - Register new user
- `POST /api/user/login` - Authenticate user
- `GET /api/user/me` - Get current authenticated user (protected)

#### **Security Features:**
- Password hashing using bcrypt (10 salt rounds)
- JWT token generation with 7-day expiration
- In-memory user storage (demo - should use database in production)
- Token-based authentication

#### **Demo User:**
- Email: `demo@taskflow.app`
- Password: `demo123`

### 4. **Protected Routes**
All main application routes now require authentication:
- `/` - Dashboard
- `/projects` - Projects list
- `/projects/:id` - Project details
- `/tasks` - Tasks
- `/analytics` - Analytics
- `/team` - Team
- `/profile` - User profile

### 5. **Authentication Context**
Global authentication state management using React Context API:
- `AuthProvider` - Wraps the entire application
- `useAuth()` hook - Access auth state and methods
- Auto-loads user on app start if token exists
- Persists authentication state

### 6. **Logout Functionality**
- Logout button in navbar profile dropdown
- Clears JWT token from localStorage
- Redirects to login page
- Updates global auth state

## Usage

### For Users:

1. **New User Signup:**
   - Navigate to `/signup` or click "Sign up for free" on login page
   - Fill in name, email, and password
   - Password must be at least 6 characters with uppercase, lowercase, and numbers
   - Accept terms and conditions
   - Click "Create Account"

2. **Existing User Login:**
   - Navigate to `/login`
   - Enter email and password
   - Click "Sign In"
   - Or use demo credentials: `demo@taskflow.app` / `demo123`

3. **Logout:**
   - Click profile icon in navbar
   - Click "Logout" at bottom of dropdown menu

### For Developers:

#### **Using the Auth Context:**

```jsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  
  if (loading) return <Loading />;
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

#### **Creating Protected Routes:**

```jsx
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  return children;
};
```

#### **Making Authenticated API Calls:**

The API service automatically includes the auth token in request headers:

```javascript
import api from './services/api';

// Token is automatically included
const response = await api.get('/api/user/me');
```

## Technical Details

### **Frontend Structure:**
```
frontend/src/
├── pages/
│   ├── Login.jsx          # Login page with form
│   └── Signup.jsx         # Signup page with validation
├── context/
│   └── AuthContext.jsx    # Authentication context provider
└── services/
    └── auth.service.js    # Auth API methods (login, signup, logout)
```

### **Backend Structure:**
```
backend/
├── controller/
│   └── userController.js  # Login, signup, getCurrentUser
└── routes/
    └── userRoute.js       # Auth endpoints
```

### **Authentication Flow:**

1. **Login/Signup:**
   - User submits credentials
   - Backend validates and generates JWT token
   - Token stored in localStorage
   - User data stored in AuthContext
   - Redirect to dashboard

2. **Protected Route Access:**
   - Check if token exists in localStorage
   - If yes, load user data and allow access
   - If no, redirect to login page

3. **API Requests:**
   - Token automatically included in Authorization header
   - Backend verifies token for protected endpoints

4. **Logout:**
   - Remove token from localStorage
   - Clear user data from AuthContext
   - Redirect to login page

## Security Considerations

### **Current Implementation (Demo):**
- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens with expiration
- ✅ Token-based authentication
- ✅ Protected routes
- ⚠️ In-memory user storage (not persistent)
- ⚠️ JWT secret hardcoded (should use env variable)

### **Production Recommendations:**
1. **Use a real database** (MongoDB, PostgreSQL, etc.) instead of in-memory storage
2. **Store JWT_SECRET in environment variables**
3. **Implement refresh tokens** for better security
4. **Add rate limiting** to prevent brute force attacks
5. **Implement password reset** functionality
6. **Add email verification** for new signups
7. **Use HTTPS** in production
8. **Implement CSRF protection**
9. **Add session management** (track active sessions)
10. **Log authentication attempts** for security monitoring

## Environment Variables

Create a `.env` file in the backend directory:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=4000
NODE_ENV=production
```

## Dependencies Added

### Backend:
- `bcrypt` (^6.0.0) - Password hashing
- `jsonwebtoken` (^9.0.3) - JWT token generation/verification

### Frontend:
No additional dependencies needed (uses existing React Router and Axios)

## Testing

### Manual Testing Checklist:

- [x] Signup with valid data creates new user
- [x] Signup validation catches invalid emails
- [x] Signup validation enforces password requirements
- [x] Login with correct credentials works
- [x] Login with incorrect credentials shows error
- [x] Protected routes redirect to login when not authenticated
- [x] Authenticated users can access protected routes
- [x] Logout clears session and redirects to login
- [x] Token persists across page refreshes
- [x] Expired tokens redirect to login

## Troubleshooting

### Issue: "Not authenticated" error after login
- Clear browser localStorage
- Check backend server is running
- Verify JWT_SECRET matches between requests

### Issue: Password validation too strict
- Modify `validatePassword()` in Signup.jsx
- Update requirements display

### Issue: Token expires too quickly
- Adjust `expiresIn` in backend userController.js
- Default is 7 days

## Future Enhancements

- [ ] Password reset via email
- [ ] Two-factor authentication (2FA)
- [ ] Social login (Google, GitHub)
- [ ] Account settings page
- [ ] Session management dashboard
- [ ] Login history tracking
- [ ] Role-based access control (RBAC)
- [ ] OAuth 2.0 implementation

## Demo Credentials

For testing purposes:
- **Email:** demo@taskflow.app
- **Password:** demo123

---

**Author**: Shrinivas Mudabe - Developer / Project Owner
**© 2026 Shrinivas Mudabe**
