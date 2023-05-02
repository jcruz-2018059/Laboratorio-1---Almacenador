import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';

export const AddLeasePage = () => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }
    const [clients, setClients] = useState([{}])
    const [store, setStore] = useState([{}])
    const [additionalServices, setAdditionalServices] = useState([{}])

    const getClients = async () => {
        try {
            const { data } = await axios('http://localhost:2651/client/get', config)
            setClients(data.categories)
        } catch (err) {
            console.log(err)
        }
    }

    const getStore = async () => {
        try {
            const { data } = await axios('http://localhost:2651/store/get', config)
            setStore(data.stores)
        } catch (err) {
            console.log(err)
        }
    }

    const getAdditionalServices = async () => {
        try {
            const { data } = await axios('http://localhost:2651/additionalServices/getServices', config)
            setAdditionalServices(data.addAdditionalServices)
        } catch (err) {
            console.log(err)
        }
    }

    const addLease = async () => {
        try {
            console.log(document.getElementById('client').value)
            let lease = {
                client: document.getElementById('client').value,
                store: document.getElementById('store').value,
                additionalServices: document.getElementById('additionalServices').value,
            }
            const { data } = await axios.put('http://localhost:2651/lease/addlease', lease, config)
            alert(data.message)
        } catch (err) {
            
        }
    }

    useEffect(() => getClients, [])
    useEffect(() => getStore, [])
    useEffect(() => getAdditionalServices, [])

    return (

        <>
            <div className='title'>
                <h1 className='text-center pt-5 pb-5'>Agregar Arrendamiento</h1>
            </div>
            <div className="container border" style={{ maxWidth: 550, maxHeight: 1200 }}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="client" className="form-label">Cliente</label>
                        <select className="form-control" id="client" required>
                            {
                                clients.map(({ _id, name, surname }, i) => {
                                    return (
                                        <option key={i} value={_id}>{`${name} ${surname}`}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="store" className="form-label">Bodega</label>
                        <select className="form-control" id="store" required>
                            {
                                store.map(({ _id, name, availability }, i) => {
                                    return (
                                        <option key={i} value={_id}>{`${name} ${availability}`}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="additionalServices" className="form-label">Servicios Adicionales</label>
                        <select className="form-control" id="additionalServices" required>
                            {
                                additionalServices.map(({ _id, name, price }, i) => {
                                    return (
                                        <option key={i} value={_id}>{`${name} - Q${price}`}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <Link to='/start/lease'>
                        <button onClick={() => addLease()} type="submit" className="btn btn-primary">Agregar</button>
                    </Link>
                </form>
            </div>
        </>
    )
}
