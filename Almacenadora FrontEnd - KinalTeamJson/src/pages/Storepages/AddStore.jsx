import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


export const AddStore = () => {

    const token = localStorage.getItem('token');

    const config = {
        headers: {}
    };

    if (token) {
        config.headers.Authorization = token;
    }

    const addStore = async()=>{
        try{
            let store = {
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                location: document.getElementById('location').value,
                size: document.getElementById('size').value,
                availability: document.getElementById('availability').value,
                price: document.getElementById('price').value,
            }
            const { data } = await axios.post('http://localhost:2651/store/add', store, config)
            alert(data.message)
        }catch(err){
            alert(err.response.data.message)
        }
    }

    return (

        <>
        <div className='title'>
            <h1 className='text-center pt-5 pb-5'>Agregar Bodega</h1>
        </div>
            <div className="container border" style={{maxWidth: 550, maxHeight:1200}}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="name" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contrasena" className="form-label">Descripcion</label>
                        <input type="text" className="form-control" id="description" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contrasena" className="form-label">Ubicacion</label>
                        <input type="text" className="form-control" id="location" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contrasena" className="form-label">Tamaño requerido</label>
                        <input type="text" className="form-control" id="size" required/>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Disponibilidad</label>
                                <input type="text" className="form-control" id="availability" required/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="apellido" className="form-label">Precio</label>
                                <input type="number" className="form-control" id="price" required/>
                            </div>
                        </div>
                        <Link className='col-md-12 text-center' to='/start/store'>
                        <button onClick={()=>  addStore()} type="submit" className="btn btn-primary w-100">Agregar Bodega</button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )

}