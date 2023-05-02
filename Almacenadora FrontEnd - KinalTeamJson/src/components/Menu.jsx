import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../Index'

export const Menu = () => {
    const { dataUser } = useContext(AuthContext)
    const role = localStorage.getItem('role')
    return (
        <>
            <div className='title text-center pt-5'>
                <h1>Bienvenido a su tablero</h1>
            </div>
            {
                role == 'ADMIN' ? (
                    <div className="container pt-5">
                        <div className="row justify-content-center align-items-center">
                            <div className="card  col-sm-4 m-3 " style={{ width: "21rem", backgroundColor: "#ff006e" }}>
                                <div className="card-body text-center">
                                    <h3 className="card-title text-light" >Gestionar Usuarios</h3>
                                    <p className="card-text text-light">Al acceder a esta función, podrá gestionar sus trabajadores de forma rápida y sencilla.</p>
                                    <Link to='workers' className="btn btn-primary">Gestionar</Link>
                                </div>
                            </div>
                            <div className="card col-sm-4 m-3" style={{ width: "21rem", backgroundColor: "#8338ec" }}>
                                <div className="card-body text-center">
                                    <h3 className="card-title text-light">Gestionar Bodegas</h3>
                                    <p className="card-text text-light">Al acceder a esta función, podrá gestionar sus bodegas de forma rápida y sencilla.</p>
                                    <Link to='store' className="btn btn-primary">Gestionar</Link>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center align-items-center">
                            <div className="card col-sm-4 m-3" style={{ width: "21rem", backgroundColor: "#3a86ff" }}>
                                <div className="card-body text-center">
                                    <h3 className="card-title text-light">Gestionar Servicios</h3>
                                    <p className="card-text text-light">Al acceder a esta función, podrá gestionar sus servicios de forma rápida y sencilla.</p>
                                    <Link to='AdditionalServices' className="btn btn-primary">Gestionar</Link>
                                </div>
                            </div>
                            <div className="card col-sm-4 m-3" style={{ width: "21rem", backgroundColor: "#f48c06" }}>
                                <div className="card-body text-center">
                                    <h3 className="card-title text-light">Gestionar Cuentas</h3>
                                    <p className="card-text text-light">Al acceder a esta función, podrá gestionar sus cuentas de forma rápida y sencilla.</p>
                                    <Link to='clients' className="btn btn-primary">Gestionar</Link>
                                </div>
                            </div>
                        </div>
                    </div>) : <></>
            }
            {
                role == 'WORKER' ? (
                    <div className="container pt-5">
                        <div className="row justify-content-center align-items-center">
                            <div className="card col-sm-4 m-3" style={{ width: "21rem", backgroundColor: "#3a86ff" }}>
                                <div className="card-body text-center">
                                    <h3 className="card-title text-light">Gestionar Arrendamientos</h3>
                                    <p className="card-text text-light">Al acceder a esta función, podrá gestionar sus Arrendamientos de forma rápida y sencilla.</p>
                                    <Link to='lease' className="btn btn-primary">Gestionar</Link>
                                </div>
                            </div>
                            <div className="card col-sm-4 m-3" style={{ width: "21rem", backgroundColor: "#f48c06" }}>
                                <div className="card-body text-center">
                                    <h3 className="card-title text-light">Gestionar Cuentas Clientes</h3>
                                    <p className="card-text text-light">Al acceder a esta función, podrá gestionar sus cuentas de forma rápida y sencilla.</p>
                                    <Link to='clients' className="btn btn-primary">Gestionar</Link>
                                </div>
                            </div>
                        </div>
                    </div>) : <></>
            }

        </>

    )
}