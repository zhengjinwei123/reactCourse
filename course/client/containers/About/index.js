import React, {Component} from 'react'
import About from '../../components/About'
import './style.scss';

class CAbout extends Component {
    constructor() {
        super()
    }

    render() {
        const {actions} = this.props;

        return (
            <div className='app'>
                <About actions={actions}></About>
            </div>
        )
    }
}

export default CAbout
