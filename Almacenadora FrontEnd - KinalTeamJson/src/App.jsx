import 'bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import { Navbar } from './components/Nabvar'
import { LoginPage } from './pages/UserPages/LoginPage.jsx'
import { Outlet } from 'react-router-dom'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.jsx'
import React from 'react'

function App() {
  return (
    <>
    <Outlet></Outlet>
    </>
    
  )
}

export default App
