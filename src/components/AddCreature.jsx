import { useState, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { doc, updateDoc, deleteDoc, getDocs, collection, addDoc } from "firebase/firestore"
import { db } from "../config/firebase"

export default function AddCreature(){
    const navigate = useNavigate()
    const location = useLocation()
    let encounter = location.state?.encounter
    const [creatures, setCreatures] = useState([])
    const [searchFinnished, setSearchFinnished] = useState(false)
    const [selectedCreature, setSelectedCreature] = useState(null)
    const [count, setCount] = useState(0)
    const [error, setError] = useState("")

    useEffect(() => {
        getCreatures()
    }, [])

    async function getCreatures(){
        try{
            const rawData = await getDocs(collection(db, "creatures"))
            const filteredData = rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }))
            setCreatures(filteredData.filter(creature => creature.user_id === encounter.user_id))
        }
        catch(err){console.error(err)}
        finally{setSearchFinnished(true)}
    }

    return(
        <>
        {encounter
        ?<>
        {creatures.length > 0
        ?<div className="form">
            <h2>Adding Creature</h2>
            <p className="error">{error}</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Choose A Creature</th>
                    </tr>
                </thead>
                <tbody>
                    {creatures.map(creature => 
                        <tr>
                            {creature.id === selectedCreature
                            ?<td style={{backgroundColor:"lightblue"}}>{creature.title}</td>
                            :<td onClick={() => setSelectedCreature(creature.id)}>{creature.title}</td>
                            }
                        </tr>    
                    )}
                </tbody>
            </table>

            <span>
                <label>Count: </label>
                <input
                    type="number"
                    style={{width:"40px"}}
                    onChange={e => setCount(e.target.value)}
                    />
            </span>
            <span>
                <Link to="/editEncounter" state={{encounter:encounter}}><button className="blue-btn" style={{backgroundColor:"red"}}>Cancel</button></Link>
                <button className="blue-btn">Confirm</button>
            </span>
            <br/>
        </div>
        :<>
            <h3>You dont have any creatures to add</h3>
            <Link to="/creatures">Create one here</Link>
        </>
        }
        </>

        :<>
            <h2>No Encounter has been selected</h2>
            <Link onClick={() => navigate(-1)}>Return</Link>
            <br/><br/>
        </>
        }
        </>
    )
}