import { Link } from "react-router-dom"
import back from "../assets/back-btn.png"
import { useState, useEffect } from "react"
import { getDocs, collection, addDoc } from "firebase/firestore"
import { db } from "../config/firebase"

export default function Characters({ user }){
    const [parties, setParties] = useState(null)
    const [searchFinnished, setSearchFinnished] = useState(false)

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
        finally{setSearchFinnished(true)}
    }

    async function addNewParty(){
        try{
            await addDoc(collection(db, "parties"), {
                "title":"New Party",
                "user_id": user.uid
            })
            getParties()
        }
        catch(err){console.error(err)}
    } 

    return(
    <>
    {user
    ?<>
        <Link to="/menu"><img src={back} className="back-btn"/></Link>
        <h2>Characters</h2>
        {parties?.length > 0
        ?<table className="table">
            <thead>
                <tr>
                    <th>Party Title</th>
                </tr>
            </thead>
            <tbody>
                {parties.map(party => 
                    <tr key={party.id}>
                        <td><Link to="/editParty" state={{party:party}}>
                            {party.title}
                        </Link></td>
                    </tr>
                )}
            </tbody>
        </table>
        :<>{searchFinnished
            ?<h3>You have no Parties.</h3>
            :<h3>Loading Your Parties...</h3>
        }</>
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