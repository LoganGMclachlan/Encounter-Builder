import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import back from "../assets/back-btn.png"
import { Link } from "react-router-dom"
import { doc, updateDoc, deleteDoc, getDocs, collection, addDoc } from "firebase/firestore"
import { db } from "../config/firebase"

export default function EditParty(){
    const navigate = useNavigate()
    const location = useLocation()
    const party = location.state?.party
    const [newTitle, setNewTitle] = useState(party?.title)
    const [characters, setCharacters] = useState(null)
    const [searchFinnished, setSearchFinnished] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        getCharacters()
    }, [])

    async function getCharacters(){
        try{
            const rawData = await getDocs(collection(db, "characters"))
            const filteredData = rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }))
            setCharacters(filteredData.filter(char => char.party_id === party.id))
        }
        catch(err){console.error(err)}
        finally{setSearchFinnished(true)}
    }

    async function saveParty(partyId){
        if(newTitle === ""){
            setError("Enter a title for this party.")
            return
        }

        try{
            await updateDoc(
                doc(db, "parties", partyId),
                {title:newTitle}
            )
            navigate("/characters")
        }
        catch(error){console.error(error)}
    }

    async function deleteParty(partyId){
        if(!window.confirm("Are you sure you want to delete this party?")){return}

        try{
            characters.map(async char => {
                await deleteDoc(doc(db, "characters", char.id))
            })
            await deleteDoc(doc(db, "parties", partyId))
            navigate("/characters")
        }
        catch(error){console.error(error)}
    }

    async function addNewCharacter(){
        try{
            await addDoc(collection(db, "characters"), {
                "name":"New Character",
                "hp":1,
                "init_bonus":0,
                "party_id": party.id
            })
            getCharacters()
        }
        catch(err){console.error(err)}
    } 

    return(
        <>
        {party
        ?<>
            <Link to="/characters"><img src={back} className="back-btn"/></Link>
            <h2>Editing {party.title}</h2>
            <div className="form">
                <p className="error">{error}</p>
                <input
                    placeholder="new title"
                    className="form-input"
                    value={newTitle}
                    style={{width:"150px",textAlign:"center"}}
                    onChange={e => setNewTitle(e.target.value)}
                />

                {characters?.length > 0
                ?<table className="table">
                    <thead>
                        <tr>
                            <th style={{width:"70%"}}>Name</th>
                            <th>Bonus</th>
                            <th>Hp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {characters.map(char => 
                            <tr key={char.id}>
                                <td><Link to="/editCharacter" state={{char:char,party:party}}>
                                    {char.name}
                                </Link></td>
                                <td>{char.init_bonus}</td>
                                <td>{char.hp}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                :<>{searchFinnished
                    ?<h3>This party has no characters.</h3>
                    :<h3>Loading Your characters...</h3>
                }</>
                }
                
                <span>
                    <button className="blue-btn" onClick={() => saveParty(party.id)}>Save</button>
                    <button className="blue-btn" style={{backgroundColor:"red"}}
                        onClick={() => deleteParty(party.id)}>Delete</button>
                </span>
            </div>
            <br/>
            <button className="blue-btn bar" style={{marginLeft:"0px"}} onClick={addNewCharacter}>
                Add Character
            </button>
            <br/>
        </>
        :<>
            <h2>No Party has been selected</h2>
            <Link onClick={() => navigate(-1)}>Return</Link>
            <br/><br/>
        </>
        }
        </>
    )
}