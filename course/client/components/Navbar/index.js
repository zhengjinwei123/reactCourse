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
                <IndexLink className='link' activeClassName='active' to="/">home</IndexLink>
                <Link className='link' activeClassName='active' to="/explore">explore</Link>
                <Link className='link' activeClassName='active' to="/about">about</Link>
            </nav>
        )
    }
}

export default Navbar;
