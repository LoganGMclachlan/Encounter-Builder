import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../config/firebase"

export default function Register({ user, setUser }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    async function handleRegister(e){
        e.preventDefault()

        if(email === ""){
            setError("Enter your email.")
            return
        }
        if(password.length < 6){
            setError("Enter a password at least 6 characters long.")
            return
        }
        if(password !== confirmPassword){
            setError("Passwords do not match.")
            return
        }

        try{
            await createUserWithEmailAndPassword(auth, email, password)
            setUser(auth.currentUser)
            navigate("/menu")
        }
        catch(error){
            setError("Email entered was not valid.")
            console.error(error)
        }
    }

    async function registerWithGoogle(){
        try{
            await signInWithPopup(auth, googleProvider)
            setUser(auth.currentUser)
            navigate("/menu")
        }
        catch(error){ console.error(error) }
    }

    return(
    <>
        {!user
        ?<>
        <div className="tab-container">
            <Link to="/" className="tab ">Login</Link>
            <div className="tab selected">Register</div>
        </div>

        <form onSubmit={handleRegister} className="form">
            <p className="error">{error}</p>
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
        <button className="google-btn" onClick={registerWithGoogle}>Register with Google</button>
        </div>
        </>
        :<>
        <h1>You are already Logged In</h1>
        <Link to="/menu">Go to menu</Link>
        </>
        }
    <br/>
    </>
    )
}