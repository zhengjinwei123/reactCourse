import React, {Component} from 'react'
import {IndexLink, Link} from 'react-router'
import './style.scss';

class Navbar extends Component {
    constructor() {
        super()
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
