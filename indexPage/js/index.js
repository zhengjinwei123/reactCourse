$(document).ready(function(){
	var src = 1;
	setInterval(function(){
		if(src === 1){
			$('#theme').attr('src',"./images/about-bg.jpg");
		}else{
			$('#theme').attr('src',"./images/home-bg.jpg");
		}
		src = -src;
	},5000);
});