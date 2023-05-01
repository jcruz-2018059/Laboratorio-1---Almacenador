import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from "axios"

export const UpdateClientPage = () => {
  const [client, setClient] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams();

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getClient = async () => {
    try {
      const { data } = await axios(`http://localhost:2651/client/get/${id}`, { headers: headers })
      setClient(data.client)
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  const updateClient = async () => {
    try {
      let updatedClient = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        dpi: document.getElementById('dpi').value,
        phone: document.getElementById('phone').value,
      }
      const { data } = await axios.put(`http://localhost:2651/client/update/${id}`, updatedClient, { headers: headers })
      console.log(`${data.message} ${data.updateClient.name}`)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => getClient, [])


  return (
    <>
      <div className='title'>
        <h1 className='text-center pt-5 pb-5'>Editar Clientes</h1>
      </div>
      <div className="container border" style={{ maxWidth: 550, maxHeight: 1200 }}>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre</label>
            <input defaultValue={client.name} type="text" className="form-control" id="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label">Apellido</label>
            <input defaultValue={client.surname} type="text" className="form-control" id="surname" required />
          </div>
          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label">Dpi</label>
            <input defaultValue={client.dpi} type="text" className="form-control" id="dpi" required />
          </div>
          <div>
            <div className="col-md-6">
              <div className="mb-3">
              <label htmlFor="apellido" className="form-label">Phone</label>
                <input defaultValue={client.phone} type="text" className="form-control" id="phone" required />
              </div>
            </div>
            <Link to='/start/clients' className='text-center'>
              <button onClick={() => updateClient()} type="submit" className="btn btn-primary">Editar</button>
            </Link>
          </div>
        </form>
      </div>
    </>

  )
}