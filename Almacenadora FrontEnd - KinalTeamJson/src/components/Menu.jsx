import React from 'react'
import { Link, Outlet } from 'react-router-dom'


export const Menu = () => {
  
    return (
      <>
      <div className='title text-center pt-5'>
          <h1>Bienvenido a su tablero</h1>
      </div>
      <div className="container pt-5">
          <div className="row justify-content-center align-items-center">
              <div className="card  col-sm-4 m-3" style={{ width: "18rem" }}>
                  <div className="card-body">
                      <h5 className="card-title">Gestionar Trabajadores</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <Link to='workers' className="btn btn-primary">Gestionar</Link>
                  </div>
              </div>
              <div className="card col-sm-4 m-3" style={{ width: "18rem" }}>
                  <div className="card-body">
                      <h5 className="card-title">Gestionar Bodegas</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" className="btn btn-primary">Gestionar</a>
                  </div>
              </div>
          </div>

          <div className="row justify-content-center align-items-center">
              <div className="card col-sm-4 m-3" style={{ width: "18rem" }}>
                  <div className="card-body">
                      <h5 className="card-title">Gestion de Servicios Adicionales</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" className="btn btn-primary">Gestionar</a>
                  </div>
              </div>
              <div className="card col-sm-4 m-3" style={{ width: "18rem" }}>
                  <div className="card-body">
                      <h5 className="card-title">Gestionar Cuentas</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" className="btn btn-primary">Gestionar</a>
                  </div>
              </div>
          </div>
      </div>
  </>
      
    )
  }