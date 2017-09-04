import React, {Component} from 'react'
import './style.scss'
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Home extends Component {
    constructor(props,context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <section className='section-main'>
                Home
            </section>
        )
    }
}

export default Home
