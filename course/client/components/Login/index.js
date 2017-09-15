import React, {Component} from 'react';
import './style.scss';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PubSub from 'pubsub-js';
import $ from 'jquery';
import Utils from '../../util/utils';

class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldCompnentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            show: true
        };

        this.emailValid = false;
        this.passwordValid = false;
    }

    render() {
        let style = {display: this.state.show ? 'block' : 'none'};
        return (
            <div className="login-container" style={style}>
                <div className="login-header">
                    <div>
                        <i className="fa fa-user" aria-hidden="true" style={{float: "left", fontSize: '40px'}}>

                        </i>登录
                    </div>
                    <div onClick={this.closeHandler.bind(this)} title="注册新用户">
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="body">
                    <div className="input-group">
                        <span><i className="fa fa-user-circle" aria-hidden="true"></i></span>
                        <input type="text" onKeyUp={this.emailKeyUp.bind(this)} placeholder="email" ref="email"
                               title="邮箱"/>
                    </div>
                    <div className="input-group">
                        <span><i className="fa fa-superpowers" aria-hidden="true"></i></span>
                        <input type="password" ref="password" onKeyUp={this.passwordKeyUp.bind(this)} title="密码"/>
                    </div>
                </div>
                <div ref="error" style={{color: "red"}}>
                    {
                        this.props.loginError
                    }
                </div>
                <div className="footer">
                    <div className="pull-right">
                        <button className="btn-normal" onClick={this.loginHandler.bind(this)}>登录</button>
                    </div>
                    <div className="pull-left">
                        <button className="btn-normal" onClick={this.closeHandler.bind(this)}>注册</button>
                    </div>
                </div>
                <div className="help">
                    <div className="pull-right">
                        <a onClick={this.findPassword.bind(this)}>找回密码</a>
                    </div>
                </div>
            </div>
        )
    }

    emailKeyUp(e) {
        let value = e.target.value.trim();
        if (!Utils.isEmail(value)) {
            $(this.refs.email).css({
                border: "1px solid red"
            });
            $(this.refs.error).html("邮箱格式非法");
        } else {
            $(this.refs.email).css({
                border: "1px solid gray"
            });
            this.emailValid = true;
            $(this.refs.error).html("");
        }
    }

    passwordKeyUp(e) {
        let value = e.target.value.trim();
        if (value.length < 6) {
            $(this.refs.password).css({
                border: "1px solid red"
            });
            $(this.refs.error).html("密码太短");
        } else {
            $(this.refs.password).css({
                border: "1px solid gray"
            });
            this.passwordValid = true;
            $(this.refs.error).html("");
        }
    }

    // 找回密码
    findPassword() {
        if (!this.emailValid) {
            $(this.refs.error).html("请填写您注册的邮箱地址");
            return false;
        }
        let email = $(this.refs.email).val().trim();
    }

    // 登录
    loginHandler(e) {
        if (!this.emailValid || !this.passwordValid) {
            return false;
        }
        let email = $(this.refs.email).val().trim();
        let password = $(this.refs.password).val().trim();

        this.props.loginHandler(email,password);
    }

    closeHandler() {
        PubSub.publish('close_window', 'login');
    }
}


export default Login;
