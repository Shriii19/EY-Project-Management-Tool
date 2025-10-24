import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Profile from './components/Profile'
import Dashboard from './pages/Dashboard';
import CompletePage from './pages/CompletePage';
import PendingPage from './pages/PendingPage';

const App = () => {
  // No authentication - open access demo app
  const guestUser = {
    email: 'guest@taskflow.app',
    name: 'Guest User',
    avatar: 'https://ui-avatars.com/api/?name=Guest&background=8b5cf6'
  };

  return (
    <Layout user={guestUser}>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/pending' element={<PendingPage/>}/>
        <Route path='/complete' element={<CompletePage/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='*' element={<Dashboard />} />
      </Routes>
    </Layout>
  )
}

export default App
