import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import NoPage from "./components/NoPage"
import Login from "./components/Login"
import Register from "./components/Register"
import Menu from "./components/Menu"
import Layout from "./components/Layout"
import Creatures from "./components/Creatures"
import Characters from "./components/Characters"
import Encounters from "./components/Encounters"
import EditCreature from "./components/EditCreature"
import EditParty from "./components/EditParty"
import EditChar from "./components/EditChar"
import EditEncounter from "./components/EditEncounter"
import AddCreature from "./components/AddCreature"
import RunEncounter from "./components/RunEncounter"

export default function App() {
  const [user, setUser] = useState(() => {
    const localValue = localStorage.getItem("CURRENT_USER")
    if (localValue === null) return null
    return JSON.parse(localValue)
  })
  useEffect(() => {
    localStorage.setItem("CURRENT_USER", JSON.stringify(user))
  }, [user])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Login user={user} setUser={setUser}/>}/>
          <Route path="register" element={<Register user={user} setUser={setUser}/>} />
          <Route path="menu" element={<Menu user={user} setUser={setUser}/>} />
          <Route path="creatures" element={<Creatures user={user}/>}/>
          <Route path="editCreature" element={<EditCreature/>}/>
          <Route path="encounters" element={<Encounters user={user}/>}/>
          <Route path="editEncounter" element={<EditEncounter/>}/>
          <Route path="addCreature" element={<AddCreature/>}/>
          <Route path="runEncounter" element={<RunEncounter/>}/>
          <Route path="characters" element={<Characters user={user}/>}/>
          <Route path="editParty" element={<EditParty/>}/>
          <Route path="editCharacter" element={<EditChar/>}/>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}