import React, {Children, Component, cloneElement} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Main from '../../components/Main'
import actions from '../../actions/root.js'
import './style.scss';
import '../../statics/global.scss'
import PureRenderMixin from 'react-addons-pure-render-mixin';

class CRoot extends Component {
    constructor(props,context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const {children, ...props} = this.props;

        return (
            <div className='app'>
                <Header/>
                <Navbar/>
                <Main>
                    {Children.map(children, child =>
                        cloneElement(child, {...props})
                    )}
                </Main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CRoot)
