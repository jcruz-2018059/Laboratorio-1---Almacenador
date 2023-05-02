import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export const AddServices = () => {
    const [additionalServices, setAdditionalServices] = useState([{}])
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const config = {
        headers: {
            Authorization: `${token}`
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

    
    const addService = async () =>{
        try{
            let service = {
                additionalService: document.getElementById('additionalServices').value
            }
            const { data } = await axios.put(`http://localhost:2651/lease/addService/${id}`, service, config)
            alert(data.message)
        }catch(err){
            console.error(err)
        }
    }

    useEffect(() => getAdditionalServices, [])
  return (
      
      <>
      <div className='title'>
            <h1 className='text-center pt-5 pb-5'>Agregar Servicios Adicionales</h1>
        </div>
            <div className="container border" style={{maxWidth: 550, maxHeight:1200}}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Nombre</label>
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
                    <div className="row">
                        <Link to='/start/lease'>
                        <button onClick={()=> addService()} type="submit" className="btn btn-primary">Agregar</button>
                        </Link>
                    </div>
                </form>
            </div>
      </>

  )
}
