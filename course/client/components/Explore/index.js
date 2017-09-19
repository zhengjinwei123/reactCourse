import React, {Component} from 'react'
import  './style.scss'
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Explore extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    }

    componentDidMount() {

    }
    render() {
        let subjectList = this.props.subjectList;

        if(subjectList && subjectList.length){
            return (<section className='section-main'>
                {
                    subjectList.map((value, index) => {
                        return (
                            <div key={index} style={{boxShadow:"1px 1px 1px 1px #6e6e6e",width:"40%",height:"500px",display:'inline-block',float:"left",marginTop:"10px",marginLeft:"20px",borderRadius:"10px"}}>
                                <img style={{borderRadius:"10px"}} src={value.url} alt="" width="100%" height="500px"/>
                            </div>
                        )
                    })
                }
            </section>
            );
        }else{
            return (
                <p style={{textAlign:'center'}}>loading...</p>
            )
        }

    }
}

export default Explore
