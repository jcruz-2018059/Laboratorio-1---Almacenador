import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

export const AddUser = () => {

    const token = localStorage.getItem('token');

    const config = {
        headers: {}
    };

    if (token) {
        config.headers.Authorization = token;
    }

    const addUser = async()=>{
        try{
            let user = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value,
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
            }
            const { data } = await axios.post('http://localhost:2651/user/create', user, config)
            alert(data.message)
        }catch(err){
            alert(err.response.data.message)
        }
    }

    return (

        <>
        <div className='title'>
            <h1 className='text-center pt-5 pb-5'>Agregar Trabajadores</h1>
        </div>
            <div className="container border" style={{maxWidth: 550, maxHeight:1200}}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="name" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contrasena" className="form-label">Apellido</label>
                        <input type="text" className="form-control" id="surname" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contrasena" className="form-label">Nombre de Usuario</label>
                        <input type="text" className="form-control" id="username" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contrasena" className="form-label">Contraseña</label>
                        <input type="text" className="form-control" id="password" required/>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" required/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="apellido" className="form-label">Phone</label>
                                <input type="number" className="form-control" id="phone" required/>
                            </div>
                        </div>
                        <Link className='col-md-12 text-center' to='/start/workers'>
                        <button onClick={()=>  addUser()} type="submit" className="btn btn-primary w-100">Registrar Usuario</button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )

}