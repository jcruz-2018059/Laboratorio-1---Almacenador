export const Users = ({name, surname, username, password, email, phone, role})=>{ //PROPS -> parámetros que se envían al mmomento de llamar el componente (la función)
    return (
        <>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{username}</td>
            <td>{password}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{role}</td>
        </>
    )
}