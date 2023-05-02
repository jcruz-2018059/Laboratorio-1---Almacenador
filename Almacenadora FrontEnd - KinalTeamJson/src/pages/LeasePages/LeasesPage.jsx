import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { CardLease } from '../../components/Cards/CardLease'
import { Link } from 'react-router-dom'

export const LeasesPage = () => {
    const [leases, setLeases] = useState([{}])

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

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
            let confirmDelete = confirm('Estás seguro de eliminar este Arrendamiento?')
            if (confirmDelete) {
                const { data } = await axios.delete(`http://localhost:2651/lease/deleteLease/${id}`, config)
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
            <main>
                <div className='container'>
                <div className='title'>
                    <h1 className='text-center pt-5 pb-5'>Arrendamientos</h1>
                </div>
                <div className='mb-5 d-flex justify-content-between'>
                    <Link to='/start'>
                        <button className='btn btn-primary'>Volver al tablero</button>
                    </Link>
                    <Link to='add' className='ms-auto'>
                        <button className='btn btn-secondary'>Agregar Arrendamiento</button>
                    </Link>
                </div>
                <div className='row g-0 justify-content-center'>
                    {
                        leases.map(({ _id, client: { name: clientName } = {}, store: { name: storeName } = {}, date, total }, i) => {
                            return (
                                <CardLease
                                    key={i}
                                    id={_id}
                                    client={clientName}
                                    store={storeName}
                                    date={date}
                                    total={total}
                                >
                                </CardLease>
                            )
                        })
                    }

                </div>
                </div>
            </main>
        </>


    )

}
