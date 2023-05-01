import React, {useState, useEffect} from "react";
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

    const getAdditionalServices = async()=>{
        try{
            const { data } = await axios('http://localhost:2651/additionalServices/getServices', config)
            setAdditionalServices(data.addAdditionalServices)
            console.log(data.addAdditionalServices)
        }catch(err){
            console.log(err)
        }
    }

    const deleteAdditionalServices = async(id)=>{
        try{
            let confirmDelete = confirm('Estas seguro de eliminar este cliente?')
            if(confirmDelete){
                const { data } = await axios.delete(`http://localhost:2651/AdditionalServices/delete/${id}`, config)
                console.log(data)
                getAdditionalServices()
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>getAdditionalServices, [])

    return (
        <>
               <div className='title'>
                    <h1 className='text-center pt-5 pb-5'>Servicios Adicionales</h1>
                    </div>

                <div className="container">
                    <div className='mb-5'>
                        <Link to='/start'>
                        <button className='btn btn-primary'>Volver al tablero</button>
                        </Link>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Acciones</th>
                            </tr>
                </thead>
                <tbody>
                    {
                       additionalServices.map(({ _id, name, description, price}, index) => {
                            return (
                                <tr key={index}>
                                    <AdditionalServices
                                        name={name}
                                        description={description}
                                        price={price}
                                    ></AdditionalServices>
                                    <td>
                                        <Link to={`update/${_id}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
                                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                            </svg>
                                        </Link>
                                            <svg onClick={() => deleteAdditionalServices(_id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                            </svg>
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