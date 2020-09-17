import React, { useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "/api/users/login"
        fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
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
                        <label >Password:</label>
                        <input type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div >
        </div>
    )
}

export default Login;

