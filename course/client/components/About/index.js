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
                <p style={{color:"red"}}>在线课程</p>
                <p style={{textIndent:'2em',fontSize:'12px'}}>前端基于React 技术框架设计,基于React+redux+router,服务端渲染,scss样式，pubsub父子控件间消息传递</p>
                <p style={{textIndent:'2em',fontSize:'12px'}}>后端基于Koa2框架,ES6语法(支持Promise,yield等),使用Trunkify包装回调，同步模式写代码</p>
                <p style={{textIndent:'2em',fontSize:'12px'}}>数据库采用Mongodb,自己设计的数据库连接池</p>
                <p style={{textIndent:'2em',fontSize:'12px'}}>数据来源基于Python写的爬虫程序</p>
                <p><a href="https://github.com/zhengjinwei123/reactCourse/tree/master/course" target="__blank">github地址</a></p>
            </section>
        )
    }
}

export default About
