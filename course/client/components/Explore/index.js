import React, {Component} from 'react'
import  './style.scss'
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Explore extends Component {
    constructor(props,context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    handleFetch() {
        const {actions} = this.props;

        actions.fetchUserInfo()
    }

    handleClear() {
        const {actions} = this.props;

        actions.clearUserInfo()
    }

    render() {
        const {userInfo} = this.props;

        return (
            <section className='section-main'>
                Explore
                <a href="javascript:void(0)"
                   className='btn'
                   onClick={this.handleFetch.bind(this)}>
                    Fetch Data
                </a>
                <a href="javascript:void(0)"
                   className='btn'
                   onClick={this.handleClear.bind(this)}>
                    Clear
                </a>
                <br/>
                <span className='info'>{userInfo && JSON.stringify(userInfo)}</span>
            </section>
        )
    }
}

export default Explore
