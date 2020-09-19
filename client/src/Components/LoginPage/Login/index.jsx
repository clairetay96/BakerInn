import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Auth from '../../../Auth';

const Login = (props) => {
    let history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setValid] = useState(true);
    const [error, setError] = useState('Try again')

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== '' &&
            email !== '') {

            Auth.login(email, password, (isValid, err) => {
                if (isValid) {
                    setEmail('');
                    setPassword('');
                    // redirect to homepage

                    // remove error warnings
                    setValid(true)
                    // change navbar/ show chat
                    props.loggedIn()
                    // redirect to homepage
                    history.push('/homepage')
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
                    <div style={isValid
                        ? { visibility: 'hidden' }
                        : { visibility: 'visible' }}>
                        {error}
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div >
        </div>
    )
}

export default Login;

