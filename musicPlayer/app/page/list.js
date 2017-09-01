import React from 'react';
import { MUSIC_LIST } from '../config/config';
import ListItem from '../components/listitem';
import { Link } from 'react-router';

let List = React.createClass({
    render() {
    	let Items = this.props.musicList.map((item) => {
    		return (
                    <ListItem
                    key={item.id}
                    data={item}
                    focus={this.props.currentMusitItem === item}></ListItem>
    		);
    	});
        return (
            <div>
                 <div style={{margin:"10px 0 10px 0",color:"#f1f1f1",width:"100px",height:"40px"}}>
                    <Link to="/">
                        <a href="#" className="my-btn">首页</a>
                    </Link>
                </div>
                
                <ul className="list">
                    { Items }
                </ul>
            </div>
        );
    }
});

export default List;
