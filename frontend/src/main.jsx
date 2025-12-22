/**
 * Main entry point for the EY Project Management Tool frontend
 * Renders the root App component
 */
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
