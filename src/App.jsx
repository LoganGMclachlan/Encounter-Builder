import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"
import NoPage from "./components/NoPage"
import Login from "./components/Login"
import Register from "./components/Register"
import Menu from "./components/Menu"
import Layout from "./components/Layout"
import Creatures from "./components/Creatures"
import Characters from "./components/Characters"
import Encounters from "./components/Encounters"

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
          <Route path="encounters" element={<Encounters user={user}/>}/>
          <Route path="characters" element={<Characters user={user}/>}/>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}