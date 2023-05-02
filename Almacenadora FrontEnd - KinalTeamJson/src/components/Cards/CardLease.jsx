import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const CardLease = ({id, client, store, date, total}) => {
    const [leases, setLeases] = useState([{}])
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
    const idCard = id;

    const getLeases = async () => {
        try {
            const { data } = await axios('http://localhost:2651/lease/getleases', { headers: headers })
            if (data.leases) {
                setLeases(data.leases)
                console.log(data.leases)
            }
        } catch (err) {
            console.log(err)
            throw new Error('Error getting leases')
        }
    }

    const deleteLease = async (id) => {
        try {
            console.log(id)
            let confirmDelete = confirm('Estás seguro de eliminar este Arrendamiento?')
            if (confirmDelete) {
                const { data } = await axios.delete(`http://localhost:2651/lease/deleteLease/${id}`, { headers: headers })
                console.log(data)
                getLeases()
            }
        } catch (err) {
            console.error(err)
        }
    }
useEffect(() => getLeases, [])
  return (
      <>
          <div className="card m-3 row g-0" style={{maxWidth: '18rem', maxHeight: '20rem'}}>
                  <div className="card-body">
                      <h5 className="card-title">Arrendamiento</h5>
                      <p className='card-text'>Cliente: {client}</p>
                      <p className="card-text">Bodega: {store}</p>
                      <p className="card-text">Precio: Q{total}</p>
                      <a onClick={() => deleteLease(idCard)}className="btn btn-primary">Eliminar</a>
                      <Link to={`addService/${idCard}`} className="btn btn-primary m-2">Añadir servicio</Link>
                  </div>
          </div>
      </>
  )
}