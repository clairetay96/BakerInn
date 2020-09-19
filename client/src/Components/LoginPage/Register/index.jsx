import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Auth from '../../../Auth';

const Register = () => {
    let history = useHistory()

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setValid] = useState(true);
    const [error, setError] = useState('Try again')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email !== '' &&
            password !== '' &&
            username !== '') {

            Auth.register(email, username, password, (isValid, err) => {
                if (isValid) {
                    setEmail('');
                    setPassword('');
                    setUsername('');
                    // redirect to homepage
                    setValid(true)
                    history.push('/login')
                } else {
                    // prompt user to try again with inline error msg
                    // temp alert for debugging
                    setError(err)
                    setValid(false)
                }
            })
        } else {
            setValid(false)
        }
    }

    return (
        <div>
            <div className="Register">
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
                    <div style={isValid
                        ? { visibility: 'hidden' }
                        : { visibility: 'visible' }}>
                        {error}
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div >
        </div>
    )
}

export default Register;