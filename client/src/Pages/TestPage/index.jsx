import React, { Component } from 'react'
import {ReactComponent as ReactLogo} from '../../arrow.svg';


export default class Test extends Component {
    constructor() {
        super()
        this.state = {
            message: ""
        }

    }
    componentDidMount() {
        fetch('/api')
            .then(res => res.text())
            .then(res => this.setState({
                message: res
            }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <div style={{width: "200px"}}>
                <ReactLogo transform='rotate(-90)'/>
                </div>
            </div>
        )
    }
}
