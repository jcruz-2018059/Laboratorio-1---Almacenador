import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

export const EditLeasePage = () => {
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }

    const [store, setStore] = useState([{}]);

    const getStore = async () => {
        try {
            const { data } = await axios('http://localhost:2651/store/get', config);
            setStore(data.stores);
        } catch (err) {
            console.log(err);
        }
    }

    const editLease = async () => {
        try {
            let updatedLease = {
                store: document.getElementById('store').value
            }
            console.log(updatedLease);
            const { data } = await axios.put(`http://localhost:2651/lease/updateLease/${id}`, updatedLease, config);
            alert(data.message)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => getStore, []);
  return (
    <>
        <div className='title'>
            <h1 className='text-center pt-5 pb-5'>Actualizar bodega</h1>
        </div>
            <div className="container border" style={{maxWidth: 550, maxHeight:1200}}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="store" className="form-label">Bodega</label>
                        <select className="form-control" id="store" required>
                            {
                                store.map(({ _id, name, price }, i) => {
                                    return (
                                        <option key={i} value={_id}>{`${name} - Q${price}`}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="row">
                        <Link to='/start/lease'>
                        <button onClick={()=> editLease()} type="submit" className="btn btn-primary">Actualizar</button>
                        </Link>
                    </div>
                </form>
            </div>
    </>
  )
}
