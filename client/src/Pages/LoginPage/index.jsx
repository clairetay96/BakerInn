import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Login from "../../Components/LoginPage/Login"

export default class LoginPage extends Component {
    render() {
        return (
            <div>
                <header>
                    Logo
                    BakerInn
                </header>
                <div>
                    <h3>Login</h3>
                    <p>Dont have an account? <Link to="/signup">Sign Up</Link></p>
                    <Login />
                    <div>
                        img
                    </div>
                </div>
                <footer>
                    footer
                </footer>
            </div>
        )
    }
}
