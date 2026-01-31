# Modern Professional Navbar Component

A fully-featured, responsive navigation bar component built with React, Tailwind CSS, and Lucide React icons for the EY Project Management Tool.

## ✨ Features

### Core Functionality
- **Responsive Design**: Fully responsive with mobile hamburger menu
- **Active Link Highlighting**: Visual indication of current page
- **Theme Toggle**: Switch between dark and light modes
- **Notification System**: Bell icon with notification count badge
- **User Profile Dropdown**: Access to Profile, Settings, and Logout

### Design Elements
- **Glassmorphism Effect**: Backdrop blur with soft transparency
- **Smooth Animations**: Hover effects and transitions
- **Gradient Accents**: Purple-to-pink gradient for brand identity
- **Scroll Effect**: Navbar appearance changes on scroll
- **Rounded Corners**: Modern, polished aesthetic

### Accessibility
- **Keyboard Navigation**: Full keyboard support with Enter/Space keys
- **ARIA Roles**: Proper semantic HTML and ARIA attributes
- **Focus Management**: Click-outside detection for dropdowns
- **Screen Reader Support**: Descriptive labels and states

## 🚀 Usage

The Navbar component is already integrated into the main App. It includes:

```jsx
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      {/* Your page content */}
    </div>
  );
}
```

## 📋 Navigation Items

The navbar includes the following navigation links:

1. **Dashboard** - Overview and metrics
2. **Projects** - Project management
3. **Tasks** - Task tracking
4. **Analytics** - Data insights
5. **Team** - Team collaboration

## 🎨 Customization

### Changing Active Link
The active link is controlled by state:
```jsx
const [activeLink, setActiveLink] = useState('dashboard');
```

### Modifying Navigation Items
Edit the `navItems` array in [Navbar.jsx](src/components/Navbar.jsx):
```jsx
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  // Add more items...
];
```

### Theme Configuration
Tailwind configuration in [tailwind.config.js](tailwind.config.js) includes custom colors:
- Primary purple: `#8b5cf6`
- Accent pink: `#ec4899`
- Dark background: `#0f172a` (slate-950)

### Profile Actions
Modify the `profileItems` array:
```jsx
const profileItems = [
  { label: 'Profile', icon: User, action: () => console.log('Profile') },
  // Add custom actions...
];
```

## 🔧 Technical Details

### Dependencies
- **React**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **PostCSS & Autoprefixer**: CSS processing

### State Management
- `isScrolled`: Tracks scroll position for navbar styling
- `activeLink`: Currently active navigation item
- `isMobileMenuOpen`: Mobile menu visibility
- `isProfileOpen`: Profile dropdown visibility
- `theme`: Current theme (dark/light)
- `notificationCount`: Number of unread notifications

### Responsive Breakpoints
- **Mobile**: < 768px (hamburger menu)
- **Desktop**: ≥ 768px (full navigation)

## 🎯 Component Features

### Desktop View
- Logo with brand name
- Horizontal navigation links
- Notification bell with badge
- Theme toggle button
- Profile dropdown

### Mobile View
- Compact logo (PMT)
- Hamburger menu icon
- Slide-down navigation menu
- All desktop features maintained

## 🌐 Browser Support

Supports all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 📱 Live Demo

The application is running at: http://localhost:5175/

## 🔮 Future Enhancements

Potential improvements:
- Add search functionality
- Integrate with React Router for actual navigation
- Add user authentication state
- Implement real notification system
- Add more theme options (system preference)
- Add breadcrumb navigation
- Multi-level dropdown menus

## 📝 Notes

- The component uses `useRef` hooks for click-outside detection
- All interactive elements support keyboard navigation
- Theme preference is not persisted (add localStorage for persistence)
- Navigation links currently update state only (integrate with routing library)

## 🤝 Integration with Backend

To connect with your backend APIs:

1. Replace console.log actions with actual API calls
2. Integrate authentication state management
3. Connect notification count to real-time data
4. Add protected routes logic

---

**© 2026 Shrinivas Mudabe** - Developer / Project Owner
