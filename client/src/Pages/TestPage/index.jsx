import React, { Component } from 'react'
import CarouselV2 from '../../Components/Carousel/test'

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
                {this.state.message}
                <CarouselV2 />
            </div>
        )
    }
}
