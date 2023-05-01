import React from 'react'
import { Link } from 'react-router-dom'

export const NabvarAdmin = () => {

    const logOut = ()=>{
        localStorage.clear()
        navigate('/')
    }

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
                          <Link to='/start' className="nav-link active" aria-current="page">Tablero</Link>
                      </li>
                      <li className="nav-item m-1">
                          <Link to='/start/workers' className="nav-link active" aria-current="page">Usuarios</Link>
                      </li>
                      <li className="nav-item m-1">
                          <Link to='/start/clients' className="nav-link active" aria-current="page">Clientes</Link>
                      </li>
                      <li className="nav-item m-1">
                          <Link to='/start/AdditionalServices' className="nav-link active" aria-current="page">Servicios</Link>
                      </li>
                      <li className="nav-item m-1">
                          <Link to='/start/store' className="nav-link active" aria-current="page">Bodegas</Link>
                      </li>
                      <li className="nav-item m-1">
                        <Link onClick={()=> logOut()} className="nav-link">Cerrar Sesión</Link>
                      </li> 
                  </ul>
              </div>
          </div>
      </nav>
  )
}
