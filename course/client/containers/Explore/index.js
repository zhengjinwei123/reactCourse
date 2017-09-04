import React, {Component} from 'react'
import Explore from '../../components/Explore/index.js'
import './style.scss';

class CExplore extends Component {
    constructor() {
        super()
    }

    render() {
        const {userInfo, actions} = this.props;

        return (
            <div className='app'>
                <Explore userInfo={userInfo} actions={actions}></Explore>
            </div>
        )
    }
}

export default CExplore
