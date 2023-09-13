import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import back from "../assets/back-btn.png"
import { Link } from "react-router-dom"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "../config/firebase"

export default function EditCreature(){
    const navigate = useNavigate()
    const location = useLocation()
    const creature = location.state?.creature
    const [newTitle, setNewTitle] = useState(creature?.title)
    const [newHp, setNewHp] = useState(creature?.hp)
    const [newInit, setNewInit] = useState(creature?.init_bonus)
    const [error, setError] = useState("")

    async function saveCreature(creatureId){
        if(newTitle === ""){
            setError("Enter a title for this creature.")
            return
        }
        if(newHp < 0){
            setError("Hp cannot be a negative number.")
            return
        }

        try{
            await updateDoc(
                doc(db, "creatures", creatureId),
                {title:newTitle,init_bonus:Number(newInit),hp:Number(newHp)}
            )
            navigate("/creatures")
        }
        catch(error){console.error(error)}
    }

    async function deleteCreature(creatureId){
        try{
            await deleteDoc(doc(db, "creatures", creatureId))
            navigate("/creatures")
        }
        catch(error){console.error(error)}
    }

    return(
        <>
        {creature
        ?<>
            <Link to="/creatures"><img src={back} className="back-btn"/></Link>
            <h2>Editing {creature.title}</h2>
            <div className="form">
            <p className="error">{error}</p>
                <input
                    placeholder="new title"
                    className="form-input"
                    value={newTitle}
                    style={{width:"150px",textAlign:"center"}}
                    onChange={e => setNewTitle(e.target.value)}
                />
                <label>Hit Points</label>
                <input
                    placeholder="hp"
                    className="form-input"
                    value={newHp}
                    style={{width:"40px"}}
                    type="number"
                    onChange={e => setNewHp(e.target.value)}
                />
                <label>Initiative Bonus</label>
                <input
                    placeholder="initiative bonus"
                    className="form-input"
                    value={newInit}
                    style={{width:"30px"}}
                    type="number"
                    onChange={e => setNewInit(e.target.value)}
                />
                <span>
                <button className="blue-btn" onClick={() => saveCreature(creature.id)}>Save</button>
                <button className="blue-btn" style={{backgroundColor:"red"}}
                    onClick={() => deleteCreature(creature.id)}>Delete</button>
                </span>
            </div>
            <br/>
        </>
        :<>
            <h2>No Creature has been selected</h2>
            <Link>Return</Link>
            <br/>
        </>
        }
        </>
    )
}