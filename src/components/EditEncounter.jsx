import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import back from "../assets/back-btn.png"
import { Link } from "react-router-dom"
import { doc, updateDoc, deleteDoc, getDocs, collection, addDoc } from "firebase/firestore"
import { db } from "../config/firebase"

export default function EditEncounter(){
    const navigate = useNavigate()
    const location = useLocation()
    let encounter = location.state?.encounter
    const [newTitle, setNewTitle] = useState(encounter?.title)
    const [selectedParty, setSelectedParty] = useState(encounter?.party_id)
    const [parties, setParties] = useState([])
    const [deployments, setDeployments] = useState([])
    const [creatures, setCreatures] = useState([])
    const [searchFinnished, setSearchFinnished] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        getParties()
        getDeployments()
        getCreatures()
        setSearchFinnished(true)
    }, [])

    async function getParties(){
        try{
            const rawData = await getDocs(collection(db, "parties"))
            const filteredData = rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }))
            setParties(filteredData.filter(party => party.user_id === encounter.user_id))
        }
        catch(err){console.error(err)}
    }

    async function getDeployments(){
        try{
            const rawData = await getDocs(collection(db, "deployments"))
            const filteredData = rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            })) 
            setDeployments(filteredData.filter(deployment => deployment.encounter_id === encounter.id))
        }
        catch(err){console.error(err)}
    }

    async function getCreatures(){
        try{
            const rawData = await getDocs(collection(db, "creatures"))
            const filteredData = rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }))
            setCreatures(filteredData.filter(creature => creature.user_id === encounter.user_id))
        }
        catch(err){console.error(err)}
    }

    async function saveEncounter(encounterId){
        if(newTitle === ""){
            setError("Enter a title for this encounter.")
            return
        }

        try{
            await updateDoc(
                doc(db, "encounters", encounterId),
                {title:newTitle, party_id:selectedParty}
            )
            encounter.title = newTitle
            setMessage("Encounter title saved.")
        }
        catch(error){console.error(error)}
    }

    async function deleteEncounter(encounterId){
        if(!window.confirm("Are you sure you want to delete this party?")){return}

        try{
            deployments.map(async deployment => {
                await deleteDoc(doc(db, "deployments", deployment.id))
            })
            await deleteDoc(doc(db, "encounters", encounterId))
            navigate("/encounters")
        }
        catch(error){console.error(error)}
    }

    return(
        <>
        {encounter
        ?<>
            <Link to="/encounters"><img src={back} className="back-btn"/></Link>
            <h2>Editing {encounter.title}</h2>
            <div className="form">
                <p className="error">{error}</p>
                <p className="error" style={{color:"green"}}>{message}</p>
                <input
                    placeholder="new title..."
                    className="form-input"
                    value={newTitle}
                    style={{width:"150px",textAlign:"center"}}
                    onChange={e => setNewTitle(e.target.value)}
                />

                {parties.length > 0
                ?<table className="table">
                    <thead>
                        <tr>
                            <th>Selected Party</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parties.map(party => 
                            <tr key={party.id} style={{cursor:"pointer"}}>
                                {party.id === selectedParty
                                ?<td style={{backgroundColor:"lightblue"}}>{party.title}</td>
                                :<td onClick={() => setSelectedParty(party.id)}>{party.title}</td>
                                }
                            </tr>
                        )}
                    </tbody>
                </table>
                :<>{searchFinnished
                    ?<h3>You have no Parties.</h3>
                    :<h3>Loading Your Parties...</h3>
                }</>
                }
                
                {deployments.length > 0
                ?<table className="table">
                    <thead>
                        <tr>
                            <th>Creature</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deployments.map(deployment => 
                            <tr key={deployment.id}>
                                {creatures.map(creature =>
                                    <>
                                    {creature.id === deployment.creature_id &&
                                        <td>{creature.title}</td>
                                    }
                                    </>
                                )}
                                <td>{deployment.count}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                :<>{searchFinnished
                    ?<h3>You have no Deployments.</h3>
                    :<h3>Loading Your Deployments...</h3>
                }</>
                }

                <span>
                    <button className="blue-btn" onClick={() => saveEncounter(encounter.id)}>Save</button>
                    <button className="blue-btn" style={{backgroundColor:"red"}}
                        onClick={() => deleteEncounter(encounter.id)}>Delete</button>
                </span>
            </div>
            <br/>
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