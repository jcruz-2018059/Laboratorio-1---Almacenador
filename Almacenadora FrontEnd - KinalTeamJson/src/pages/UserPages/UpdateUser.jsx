import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from "axios"

export const UpdateUser = () => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams();

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getUser = async () => {
    try {
      const { data } = await axios(`http://localhost:2651/user/get/${id}`, { headers: headers })
      setUser(data.user)
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  const updateUser = async () => {
    try {
      let updatedUser = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
      }
      const { data } = await axios.put(`http://localhost:2651/user/update/${id}`, updatedUser, { headers: headers })
      console.log(`${data.message} ${data.updatedUser.name}`)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => getUser, [])


  return (
    <>
      <div className='title'>
        <h1 className='text-center pt-5 pb-5'>Editar Trabajadores</h1>
      </div>
      <div className="container border" style={{ maxWidth: 550, maxHeight: 1200 }}>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre</label>
            <input defaultValue={user.name} type="text" className="form-control" id="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label">Apellido</label>
            <input defaultValue={user.surname} type="text" className="form-control" id="surname" required />
          </div>
          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label">Nombre de Usuario</label>
            <input defaultValue={user.username} type="text" className="form-control" id="username" required />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Email</label>
                <input defaultValue={user.email} type="email" className="form-control" id="email" required />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="apellido" className="form-label">Phone</label>
                <input defaultValue={user.phone} type="text" className="form-control" id="phone" required />
              </div>
            </div>
            <Link to='/start/workers' className='text-center'>
              <button onClick={() => updateUser()} type="submit" className="btn btn-primary">Editar</button>
            </Link>
          </div>
        </form>
      </div>
    </>

  )
}