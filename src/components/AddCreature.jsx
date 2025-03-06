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
    const [count, setCount] = useState(1)
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

    async function addNewDeployment(){
        if(!selectedCreature){
            setError("Select a creature to add")
            return
        }

        if(count < 1){
            setError("Count must be at least 1")
            return
        }

        try{
            await addDoc(collection(db, "deployments"), {
                "count":count,
                "creature_id":selectedCreature,
                "encounter_id":encounter.id
            })
            navigate("/editEncounter",{state:{encounter:encounter}})
        }
        catch(err){console.error(err)}
    }

    return(
        <>
        {encounter
        ?<>
        {creatures.length > 0
        ?<div className="form">
            <h2>Choose a creature to add</h2>
            <p className="error">{error}</p>
            <div className="table">
                <tbody>
                    {creatures.map(creature => 
                        <tr>
                            {creature.id === selectedCreature
                            ?<td style={{backgroundColor:"lightblue"}}>{creature.title}</td>
                            :<td onClick={() => setSelectedCreature(creature.id)}>{creature.title}</td>
                            }
                            <td style={{padding:"0px"}}/>
                        </tr>    
                    )}
                </tbody>
            </div>

            <span>
                <label>Count: </label>
                <input
                    type="number"
                    style={{width:"40px"}}
                    onChange={e => setCount(e.target.value)}
                    value={count}
                    />
            </span>
            <span>
                <Link to="/editEncounter" state={{encounter:encounter}}>
                    <button className="blue-btn" style={{backgroundColor:"red"}}>Cancel</button>
                </Link>
                <button className="blue-btn" onClick={() => addNewDeployment()}>Confirm</button>
            </span>
            <br/>
        </div>
        :<>{searchFinnished
            ?<>
                <h3>You dont have any creatures to add</h3>
                <Link to="/creatures">Create one here</Link>
                <br/><br/>
            </>
            :<h3>Loading Your Creatures...</h3>
        }</>
        }</>

        :<>
            <h2>No Encounter has been selected</h2>
            <Link onClick={() => navigate(-1)}>Return</Link>
            <br/><br/>
        </>
        }
        </>
    )
}