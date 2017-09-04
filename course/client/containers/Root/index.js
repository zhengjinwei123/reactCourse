import React, {Children, Component, cloneElement} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Main from '../../components/Main'
import actions from '../../actions/root.js'
import './style.scss';
import '../../statics/global.scss'

class CRoot extends Component {
    constructor() {
        super()
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
