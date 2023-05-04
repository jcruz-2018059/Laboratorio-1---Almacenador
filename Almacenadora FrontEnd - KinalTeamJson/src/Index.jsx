import App from './App'
import React, {createContext, useState, useEffect} from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginPage } from './pages/UserPages/LoginPage.jsx'
import { HomePage } from './pages/HomePage/HomePage.jsx'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.jsx'
import { MenuPage } from './pages/MenuPage/MenuPage.jsx'
import { WorkerPage } from './pages/UserPages/WorkerPage'
import { Menu } from './components/Menu'
import { AddUser } from './pages/UserPages/AddUser'
import { Table } from './components/Tables/Table'
import { UpdateUser } from './pages/UserPages/UpdateUser'
import { ClientPage } from './pages/ClientPages/ClientPage'
import { TableClient } from './components/Tables/TableClient'
import { AddClientPage } from './pages/ClientPages/AddClientPage'
import { UpdateClientPage } from './pages/ClientPages/UpdateClientPage'
import { AdditionalServicesPage } from './pages/AdditionalServicesPages/AdditionalServicesPage'
import { TableAdditionalServices } from './components/Tables/TableAdditionalServices'
import { AddAdditionalServicesPage } from './pages/AdditionalServicesPages/AddAditionalServicesPage'
import { UpdateAdditionalServices } from './pages/AdditionalServicesPages/UpdateAdditionalServicesPage'
import { TableStore } from './components/Tables/TableStore'
import { StorePage } from './pages/Storepages/StorePage'
import { AddStore } from './pages/Storepages/AddStore'
import { UpdateStore } from './pages/Storepages/UpdateStore'
import { useContext } from 'react'
import { MenuWorker } from './components/MenuWorker'
import { LeasePage } from './pages/LeasePages/LeasePage'
import { LeasesPage } from './pages/LeasePages/LeasesPage'
import { AddLeasePage } from './pages/LeasePages/AddLeasePage'
import { AddServices } from './pages/LeasePages/AddServices'
import { EditLeasePage } from './pages/LeasePages/EditLeasePage'


export const AuthContext = createContext();
const role = localStorage.getItem('role')


export const Index = () => {
    const [dataUser, setDataUser] = useState({
        name: '',
        username: '',
        role: ''
      })
    
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(()=>{
        let token = localStorage.getItem('token')
        if(token) setLoggedIn(true)
    }, [])

    useEffect(()=>{
        let data = dataUser
        if(data) setDataUser(data);
    }, [dataUser])


    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App></App>,
            errorElement: <NotFoundPage />,
            children: [
                {
                    path: '/',
                    element: <HomePage></HomePage>
                },
                {
                    path: '/login',
                    element: <LoginPage></LoginPage>
                },
                {
                    path: '/start',
                    element: loggedIn ? <MenuPage/> : <LoginPage/>,
                    children: [
                        {
                            path: '',
                            element: <Menu></Menu> 
                        },
                        {
                            path: 'workers',
                            element: role != 'WORKER' ? <WorkerPage></WorkerPage> : <NotFoundPage /> ,
                            children:[
                                {
                                    path: '',
                                    element: <Table></Table>,
                                },
                                {
                                    path: 'add',
                                    element: <AddUser></AddUser>,
                                },
                                {
                                    path: 'update/:id',
                                    element: <UpdateUser></UpdateUser>,
                                },
                            ]
                        },
                        {
                            path: 'clients',
                            element: <ClientPage></ClientPage>,
                            children:[
                                {
                                    path: '',
                                    element: <TableClient></TableClient>
                                },
                                {
                                    path: 'add',
                                    element: <AddClientPage></AddClientPage>
                                },
                                {
                                    path: 'update/:id',
                                    element: <UpdateClientPage></UpdateClientPage>
                                },     
                            ]    
                        },
                        {
                            path: 'AdditionalServices',
                            element: role != 'WORKER' ? <AdditionalServicesPage></AdditionalServicesPage> : <NotFoundPage /> ,
                            children: [
                                {
                                    path: '',
                                    element: <TableAdditionalServices></TableAdditionalServices>
                                },
                                {
                                    path: 'add',
                                    element: <AddAdditionalServicesPage></AddAdditionalServicesPage>
                                },
                                {
                                    path: 'update/:id',
                                    element: <UpdateAdditionalServices></UpdateAdditionalServices>
                                }
                            ]
                        },
                        {
                            path: 'store',
                            element: role != 'WORKER' ? <StorePage></StorePage> : <NotFoundPage /> ,
                            children:[ 
                                {
                                    path: '',
                                    element: <TableStore></TableStore>
                                },

                                {
                                    path: 'add',
                                    element: <AddStore></AddStore>
                                },

                                {
                                    path: 'update/:id',
                                    element: <UpdateStore></UpdateStore>
                                }

                                
                            ]
                        },
                        {
                            path: 'Lease',
                            element: <LeasePage></LeasePage>,
                            children:[
                                {
                                    path: '',
                                    element: <LeasesPage></LeasesPage>
                                },
                                {
                                    path: 'add',
                                    element: <AddLeasePage></AddLeasePage>
                                },
                                {
                                    path: 'addService/:id',
                                    
                                    element: <AddServices></AddServices>
                                },
                                {
                                    path: 'edit/:id',
                                    element: <EditLeasePage></EditLeasePage>
                                }
                            ]
                        }
                    ]
                },
            ]
        }
    ])

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, dataUser, setDataUser}}>
            <RouterProvider router={routes} />
        </AuthContext.Provider>
    )
}