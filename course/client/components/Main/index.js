import React, {Component} from 'react'
import './style.scss'

class Main extends Component {
    constructor() {
        super()
    }

    render() {
        const {children} = this.props;

        return (
            <main className='main'>
                {children}
            </main>
        )
    }
}

export default Main
