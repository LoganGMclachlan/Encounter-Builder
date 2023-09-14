import { Link } from "react-router-dom"
import back from "../assets/back-btn.png"
import { useState, useEffect } from "react"
import { getDocs, collection, addDoc } from "firebase/firestore"
import { db } from "../config/firebase"

export default function Characters({ user }){
    const [parties, setParties] = useState(null)

    useEffect(() => {
        getParties()
    }, [])

    async function getParties(){
        try{
            const rawData = await getDocs(collection(db, "parties"))
            const filteredData = rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }))
            setParties(filteredData.filter(party => party.user_id === user.uid))
        }
        catch(err){console.error(err)}
    }

    async function addNewParty(){
        try{
            await addDoc(collection(db, "creatures"), {
                "title":"New Creature",
                "init_bonus":0,
                "hp":0,
                "user_id": user.uid
            })
            getCreatures()
        }
        catch(err){console.error(err)}
    } 

    return(
    <>
    {user
    ?<>
        <Link to="/menu"><img src={back} className="back-btn"/></Link>
        <h2>Characters</h2>
        {parties
        ?<table className="table">
            <thead>
                <tr>
                    <th>Party Title</th>
                </tr>
            </thead>
            <tbody>
                {parties.map(party => 
                    <tr key={party.id}>{party.title}</tr>
                )}
            </tbody>
        </table>
        :<h2>Loading your character parties...</h2>
        }
        <button className="blue-btn bar" onClick={addNewParty} style={{marginLeft:"0px"}}>
                New Party
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