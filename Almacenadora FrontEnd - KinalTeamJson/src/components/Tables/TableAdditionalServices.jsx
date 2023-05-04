import React, { useState, useEffect } from "react";
import { AdditionalServices } from "../Collections/AdditionalsServices";
import { Link } from "react-router-dom";
import axios from "axios";

export const TableAdditionalServices = () => {
    const token = localStorage.getItem('token');
    const [additionalServices, setAdditionalServices] = useState([{}])

    const config = {
        headers: {
            Authorization: `${token}`
        }
    }

    const getAdditionalServices = async () => {
        try {
            const { data } = await axios('http://localhost:2651/additionalServices/getServices', config)
            setAdditionalServices(data.addAdditionalServices)
            console.log(data.addAdditionalServices)
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => getAdditionalServices, [])

    return (
        <>
            <div className='title'>
                <h1 className='text-center pt-5 pb-5'>Servicios Adicionales</h1>
            </div>

            <div className="container">
                <div className='mb-5 d-flex justify-content-between'>
                    <Link to='/start'>
                        <button className='btn btn-primary'>Volver al tablero</button>
                    </Link>
                    <Link to='add' className='ms-auto'>
                        <button className='btn btn-secondary'>Agregar Servicio</button>
                    </Link>
                </div>
                <table className="table">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            additionalServices.map(({ _id, name, description, price }, index) => {
                                return (
                                    <tr key={index}>
                                        <AdditionalServices
                                            name={name}
                                            description={description}
                                            price={price}
                                        ></AdditionalServices>
                                        <td className="text-center">
                                            <Link to={`update/${_id}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                                </svg>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}