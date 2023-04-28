import App from './App'
import './index.css'
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
import { StorePage } from './pages/Storepages/StorePage'
import { TableStore } from './components/Tables/TableStore'

export const AuthContext = createContext();



export const Index = () => {


    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) setLoggedIn(true)
    }, [])

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
                            element: <WorkerPage></WorkerPage>,
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
                                
                            ]
                        },

                        {
                            path: 'store',
                            element: <StorePage></StorePage>,
                            children:[ 
                                {
                                    path: '',
                                    element: <TableStore></TableStore>
                                }
                                
                            ]
                        }
                    ]
                },
            ]
        }
    ])

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            <RouterProvider router={routes} />
        </AuthContext.Provider>
    )
}