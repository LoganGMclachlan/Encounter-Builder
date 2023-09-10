import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"
import { signOut } from "firebase/auth"
import { auth } from "./config/firebase"
import NoPage from "./components/NoPage"
import Login from "./components/Login"
import Register from "./components/Register"
import Menu from "./components/Menu"
import Layout from "./components/Layout"

export default function App() {
  const [user, setUser] = useState(() => {
    const localValue = localStorage.getItem("CURRENT_USER")
    if (localValue === null) return null
    return JSON.parse(localValue)
  })
  useEffect(() => {
    localStorage.setItem("CURRENT_USER", JSON.stringify(user))
  }, [user])

  async function logout(){
    try{
      await signOut(auth)
      setUser(null)
    }
    catch(error){ console.error(error) }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Login user={user} setUser={setUser} logout={logout}/>}/>
          <Route path="register" element={<Register user={user} setUser={setUser} logout={logout}/>} />
          <Route path="menu" element={<Menu user={user} setUser={setUser} logout={logout}/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}