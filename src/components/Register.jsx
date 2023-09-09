import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "../config/firebase"

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    async function handleRegister(e){
        e.preventDefault()
        try{
            await createUserWithEmailAndPassword(auth, email, password)
            navigate("/menu")
        }
        catch(error){ console.error(error); };
    }

    return(
    <>
        <div className="tab-container">
            <Link to="/" className="tab ">Login</Link>
            <div className="tab selected">Register</div>
        </div>

        <form onSubmit={handleRegister} className="form">
            <input
                placeholder="Email..."
                className="form-input"
                onChange={e => setEmail(e.target.value)}
            />
            <input
                placeholder="Password..."
                className="form-input"
                type="password"
                onChange={e => setPassword(e.target.value)}
            />
            <input
                placeholder="Confirm Password..."
                className="form-input"
                type="password"
                onChange={e => setConfirmPassword(e.target.value)}
            />
            <button className="blue-btn" type="submit">Register!</button>
        </form>
        
        <div>
        <h3>or</h3>
        <button className="google-btn">Register with Google</button>
        </div>
    </>
    )
}