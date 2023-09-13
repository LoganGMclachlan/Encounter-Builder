import { Link } from "react-router-dom"
import back from "../assets/back-btn.png"
import { useState, useEffect } from "react"
import { getDocs, collection, addDoc } from "firebase/firestore"
import { db } from "../config/firebase"

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

    async function addNewCreature(){
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
        <h2>Creatures</h2>
        {creatures
        ?<table className="creature-table">
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
                        <td><Link to="/editCreature" state={{creature:creature}}>
                            {creature.title}
                        </Link></td>
                        <td>{creature.init_bonus}</td>
                        <td>{creature.hp}</td>
                    </tr>
                )}
            </tbody>
        </table>
        :<h3>Loading Your Creatures...</h3>
        }
        <button className="blue-btn bar" onClick={addNewCreature} style={{marginLeft:"0px"}}>
                New Creature
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