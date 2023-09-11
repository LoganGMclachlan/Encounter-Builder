import { auth } from "../config/firebase"
import { Link, useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import UserInfo from "./UserInfo"

export default function Menu({ user, setUser }) {
    const navigate = useNavigate()

    async function logout(){
        try{
            await signOut(auth)
            setUser(null)
            navigate("/")
        }
        catch(error){ console.error(error) }
    }

    return(
    <>
    {user
    ?<div className="menu">
        <UserInfo user={user}/>
        <button className="blue-btn big">Enocunters</button>
        <button className="blue-btn big">Creatures</button>
        <button className="blue-btn big">Characters</button>
        <button className="blue-btn big" onClick={logout}>Logout</button>
    </div>
    :<>
        <h1>You are not logged in</h1>
        <p>Please <Link to="/">login</Link> to access this page</p>
    </>
    }
    </>
    )
}