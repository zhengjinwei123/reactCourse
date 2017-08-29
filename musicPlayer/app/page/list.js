import React from 'react';
import { MUSIC_LIST } from '../config/config';
import ListItem from '../components/listitem';

let List = React.createClass({
    render() {
    	let Items = this.props.musicList.map((item) => {
    		return (
    			<ListItem
    				key={item.id}
    				data={item}
                    focus={this.props.currentMusitItem === item}
    			>{}</ListItem>
    		);
    	});
        return (
            <ul className="list">
                { Items }
            </ul>
        );
    }
});

export default List;
