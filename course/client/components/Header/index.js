import React, {Component} from 'react'
import './style.scss'
import imgAvatar from './assets/avatar.png'

class Header extends Component {
    constructor() {
        super()
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
