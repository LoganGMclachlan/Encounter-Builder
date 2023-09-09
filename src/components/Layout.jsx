import { Outlet } from "react-router-dom"

export default function Layout() {
    return(
        <div className="container">
            <h1 className="heading">Encounter Builder</h1>
            <div className="main">
            <Outlet/>
            </div>
        </div>
    )
}