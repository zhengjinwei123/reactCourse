import React, {Component} from 'react'
import './style.scss'
import imgAvatar from './assets/avatar.png'
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Header extends Component {
    constructor(props,context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <header className='header'>
                <div className='left'>
                    <span className='span'>在线课程</span>
                </div>
                <div className='right'>
                    <span className='description'>Hello, world！</span>
                    <img className='img' src={imgAvatar}/>
                </div>
            </header>
        )
    }
}

export default Header;
