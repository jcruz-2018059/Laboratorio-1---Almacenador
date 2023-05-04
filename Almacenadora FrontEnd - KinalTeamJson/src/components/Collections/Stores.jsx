import React from "react"
export const Stores = ({name, description, 
    location, size, availability, price}) => {
  return (
    <>
        <td>{name}</td>
        <td>{description}</td>
        <td>{location}</td>
        <td>{size}</td>
        <td>{availability ? "Disponible" : "No disponible"}</td>
        <td>Q{price}</td>
    </>
  )
}
