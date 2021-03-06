import React, {Component} from 'react'
import About from '../../components/About'
import './style.scss';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class CAbout extends Component {
    constructor(props,context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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
