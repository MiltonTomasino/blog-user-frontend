import { useState } from "react"
import "../styles/form.css"

function Register() {

    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function registerUser(e) {

        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/user", {
                method: "POST",
                credentials: "include",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ username: username, password: password})
            });

            if (!res.ok) {
                const data = await res.json();
                console.log("error registering: ", data.error);
                setError(data.error);
                return
            }

            window.location.href = "/login";

        } catch (error) {
            console.error("Error registering user: ", error);
            setError("Something went wrong. Please try again.");
        }
    }

    return (
        <div className='form-body'>
            <h1>Register User</h1>
            <form className="form-container" onSubmit={registerUser}>
                {error && <div className="info error">
                    {error}
                </div>}
                <div className="form-info">
                    <span><label htmlFor="username">Username:</label></span>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                </div>
                <div className="form-info">
                    <span><label htmlFor="password">Password:</label></span>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <button type="submit">Register</button>
                <a href="/login">Return to login.</a>
            </form>
        </div>
    )
}

export default Register