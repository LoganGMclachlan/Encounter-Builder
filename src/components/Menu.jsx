import { auth } from "../config/firebase"
import { Link, useNavigate } from "react-router-dom"

export default function Menu({ user, setUser, logout }) {
    return(
    <>
    {user
    ?<>
        <h2>Menu</h2>
        <p>{user.email}</p>
    </>
    :<>
        <h1>You are not logged in</h1>
        <p>Please <Link to="/">login</Link> to access this page</p>
    </>
    }
    </>
    )
}