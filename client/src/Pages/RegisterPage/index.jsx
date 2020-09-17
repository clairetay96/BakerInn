import React, { Component } from 'react'
import Register from "../../Components/LoginPage/Register"

export default class RegisterPage extends Component {
    render() {
        return (
            <html>
                <head>

                </head>
                <body>
                    <header>
                        Logo
                        BakerInn
                    </header>
                    <div>
                        <h3>Register</h3>
                        <p>Already have an account?<a href="#">Sign In</a></p>
                        <Register />
                        <div>
                            img
                        </div>
                    </div>
                    <footer>
                        footer
                    </footer>
                </body>
            </html>
        )
    }
}
