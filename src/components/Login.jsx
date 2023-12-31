import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../config/firebase"

export default function Login({ user, setUser }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault()

        if(email === ""){
            setError("Enter your email.")
            return
        }
        if(password === ""){
            setError("Enter your password.")
            return
        }

        try{
            await signInWithEmailAndPassword(auth, email, password)
            setUser(auth.currentUser)
            navigate("/menu")
        }
        catch(error){
            setError("Incorrect email or password.")
            console.error(error)
        }
    }

    async function logInWithGoogle(){
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
            <div className="tab selected">Login</div>
            <Link to="/register" className="tab">Register</Link>
        </div>

        <form onSubmit={handleLogin} className="form">
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
            <button className="blue-btn" type="submit">Login!</button>
        </form>
        
        <div>
        <h3>or</h3>
        <button className="google-btn" onClick={logInWithGoogle}>Login with Google</button>
        </div></>
        :<>
        <h1>You are already Logged In</h1>
        <Link to="/menu">Go to menu</Link>
        </>
        }
    <br/>
    </>
    )
}