import { auth } from "../config/firebase";

export default function Menu() {
    return(
    <>
        <h2>Menu</h2>
        <p>{auth.currentUser.email}</p>
    </>
    )
}