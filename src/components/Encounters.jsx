import { Link, useNavigate } from "react-router-dom"
import back from "../assets/back-btn.png"
import { useState, useEffect } from "react"
import { getDocs, collection, addDoc } from "firebase/firestore"
import { db } from "../config/firebase"

export default function Encounters({ user }){
    const [encounters, setEncounters] = useState([])
    const [searchFinnished, setSearchFinnished] = useState(false)

    useEffect(() => {
        getEncounters()
    }, [])

    async function getEncounters(){
        try{
            const rawData = await getDocs(collection(db, "encounters"))
            const filteredData = rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }))
            setEncounters(filteredData.filter(encounter => encounter.user_id === user.uid))
        }
        catch(err){console.error(err)}
        finally{setSearchFinnished(true)}
    }

    return(
    <> 
    {user
    ?<>
        <Link to="/menu"><img src={back} className="back-btn"/></Link>
        <h2>Encounters</h2>
        {encounters.length > 0
        ?<table className="table">
            <thead>
                <tr>
                    <th>Encounter</th>
                </tr>
            </thead>
            <tbody>
                {encounters.map(encounter =>
                    <tr key={encounter.id}>
                        <td>{encounter.title}</td>
                        <td style={{padding:"0px"}}><button className="run_btn">Run</button></td>
                    </tr>    
                )}
            </tbody>
        </table>
        :<>{searchFinnished
            ?<h3>You have no encounters.</h3>
            :<h3>Loading Your Encounters...</h3>
        }</>
        }
        <button className="blue-btn bar" style={{marginLeft:"0px"}}>
                New Encounter
        </button>
    </>
    
    :<>
        <h1>You are not logged in</h1>
        <p>Please <Link to="/">login</Link> to access this page</p>
    </>
    }
    </>
    )
}