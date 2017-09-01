import React from 'react';
require('./logo.less');
import { Link } from 'react-router';

let Logo = React.createClass({
    render() {
        return (
        	<div className="row components-logo">
                <Link  className="-col-auto" to="/">
                    <img src="/app/static/images/logo.png" width="40" alt="" />
                </Link>
                <h1 className="caption">如意音乐 （基于 React 技术设计）</h1>

                <span className="contact -col2"><a href="http://zhengjinwei.top:3000" target="__blank">联系我</a></span>
        	</div>
        );
    }
});

export default Logo;
