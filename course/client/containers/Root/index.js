import React, {Children, Component, cloneElement} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../../components/Header'
import Login from '../../components/Login';
import Navbar from '../../components/Navbar'
import Main from '../../components/Main'
import actions from '../../actions/root.js'
import './style.scss';
import '../../statics/global.scss'
import '../../statics/font-awesome/css/font-awesome.min.css'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import localStore from '../../util/localStore';
import CommConst from '../../constants/common';
import PubSub from 'pubsub-js';

class CRoot extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        this.state = {
            hasLogin: false,
            userName: ''
        }
    }

    componentDidMount() {
        let loginName = localStore.getItem(CommConst.LOGIN_NAME);
        if (loginName) {
            this.setState({
                hasLogin: true,
                userName: loginName
            });
        }

        PubSub.subscribe('close_login', (msg, item) => {
            alert("close login");
        });
    }

    render() {
        const {children, ...props} = this.props;

        let style={display:this.state.hasLogin ? 'block' : 'none'};
        let loginStyle = {
            display:!this.state.hasLogin ? 'block' : 'none'
        };
        return (
            <div className='app'>
                <Header userName={this.state.userName}/>
                <div style={loginStyle} className="login">
                    <Login />
                </div>
                <div style={style}>
                    <Navbar />
                    <Main>
                        {Children.map(children, child =>
                            cloneElement(child, {...props})
                        )}
                    </Main>
                </div>
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
