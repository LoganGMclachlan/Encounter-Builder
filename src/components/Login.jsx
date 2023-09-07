import { useState } from "react"
import { Link } from "react-router-dom"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleLogin(e){
        e.preventDefault()
        alert(`email:${email}, password:${password}`)
    }

    return(
    <>
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
        </div>
    </>
    )
}