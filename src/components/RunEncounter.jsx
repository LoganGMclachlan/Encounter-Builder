import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import back from "../assets/back-btn.png"
import { Link } from "react-router-dom"
import { getDocs, collection } from "firebase/firestore"
import { db } from "../config/firebase"

export default function EditEncounter(){
    const navigate = useNavigate()
    const location = useLocation()
    let encounter = location.state?.encounter
    const [encounterList, setEncounterList] = useState([])
    const [currentItem, setCurrentItem] = useState(1)

    useEffect(() => {
        startEncounter()
    }, [])

    function startEncounter(){
        setEncounterList([])
        getDeployedCreatures()
        setCurrentItem(1)
    }

    async function getCharacters(){
        try{
            const rawData = await getDocs(collection(db, "characters"))
            const filteredData = rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }))

            return filteredData.map(item => {
                if(item.party_id === encounter.party_id){
                    item.initiative = rollInitiative(item.init_bonus)
                    return item
                }
            })
        }
        catch(err){console.error(err)}
    }

    function rollInitiative(init_bonus){
        return Math.floor((Math.random() * (20 - 1) + 1) + init_bonus)
    }

    async function getDeployedCreatures(){
        const deployments = await getDeployments()
        const creatures = await getCreatures()
        let creatureList = await getCharacters()

        let foundCreature = false
        deployments.map(deployment => {
            foundCreature = false
            while (!foundCreature) {
                creatures.map(creature => {
                    if (creature.id === deployment.creature_id){
                        for (let i = 0; i < deployment.count; i++) {
                            const rolledCreature = {...creature}
                            rolledCreature.initiative = rollInitiative(creature.init_bonus)
                            rolledCreature.title += ` (${i+1})`
                            creatureList.push(rolledCreature)
                        }
                        foundCreature = true
                    }
                })
            }
        })

        creatureList = creatureList.filter(item => item !== undefined)

        // orders list by initiative (heighest => lowest)
        creatureList.sort((a,b) => {
            return b.initiative - a.initiative
        })

        // adds new unique id to each item
        let newId = 0
        creatureList.map(item => {
            newId++
            item.id = newId
            return item
        })

        setEncounterList(creatureList)
    }

    async function getDeployments(){
        try{
            const rawData = await getDocs(collection(db, "deployments"))
            const filteredData = rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            })) 
            return filteredData.filter(deployment => deployment.encounter_id === encounter.id)
        }
        catch(err){console.error(err)}
    }

    async function getCreatures(){
        try{
            const rawData = await getDocs(collection(db, "creatures"))
            const filteredData = rawData.docs.map(doc => ({
                ...doc.data(), id: doc.id
            }))
            return filteredData.filter(creature => creature.user_id === encounter.user_id)
        }
        catch(err){console.error(err)}
    }

    function nextItem(){
        if(encounterList.length === currentItem){
            setCurrentItem(1)
            return
        }
        setCurrentItem((currentItem+1))
    }

    function lastItem(){
        if(currentItem === 1){
            setCurrentItem(encounterList.length)
            return
        }
        setCurrentItem((currentItem-1))
    }

    return(
        <>
        {encounter
        ?<>
            <Link to="/encounters"><img src={back} className="back-btn"/></Link>
            <h2>Running {encounter.title}</h2>
            <div className="form">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Initiative</th>
                            <th>Creature/Character</th>
                            <th>Hp</th>
                        </tr>
                    </thead>
                    
                    {encounterList.length > 0 &&
                    <tbody>
                        {encounterList.map(item => 
                            <tr key={item.id}>
                                <td>{item.initiative}</td>
                                <td>{item.title}</td>
                                <td><input
                                    placeholder="hp"
                                    defaultValue={item.hp}
                                    style={{"width":"40px"}}
                                    type="number"
                                /></td>
                                {item.id === currentItem &&
                                    <td style={{"backgroundColor":"lightblue"}}>Current</td>
                                }
                            </tr>
                        )}
                    </tbody>
                    }
                </table>
                
                <span>
                    <button className="blue-btn" onClick={lastItem}>Previous</button>
                    <button className="blue-btn" onClick={nextItem}>Next</button>
                </span>
                <button className="blue-btn bar" style={{marginLeft:"-1px"}} onClick={startEncounter}>
                    Restart Encounter
                    </button>
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