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
                    <div onClick={this.closeHandler.bind(this)}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="body">

                </div>
                <div className="footer">

                </div>
            </div>
        )
    }

    closeHandler(){
        this.setState({
            show:false
        });

        PubSub.publish('close_login');
    }
}


export default Login;
