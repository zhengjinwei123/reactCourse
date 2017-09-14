import React, {Children, Component, cloneElement} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Header from '../../components/Header'
import Login from '../../components/Login';
import Register from '../../components/Register';

import Navbar from '../../components/Navbar'
import Main from '../../components/Main'
import actions from '../../actions/root.js'
import './style.scss';
import '../../statics/reset.scss';
import '../../statics/global.scss'
import '../../statics/font-awesome/css/font-awesome.min.css'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import localStore from '../../util/localStore';
import CommConst from '../../constants/common';
import PubSub from 'pubsub-js';
import $ from 'jquery';
import * as UserQuest from '../../fetch/user/user';

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

        let dRegister = this.refs.register;
        let dLogin = this.refs.login;
        $(dLogin).css({
            top: "60px"
        });

        PubSub.subscribe('close_window', (msg, item) => {
            if (item === 'login') {
                $(dLogin).css({
                    top: "-400px"
                });
                $(dRegister).css({
                    top: "60px"
                });
            } else if (item === "register") {
                $(dLogin).css({
                    top: "60px"
                });
                $(dRegister).css({
                    top: "-400px"
                });
            }
        });
    }

    // 用户登录
    loginHandler(email,password) {
        let resp = UserQuest.login(email,password);
        resp.then((response)=>{
            return response.json();
        }).then((json)=>{
            console.log(json);
        });
    }

    // 用户注册
    registerHandler(email,password) {
        let resp = UserQuest.register(email,password);
        resp.then((response)=>{
            return response.json();
        }).then((json)=>{
            console.log(json);
        });
        console.log(resp)
    }

    render() {
        const {children, ...props} = this.props;

        let style = {display: this.state.hasLogin ? 'block' : 'none'};
        let loginStyle = {
            display: !this.state.hasLogin ? 'block' : 'none'
        };
        return (
            <div className='app'>
                <Header userName={this.state.userName}/>
                <div style={loginStyle} className="login" ref="login">
                    <Login loginHandler={this.loginHandler.bind(this)}/>
                </div>
                <div className="register" ref="register">
                    <Register registerHandler={this.registerHandler.bind(this)}/>
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
