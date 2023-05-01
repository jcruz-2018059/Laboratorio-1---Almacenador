import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from "axios"

export const UpdateAdditionalServices = () => {
    const [additionalServices, setAdditionalServices] = useState({})
    const [loading, setLoading] = useState(true)
    const { id } = useParams();

const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getAdditionalServices = async () => {
    try {
      const { data } = await axios(`http://localhost:2651/additionalServices/getService/${id}`, { headers: headers })
      setAdditionalServices(data.addAdditionalService)
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  const updateAdditionalServices = async () => {
    try {
      let updatedAdditionalServices = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
      }
      const { data } = await axios.put(`http://localhost:2651/additionalServices/updateService/${id}`, updatedAdditionalServices, { headers: headers })
      console.log(`${data.message} ${data.updatedAdditionalServices.name}`)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => getAdditionalServices, [])


  return (
    <>
      <div className='title'>
        <h1 className='text-center pt-5 pb-5'>Editar Servicios Adicionales</h1>
      </div>
      <div className="container border" style={{ maxWidth: 550, maxHeight: 1200 }}>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre</label>
            <input defaultValue={additionalServices.name} type="text" className="form-control" id="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label">Descripción</label>
            <input defaultValue={additionalServices.description} type="text" className="form-control" id="description" required />
          </div>
          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label">Precio</label>
            <input defaultValue={additionalServices.price} type="text" className="form-control" id="price" required />
          </div>
            <Link to='/start/AdditionalServices' className='text-center'>
              <button onClick={() => updateAdditionalServices()} type="submit" className="btn btn-primary">Editar</button>
            </Link>
        </form>
      </div>
    </>

  )
}