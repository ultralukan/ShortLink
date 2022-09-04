import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { AuthProvider } from 'react-auth-kit'

import RegistrationPage from './components/Pages/RegistrationPage'
import LoginPage from './components/Pages/LoginPage'
import ProfilePage from './components/Pages/ProfilePage'
import HomePage from './components/Pages/HomePage'


export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("token"))
  }, [isLoggedIn])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/> }/>
        <Route path="/registration" element={<RegistrationPage/>}/>
        <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path="/profile" element={<ProfilePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
      </Routes>
    </Router>
  );
}

