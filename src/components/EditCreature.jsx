import { useLocation } from "react-router-dom"
import { useState } from "react"
import back from "../assets/back-btn.png"
import { Link } from "react-router-dom"

export default function EditCreature(){
    const location = useLocation()
    const creature = location.state?.creature
    const [newTitle, setNewTitle] = useState(creature?.title)
    const [newHp, setNewHp] = useState(creature?.hp)
    const [newInit, setNewInit] = useState(creature?.init_bonus)

    function saveCreature(){

    }

    return(
        <>
            <Link to="/creatures"><img src={back} className="back-btn"/></Link>
            <h2>Editing {creature.title}</h2>
            <form onSubmit={saveCreature} className="form">
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
                <button className="blue-btn">Save</button>
                <button className="blue-btn" style={{backgroundColor:"red"}}>Delete</button>
                </span>
            </form>
            <br/>
        </>
    )
}