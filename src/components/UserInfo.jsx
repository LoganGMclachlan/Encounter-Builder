
export default function UserInfo({ user }){
    return(
    <div className="user-info">
        {user.photoURL && <img src={user.photoURL} className="user-img"/>}
        <h2>
        {user.displayName
        ?<>{user.displayName}</>
        :<>{user.email}</>
        }
        </h2>
    </div>
    )
}