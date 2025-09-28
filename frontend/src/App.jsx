import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
// Login component removed - authentication disabled
import Profile from './components/Profile'
import Dashboard from './pages/Dashboard';
import CompletePage from './pages/CompletePage';
import PendingPage from './pages/PendingPage';

const App = () => {
  // Authentication logic removed - app now runs without login
  const dummyUser = {
    email: 'anonymous@example.com',
    name: 'Anonymous User',
    avatar: 'https://ui-avatars.com/api/?name=Anonymous&background=random'
  };

  const handleLogout = () => {
    // Logout functionality disabled
    console.log('Logout functionality has been disabled');
  };

  return (
    <Layout user={dummyUser} onLogout={handleLogout}>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/pending' element={<PendingPage/>}/>
        <Route path='/complete' element={<CompletePage/>}/>
        <Route path='/profile' element={<Profile user={dummyUser} setCurrentUser={() => {}} onLogout={handleLogout}/>}/>
        <Route path='*' element={<Dashboard />} />
      </Routes>
    </Layout>
  )
}

export default App
