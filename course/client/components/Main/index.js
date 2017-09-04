import React, {Component} from 'react'
import './style.scss'
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Main extends Component {
    constructor(props,context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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
