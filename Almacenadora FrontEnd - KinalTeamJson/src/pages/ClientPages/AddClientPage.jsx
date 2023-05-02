import React from 'react'
import { Table } from '../../components/Tables/Table'
import axios from 'axios'
import { Link } from 'react-router-dom'


export const AddClientPage = () => {

    const token = localStorage.getItem('token');

    const config = {
        headers: {}
    };

    if (token) {
        config.headers.Authorization = token;
    }

    const addClient = async()=>{
        try{
            let client = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value,
                dpi: document.getElementById('dpi').value,
                phone: document.getElementById('phone').value,
            }
            const { data } = await axios.post('http://localhost:2651/client/add', client, config)
            alert(data.message)
            console.log(data.message)
        }catch(err){
            alert(err.response.data.message)
        }
    }

    return (
        <>
        <div className='title'>
            <h1 className='text-center pt-5 pb-5'>Agregar Cliente</h1>
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
                        <label htmlFor="contrasena" className="form-label">Dpi</label>
                        <input type="number" className="form-control" id="dpi" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Phone</label>
                        <input type="number" className="form-control" id="phone" required/>
                    </div>
                    <div className="row">
                        <Link className='col-md-12 text-center' to='/start/clients'>
                        <button onClick={()=> addClient()} type="submit" className="btn btn-primary w-100">Registrar Cliente</button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
        
        
    )
}