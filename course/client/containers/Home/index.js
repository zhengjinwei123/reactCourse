import React, {Component} from 'react'
import Home from '../../components/Home/index.js'
import './style.scss';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class CHome extends Component {
    constructor(props,context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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
