import React from 'react'
import { Outlet } from 'react-router-dom'
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
            console.log(users)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => getUsers, [])


    return (
        <>  
        <div className='title'>
            <h1 className='text-center pt-5 pb-5'>Trabajadores</h1>
        </div>

            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Password</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Role</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(({_id, name, surname, username, password, email, phone, role}, index) => {
                                return(
                                    <tr key={index}>
                                        <Users
                                            name={name}
                                            surname={surname}
                                            username={username}
                                            password={password}
                                            email={email}
                                            phone={phone}
                                            role={role}
                                        ></Users>
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
