import React from 'react';
import Progress from '../components/progress';
import { Link } from 'react-router';
let PubSub = require('pubsub-js');
import './player.less'
let duration = null;

let timer = null;
let Player = React.createClass({
	componentDidMount() {
		$("#player").bind($.jPlayer.event.timeupdate, (e) => {
			duration = e.jPlayer.status.duration;
			this.setState({
				progress: e.jPlayer.status.currentPercentAbsolute,
				volume: e.jPlayer.options.volume * 100,
				leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
			});
		});

		let domPic = document.getElementById('pic');

        this.setCss(domPic,{transform:"rotate(10deg)","transform-origin":"50% 50%"});
        let angel=0;

        timer = setInterval(()=>{
            angel+=1;
            this.setCss(domPic,{transform:"rotate("+angel+"deg)","transform-origin":"50% 50%"})
        },40)
	},
    setCss(obj,objAttr){
        //循环属性对象
        for(let i in objAttr){
            let newi=i;
            //判断是否存在transform-origin这样格式的属性
            if(newi.indexOf("-")>0){
                let num=newi.indexOf("-");
                newi=newi.replace(newi.substr(num,2),newi.substr(num+1,1).toUpperCase());
            }
            //考虑到css3的兼容性问题,所以这些属性都必须加前缀才行
            obj.style[newi]=objAttr[i];
            newi=newi.replace(newi.charAt(0),newi.charAt(0).toUpperCase());
            obj.style[newi]=objAttr[i];
            obj.style["webkit"+newi]=objAttr[i];
            obj.style["moz"+newi]=objAttr[i];
            obj.style["o"+newi]=objAttr[i];
            obj.style["ms"+newi]=objAttr[i];
        }

	},
	componentWillUnmount() {
		$("#player").unbind($.jPlayer.event.timeupdate);
        timer && clearInterval(timer);
	},
	formatTime(time) {
		time = Math.floor(time);
		let miniute = Math.floor(time / 60);
		let seconds = Math.floor(time % 60);

		return (miniute < 10 ? '0'+miniute : miniute) + ':' + (seconds < 10 ? '0' + seconds : seconds);
	},
	changeProgressHandler(progress) {
		$("#player").jPlayer("play", duration * progress);
		this.setState({
			isPlay: true
		});
	},
	changeVolumeHandler(progress) {
		$("#player").jPlayer("volume", progress);
	},
	play() {
		if (this.state.isPlay) {
			$("#player").jPlayer("pause");
		} else {
			$("#player").jPlayer("play");
		}
		this.setState({
			isPlay: !this.state.isPlay
		});
	},
	next() {
		PubSub.publish('PLAY_NEXT');
	},
	prev() {
		PubSub.publish('PLAY_PREV');
	},
	changeRepeat() {
		PubSub.publish('CHANAGE_REPEAT');
	},
	getInitialState() {
		return {
			progress: 0,
			volume: 0,
			isPlay: true,
			leftTime: ''
		}
	},	
    render() {
        return (
            <div className="player-page">
                <h1 className="caption"><Link to="/list">音乐列表 &gt;</Link></h1>
                <div className="mt20 row">
                	<div className="controll-wrapper">
                		<h2 className="music-title">{this.props.currentMusitItem.title}</h2>
                		<h3 className="music-artist mt10">{this.props.currentMusitItem.artist}</h3>
                		<div className="row mt20">
                			<div className="left-time -col-auto">{this.state.leftTime}</div>
                			<div className="volume-container">
                				<i className="icon-volume rt" style={{top: 5, left: -5}}>{}</i>
                				<div className="volume-wrapper">
					                <Progress
										progress={this.state.volume}
										onProgressChange={this.changeVolumeHandler}
										barColor='#aaa'
					                >
					                </Progress>
                				</div>
                			</div>
                		</div>
                		<div style={{height: 10, lineHeight: '10px'}}>
			                <Progress
								progress={this.state.progress}
								onProgressChange={this.changeProgressHandler}
			                >
			                </Progress>
                		</div>
                		<div className="mt35 row">
                			<div>
	                			<i className="icon prev" onClick={this.prev}>{}</i>
	                			<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}>{}</i>
	                			<i className="icon next ml20" onClick={this.next}>{}</i>
                			</div>
                			<div className="-col-auto">
                				<i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat}>{}</i>
                			</div>
                		</div>
                	</div>
                	<div id="pic" className="-col-auto cover">
                		<img src={this.props.currentMusitItem.cover} alt={this.props.currentMusitItem.title}/>
                	</div>
                </div>
            </div>
        );
    }
});

export default Player;
