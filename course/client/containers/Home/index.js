import React, {Component} from 'react'
import Home from '../../components/Home/index.js'
import './style.scss';

class CHome extends Component {
    constructor() {
        super()
    }

    render() {
        const {actions} = this.props;

        return (
            <div className='app'>
                <Home actions={actions}></Home>
            </div>
        )
    }
}

export default CHome
