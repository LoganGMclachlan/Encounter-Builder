import { Link, useNavigate } from "react-router-dom"
import back from "../assets/back-btn.png"
import { useState, useEffect } from "react"
import { getDocs, collection } from "firebase/firestore"
import { auth, db } from "../config/firebase"

export default function Creatures({ user }){
    const [creatures, setCreatures] = useState(null)

    useEffect(() => {
        getCreatures()
    }, [])

    async function getCreatures(){
        try{
            const rawData = await getDocs(collection(db, "creatures"))
            const filteredData = rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }))
            setCreatures(filteredData.filter(creature => creature.user_id === user.uid))
        }
        catch(err){console.error(err)}
    }

    return(
    <>
    {user
    ?<>
        <Link to="/menu"><img src={back} className="back-btn"/></Link>
        <h2>Creatures</h2>
        {creatures &&
        <table className="creature-table">
            <thead>
                <tr>
                    <th style={{width:"70%"}}>Title</th>
                    <th>Bonus</th>
                    <th>Hp</th>
                </tr>
            </thead>
            <tbody>
                {creatures.map(creature => 
                    <tr key={creature.id}>
                        <td>{creature.title}</td>
                        <td>{creature.init_bonus}</td>
                        <td>{creature.hp}</td>
                    </tr>
                )}
            </tbody>
        </table>
        }
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