import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from 'axios';
import { Users } from '../Collections/Users';

export const Table = () => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            Authorization: `${token}`
        }
    }

    const [users, setUsers] = useState([{}])
    const [loading, setLoading] = useState(true)

    const getUsers = async () => {
        try {
            const { data } = await axios('http://localhost:2651/user/get', config)
            setUsers(data.users)
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteUser = async (id) => {
        try {
            let confirmDelete = confirm('Estás seguro de eliminar este Usuario?')
            if (confirmDelete) {
                const { data } = await axios.delete(`http://localhost:2651/user/delete/${id}`, config)
                console.log(data)
                getUsers()
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => getUsers, [])


    return (
        <>
            <div className='title'>
                <h1 className='text-center pt-5 pb-5'>Usuarios</h1>
            </div>

            <div className="container">
                <div className='mb-5 d-flex justify-content-between'>
                    <Link to='/start'>
                    <button className='btn btn-primary'>Volver al tablero</button>
                    </Link>
                    <Link to='add' className='ms-auto'>
                    <button className='btn btn-secondary'>Agregar Cuenta</button>
                    </Link>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(({ _id, name, surname, username, email, phone }, index) => {
                                return (
                                    <tr key={index}>
                                        <Users
                                            name={name}
                                            surname={surname}
                                            username={username}
                                            email={email}
                                            phone={phone}
                                        ></Users>
                                        <td>
                                            <Link to={`update/${_id}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                                </svg>
                                            </Link>
                                            <Link>
                                                <svg onClick={() => deleteUser(_id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
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
