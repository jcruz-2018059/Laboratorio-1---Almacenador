import React from 'react'
import { Link } from 'react-router-dom'


export const LoginPage = () => {
  
    return (
      <>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src='src\assets\Login - Image.jpg'
                      alt="login form" className="img-fluid h-100 vw-100"  />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
  
                      <form>
  
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i className="fas fa-cubes fa-2x me-3" ></i>
                          <span className="h1 fw-bold mb-0">Almacenadora</span>
                        </div>
  
                        <h5 className="fw-normal mb-3 pb-3" >Inicia sesión</h5>
  
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example17" >Nombre de usuario</label>
                          <input type="username" id="form2Example17" className="form-control form-control-lg" name='username'  required />
                        </div>
  
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example27" >Contraseña</label>
                          <input type="password" id="form2Example27" className="form-control form-control-lg" name='password'  required/>
                        </div>
  
                        <div className="pt-1 mb-4">
                          <Link to='/start' className="btn btn-dark btn-lg btn-block" type="submit" >Iniciar Sesión</Link>
                        </div>
  
                        <a className="small text-muted" href="#!">Olvidaste tu contarseña</a>
                        <p className="mb-5 pb-lg-2" >¿No tienes una cuenta? <a href="#!"
                          >Registrate aqui</a></p>
                      </form>
  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }