import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from "axios"

export const UpdateStore = () => {
  const [store, setStore] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams();

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getStore = async () => {
    try {
      const { data } = await axios(`http://localhost:2651/store/get/${id}`, { headers: headers })
      setStore(data.store)
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  const updateStore = async () => {
    try {
      let updated = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        location: document.getElementById('location').value,
        size: document.getElementById('size').value,
        availability: document.getElementById('availability').value,
        price: document.getElementById('price').value
      }
      const { data } = await axios.put(`http://localhost:2651/store/update/${id}`, updated, { headers: headers })
      console.log(`${data.message} ${data.updatedStore.name}`)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => getStore,[])


  return (
    <>
      <div className='title'>
        <h1 className='text-center pt-5 pb-5'>Editar Bodegas</h1>
      </div>
      <div className="container border" style={{ maxWidth: 550, maxHeight: 1200 }}>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre</label>
            <input defaultValue={store.name}  type="text" className="form-control" id="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label">Descripcion</label>
            <input defaultValue={store.description}  type="text" className="form-control" id="description" required />
          </div>
          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label">Ubicacion</label>
            <input defaultValue={store.location} type="text" className="form-control" id="location" required />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Tamaño requerido</label>
                <input defaultValue={store.size} type="email" className="form-control" id="size" required />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="apellido" className="form-label">Disponibilidad</label>
                <input defaultValue={store.availability} type="text" className="form-control" id="availability" required />
              </div>
              <div className="mb-3">
                <label htmlFor="apellido" className="form-label">Precio</label>
                <input defaultValue={store.price} type="text" className="form-control" id="price" required />
              </div>
            </div>
            <Link to='/start/store' className='text-center'>
              <button onClick={() => updateStore()} type="submit" className="btn btn-primary">Editar</button>
            </Link>
          </div>
        </form>
      </div>
    </>

  )
}