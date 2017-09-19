import React, {Component} from 'react'
import {IndexLink, Link} from 'react-router'
import './style.scss';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Navbar extends Component {
    constructor(props,context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <nav className='navbar'>
                <IndexLink className='link' activeClassName='active' to="/">主页</IndexLink>
                <Link className='link' activeClassName='active' to="/explore">课程</Link>
                <Link className='link' activeClassName='active' to="/about">关于</Link>
            </nav>
        )
    }
}

export default Navbar;
