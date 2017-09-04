import React, {Component} from 'react'
import Explore from '../../components/Explore/index.js'
import './style.scss';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class CExplore extends Component {
    constructor(props,context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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
