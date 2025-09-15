import { Navigate, useNavigate } from "react-router-dom"

function Nav() {
    const navigate = useNavigate();

    async function handleLogout() {
        await fetch("http://localhost:3000/user/logout?source=react", {
            method: "POST",
            credentials: "include"
        });

        navigate("/login");
    }

    return (
        <nav>
        <h1>Milton's Blog</h1>
        <div className="nav-buttons">
            <button onClick={handleLogout}>log out</button>
        </div>
    </nav>
    )
}

export default Nav