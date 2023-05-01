import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const AddAdditionalServicesPage = () => {

    const token = localStorage.getItem('token');

    const config = {
        headers: {}
    };

    if (token) {
        config.headers.Authorization = token;
    }

    const addAdditionalServices = async()=>{
        try{
            let additionalServices = {
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                price: document.getElementById('price').value,
            }
            const { data } = await axios.post('http://localhost:2651/additionalServices/addServices', additionalServices, config)
            alert(data.message)
            console.log(data.message)
        }catch(err){
            alert(err.response.data.message)
        }
    }

    return (
        <>
        <div className='title'>
            <h1 className='text-center pt-5 pb-5'>Agregar Servicios Adicionales</h1>
        </div>
            <div className="container border" style={{maxWidth: 550, maxHeight:1200}}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="name" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contrasena" className="form-label">Descripción</label>
                        <input type="text" className="form-control" id="description" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contrasena" className="form-label">Precio</label>
                        <input type="number" className="form-control" id="price" required/>
                    </div>
                    <div className="row">
                        <Link to='/start/AdditionalServices'>
                        <button onClick={()=> addAdditionalServices()} type="submit" className="btn btn-primary">Registrarse</button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
        
        
    )
}