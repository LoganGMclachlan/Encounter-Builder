import { Link, useNavigate } from "react-router-dom"
import back from "../assets/back-btn.png"

export default function Creatures({ user }){
    return(
    <>
    {user
    ?<>
        <Link to="/menu"><img src={back} className="back-btn"/></Link>
        <h2>Creatures</h2>
        <table className="creature-table">
            <thead>
                <th style={{width:"70%"}}>Title</th>
                <th>Bonus</th>
                <th>Hp</th>
            </thead>
            <tbody>
                <tr>
                    <td>Goblin</td>
                    <td>+2</td>
                    <td>7</td>
                </tr>
            </tbody>
        </table>
        <button className="blue-btn bar">New Creature</button>
    </>
    
    :<>
        <h1>You are not logged in</h1>
        <p>Please <Link to="/">login</Link> to access this page</p>
    </>
    }
    </>
    )
}