import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { NabvarAdmin } from '../../components/NabvarAdmin'

export const MenuPage = () => {

  return (
    <>
    <NabvarAdmin></NabvarAdmin>
      <Outlet></Outlet>
    </>

  )
}