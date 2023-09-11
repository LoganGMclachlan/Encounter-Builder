import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Login user={user} setUser={setUser}/>}/>
          <Route path="register" element={<Register user={user} setUser={setUser}/>} />
          <Route path="menu" element={<Menu user={user} setUser={setUser}/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}