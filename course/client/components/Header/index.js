import React, {Component} from 'react'
import './style.scss'
import imgAvatar from './assets/avatar.png'

import PureRenderMixin from 'react-addons-pure-render-mixin';

class Header extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        let style = {display:this.props.userName ? 'block' : 'none'};
        return (
            <header className='header'>
                <div className='left'>
                    <span className='span'>在线课程</span>
                </div>
                <div className='right' >
                    <div>
                        <button className="round-btn" style={style} title="点击此处下线" onClick={this.logoutHandler.bind(this)}>下线</button>
                    </div>
                    <span className='description' style={style}>{this.props.userName}</span>
                    <img ref="avatar" style={style} className='img' src={imgAvatar}/>
                </div>
            </header>
        )
    }
    logoutHandler(){
       this.props.logoutHandler();
    }
}

export default Header;
