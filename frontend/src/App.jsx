import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Profile from './components/Profile'
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import HowToUse from './pages/HowToUse';
import Contact from './pages/Contact';

const App = () => {
  // No authentication - open access demo app
  const guestUser = {
    email: 'guest@protasker.app',
    name: 'Guest User',
    avatar: 'https://ui-avatars.com/api/?name=Guest&background=06b6d4'
  };

  return (
    <Layout user={guestUser}>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/how-to-use' element={<HowToUse/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='*' element={<Dashboard />} />
      </Routes>
    </Layout>
  )
}

export default App
