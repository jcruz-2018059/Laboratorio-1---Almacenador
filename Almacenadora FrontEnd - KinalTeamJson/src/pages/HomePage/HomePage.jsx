import React from 'react'
import { Link } from 'react-router-dom'


export const HomePage = () => {
  
    return (
      <>
        <div className="container col-xxl-8 px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6">
                    <img src="src\assets\hero - image.svg" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
                </div>
            <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">La Organización es la mejor opción</h1>
            <p className="lead">Bienvenido a nuestra página web de arrendamiento de bodegas. Aquí encontrará la solución perfecta para su empresa o negocio, ofrecemos bodegas de diferentes tamaños y ubicaciones estratégicas para satisfacer sus necesidades de almacenamiento y logística.</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link to='/login' type="button" className="btn btn-primary btn-lg px-4 me-md-2">Iniciar Sesión</Link>
                <button type="button" className="btn btn-outline-secondary btn-lg px-4">Nosotros</button>
            </div>
            </div>
            </div>
        </div>
      </>
    )
  }