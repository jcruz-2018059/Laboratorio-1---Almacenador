export const Users = ({name, surname, username, email, phone})=>{ //PROPS -> parámetros que se envían al mmomento de llamar el componente (la función)
    return (
        <>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>{phone}</td>
        </>
    )
}