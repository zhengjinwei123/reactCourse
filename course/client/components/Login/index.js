import React,{ Component } from 'react';
import './style.scss';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PubSub from 'pubsub-js';

class Login extends Component{
    constructor(props,context){
        super(props,context);
        this.shouldCompnentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            show:true
        }
    }

    render(){
        let style = {display:this.state.show ? 'block':'none'};
        return (
            <div className="login-container" style={style}>
                <div className="login-header">
                    <div>
                        <i className="fa fa-user" aria-hidden="true" style={{float:"left",fontSize:'40px'}}>

                        </i>登录</div>
                    <div onClick={this.closeHandler.bind(this)} title="注册新用户">
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="body">
                    <div className="input-group">
                        <span><i className="fa fa-user-circle" aria-hidden="true"></i></span>
                        <input type="text" placeholder="请输入用户名"/>
                    </div>
                    <div className="input-group">
                        <span><i className="fa fa-superpowers" aria-hidden="true"></i></span>
                        <input type="password"/>
                    </div>
                </div>
                <div className="footer">
                    <div className="pull-right">
                        <button className="btn-normal" onClick={this.loginHandler.bind(this)}>登录</button>
                    </div>
                    <div className="pull-left">
                        <button className="btn-normal" onClick={this.regHandler.bind(this)}>注册</button>
                    </div>
                </div>
            </div>
        )
    }

    loginHandler(e){
        alert("login");
    }

    regHandler(e){
        alert("reg");
    }

    closeHandler(){
        this.setState({
            show:false
        });

        PubSub.publish('close_login');
    }
}


export default Login;
