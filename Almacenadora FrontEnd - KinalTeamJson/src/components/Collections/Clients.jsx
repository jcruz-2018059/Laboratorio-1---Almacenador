import React from "react"

export const Clients = ({name, surname, dpi, phone})=>{
    return (
        <>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{dpi}</td>
            <td>{phone}</td>
        </>
    )
}