import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Register from "../../Components/LoginPage/Register"

export default class RegisterPage extends Component {
    render() {
        return (
            <div>
                <header>
                    Logo
                    BakerInn
                    </header>
                <div>
                    <h3>Register</h3>
                    <p>Already have an account?<Link to="/login">Log In</Link></p>
                    <Register />
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
