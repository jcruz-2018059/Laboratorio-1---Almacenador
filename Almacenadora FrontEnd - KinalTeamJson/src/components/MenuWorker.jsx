import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { NabvarAdmin } from './NabvarAdmin'


export const MenuWorker = () => {
    return (
      <>
      <div className='title text-center pt-5'>
          <h1>Bienvenido a su tablero</h1>
      </div>
      <div className="container pt-5">
          <div className="row justify-content-center align-items-center">
              <div className="card col-sm-4 m-3" style={{ width: "21rem", backgroundColor: "#3a86ff"  }}>
                  <div className="card-body text-center">
                      <h3 className="card-title text-light">Gestionar Servicios</h3>
                      <p className="card-text text-light">Al acceder a esta función, podrá gestionar sus servicios de forma rápida y sencilla.</p>
                      <Link to='AdditionalServices' className="btn btn-primary">Gestionar</Link>
                  </div>
              </div>
              <div className="card col-sm-4 m-3" style={{ width: "21rem", backgroundColor: "#f48c06"  }}>
                  <div className="card-body text-center">
                      <h3 className="card-title text-light">Gestionar Cuentas</h3>
                      <p className="card-text text-light">Al acceder a esta función, podrá gestionar sus cuentas de forma rápida y sencilla.</p>
                      <Link to='clients' className="btn btn-primary">Gestionar</Link>
                  </div>
              </div>
          </div>
      </div>
  </>
      
    )
  }