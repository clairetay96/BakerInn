import React, { useState } from 'react'

const Register = () => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "/api/users/new"
        fetch(url, {
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, username, password })
        })
            .then((res) => res.text())
            .then((res) => {
                console.log(res)
            })
    }

    return (
        <div>
            <div className="Login">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label >Email:</label>
                        <input type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label >Username:</label>
                        <input type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label >Password:</label>
                        <input type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div >
        </div>
    )
}

export default Register;