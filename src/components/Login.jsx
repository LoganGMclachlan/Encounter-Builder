import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

export default function Login({ user, setUser, logout }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault()
        try{
            await signInWithEmailAndPassword(auth, email, password)
            setUser(auth.currentUser)
            navigate("/menu")
        }
        catch(error){ console.error(error); }
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
        <button className="google-btn">Login with Google</button>
        </div></>
        :<>
        <h1>You are already Logged In</h1>
        <Link to="/menu">Go to menu</Link>
        <p onClick={logout}>Logout</p>
        </>
        }
    </>
    )
}