import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
              <a className="navbar-brand">Almacenadora</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                      <li className="nav-item m-1">
                          <Link to='/' className="nav-link active" aria-current="page">Home</Link>
                      </li>
                      <li className="nav-item m-1">
                          <Link  className="nav-link">Nosotros</Link>
                      </li>
                      <li className="nav-item m-1">
                          <Link to='/login' className="nav-link">Iniciar Sesión</Link>
                      </li> 
                  </ul>
              </div>
          </div>
      </nav>
  )
}