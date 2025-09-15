import { useState } from 'react';
import "../styles/login.css"

function Login() {

    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function logInUser(e) {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/user/login", {
                method: "POST",
                credentials: "include",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ username, password })
            })

            if (!res.ok) {
                const data = await res.json();
                setError(data.error);
                return;
            }

            window.location.href = "/blog";

        } catch (error) {
            console.error("Login error: ", error);
            setError("Something went wrong. Please try again.")
        }

    }


    return (
        <div className='login-body'>
            <h1>User Log In</h1>
            <form className="login-form" onSubmit={logInUser}>
                {error && <div className="info error">
                    {error}
                </div>}
                <div className="login-info">
                    <span><label htmlFor="username">Username:</label></span>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                </div>
                <div className="login-info">
                    <span><label htmlFor="password">Password:</label></span>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login