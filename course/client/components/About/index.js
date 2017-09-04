import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.scss'

class About extends Component {
    constructor(props,context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <section className='section-main'>
                <p>在线课程</p>
                前端基于React 技术框架设计,后端基于Koa框架，数据库采用Mongodb,数据来源基于Python爬虫
            </section>
        )
    }
}

export default About
