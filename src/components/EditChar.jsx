import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import back from "../assets/back-btn.png"
import { Link } from "react-router-dom"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "../config/firebase"

export default function EditChar(){
    const navigate = useNavigate()
    const location = useLocation()
    const char = location.state?.char
    const party = location.state?.party
    const [newName, setNewName] = useState(char?.name)
    const [newHp, setNewHp] = useState(char?.hp)
    const [newInit, setNewInit] = useState(char?.init_bonus)
    const [error, setError] = useState("")

    async function saveChar(charId){
        if(newName === ""){
            setError("Enter a title for this party.")
            return
        }
        if(newHp < 0){
            setError("Hp cannot be a negative number.")
            return
        }

        try{
            await updateDoc(
                doc(db, "characters", charId),
                {name:newName,init_bonus:Number(newInit),hp:Number(newHp)}
            )
            navigate("/editParty",{state:{party:party}})
        }
        catch(error){console.error(error)}
    }

    async function deleteChar(charId){
        if(!window.confirm("Are you sure you want to delete this character?")){return}

        try{
            await deleteDoc(doc(db, "characters", charId))
            navigate("/editParty",{state:{party:party}})
        }
        catch(error){console.error(error)}
    }

    return(
        <>
        {char
        ?<>
            <Link to="/editParty" state={{party:party}}><img src={back} className="back-btn"/></Link>
            <h2>Editing {char.title}</h2>
            <div className="form">
                <p className="error">{error}</p>
                <input
                    placeholder="new name..."
                    className="form-input"
                    value={newName}
                    style={{width:"150px",textAlign:"center"}}
                    onChange={e => setNewName(e.target.value)}
                />
                <label>Hit Points</label>
                <input
                    placeholder="new hp..."
                    className="form-input"
                    type="number"
                    value={newHp}
                    style={{width:"150px",textAlign:"center"}}
                    onChange={e => setNewHp(e.target.value)}
                />
                <label>Initiative Bonus</label>
                <input
                    placeholder="new initiative..."
                    className="form-input"
                    type="number"
                    value={newInit}
                    style={{width:"150px",textAlign:"center"}}
                    onChange={e => setNewInit(e.target.value)}
                />
                
                <span>
                    <button className="blue-btn" onClick={() => saveChar(char.id)}>Save</button>
                    <button className="blue-btn" style={{backgroundColor:"red"}}
                        onClick={() => deleteChar(char.id)}>Delete</button>
                </span>
            </div>
            <br/>
        </>
        :<>
            <h2>No Character has been selected</h2>
            <Link onClick={() => navigate(-1)}>Return</Link>
            <br/><br/>
        </>
        }
        </>
    )
}