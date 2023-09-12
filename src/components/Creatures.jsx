import { Link, useNavigate } from "react-router-dom"
import back from "../assets/back-btn.png"

export default function Creatures({ user }){
    return(
    <>
    {user
    ?<>
        <Link to="/menu"><img src={back} className="back-btn"/></Link>
        <h2>Creatures</h2>
    </>
    
    :<>
        <h1>You are not logged in</h1>
        <p>Please <Link to="/">login</Link> to access this page</p>
    </>
    }
    </>
    )
}