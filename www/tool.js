var toolSelectInfo;


function toolMoveInit(){
	var isMouseDown=false;
	var prevPoint;
	var c_width=$('#editor .contents ').width();
	var c_height=$('#editor .contents ').height();
	var init={
		'x':$('#editor .contents ').offset().left,
		'y':$('#editor .contents ').offset().top
	}
	toolSelectInfo={
		'x':$('#editor .contents .rect').top,
		'y':$('#editor #selects .rect').left,
		'wid':$('#editor #selects .rect').width,
		'hei':$('#editor #selects .rect').height
	}
	var color;
	
	console.log('test' + $('#editor .contents .rect').css('top'));
	console.log('test' + $('#editor .contents #rect').css('top'));
	console.log('test' + $('#editor #contents .rect').css('top'));
	console.log('test' + $('#editor #contents #rect').css('top'));
	console.log('test' + $('#editor .selects .rect').css('top'));
	console.log('test' + $('#editor #selects .rect').css('top'));
	console.log('test' + $('#editor .selects #rect').css('top'));
	console.log('test' + $('#editor #selects #rect').css('top'));
	//console.log($('#editor .contents .rect')[top]);
	//console.log($('#editor .contents .rect')['top']);
	//console.log(('#editor .contents .rect').'top');
	//console.log($('#editor .contents .rect').top);

	var storage={
		'wid':toolSelectInfo['x'],
		'hei':toolSelectInfo['y']
	}
	storage=toolSelectInfo;
	
	$('#editor .contents ').mousedown(function(e){
		isMouseDown=true;
		prevPoint={
			'x':e.pageX-init.x,
			'y':e.pageY-init.y
		};
		console.log(prevPoint);


		$('#editor #selects #rect').css({
			'top':prevPoint.y,
			'left':prevPoint.x,
			'width':0,
			'height':0
		}).show();
	
		color =canvas.getPixelArray();
	});

	$('#editor .contents ').mousemove(function(e){
		if(!toolSelect)return;
		if(insideArea(prevPoint.x,prevPoint.y)){
			var x=e.pageX-init.x;
			var y=e.pageY-init.y;
	  		for (var i = toolSelectInfo.x; i < toolSelectInfo.x+toolSelectInfo.width; i++) {
	  			for (var j = toolSelectInfo.y; j < toolSelectImfo.y+toolSelectInfo.height; j++) {
    			//	color[i][j]
   				}
			}
		}
	});
}

function toolSelectInit(){
	toolSelect=true;
	var isMouseDown=false;
	var prevPoint;
	var c_width=$('#editor .contents ').width();
	var c_height=$('#editor .contents ').height();
	var up_w;
	var up_h;
	var up_x;
	var up_y;
	var init={
		'x':$('#editor .contents ').offset().left,
		'y':$('#editor .contents ').offset().top
	}

	toolSelectInfo={
		'x':$('#editor #contents #rect').top,
		'y':$('#editor #contents #rect').left,
		'wid':$('#editor #contents #rect').width,
		'hei':$('#editor #contents #rect').height
		}
	console.log(toolSelectInfo.x);


	$('#editor .contents ').mousedown(function(e){
		if(!toolSelect)return;

		isMouseDown=true;
		prevPoint={
			'x':e.pageX-init.x,
			'y':e.pageY-init.y
		};

		if(!insideArea(prevPoint.x,prevPoint.y)){
			console.log("asdf");
			toolClears();
		}
		
		console.log(prevPoint);
		
		$('#editor #selects #rect').css({
			'top':prevPoint.y,
			'left':prevPoint.x,
			'width':0,
			'height':0
		});
	});
	$(document).mouseup(function(e){
		if(!toolSelect)return;
		isMouseDown=false;
		
		
		$('#editor #selects #rect').css({
			'top':up_y,
			'left':up_x,
			'width':up_w,
			'height':up_h
		});
		

	})
	$(document).mousemove(function(e){
		if(!toolSelect)return;
		if(isMouseDown){
			var x=e.pageX-init.x;
			var y=e.pageY-init.y;
			var w=(x-prevPoint.x);
			var h=(y-prevPoint.y);
			if(x>prevPoint.x&&y>prevPoint.y){
				if(x>c_width){
					w=c_width-prevPoint.x-2;
				}if(y>c_height){
					h=c_height-prevPoint.y-2;
				}
				$('#editor #selects #rect').css({
					'width':w,
					'height':h
				}).show();
				up_w=w;
				up_x=prevPoint.x;
				up_y=prevPoint.y;
				up_h=h;
			}else if(x>prevPoint.x&&y<prevPoint.y){
				if(x>c_width){
					w=c_width-prevPoint.x-2;
				}if(y<0){
					h=-prevPoint.y;
					y=0;
				}
				$('#editor #selects #rect').css({
					'width':w,
					'top':y,
					'height':-h
				}).show();
				up_w=w;
				up_x=prevPoint.x;
				up_y=y;
				up_h=-h;
			}else if(x<prevPoint.x&&y>prevPoint.y){
				if(x<0){
					w=-prevPoint.x;
					x=0;
				}if(y>c_height){
					h=c_height-prevPoint.y-2;
				}
				$('#editor #selects #rect').css({
					'width':-w,
					'left':x,
					'height':h
				}).show();
				up_w=-w;
				up_x=x;
				up_y=prevPoint.y;
				up_h=h;
			}else if(x<prevPoint.x&&y<prevPoint.y){
				if(x<0){
					w=-prevPoint.x;
					x=0;
				}if(y<0){
					h=-prevPoint.y;
					y=0;
				}
				$('#editor #selects #rect').css({
					'width':-w,
					'left':x,
					'top':y,
					'height':-h
				}).show();
				up_w=-w;
				up_x=x;
				up_y=y;
				up_h=-h;
			}			
			console.log(w,h);
		}
	});
}


function toolClears(){

	//toolSelect Clear
	
	//toolSelect=false;
	$('#editor #selects #rect').css({
		'top':0,
		'left':0,
		'width':0,
		'height':0
	}).hide();
}

function insideArea(x,y){
	//to release or grab selected
	
	if(x<toolSelectInfo.x || x>toolSelectInfo.x+toolSelectInfo.width){
		if(y<toolSelectInfo.x || y>toolSelectInfo.y+toolSelectInfo.height){
			return false;
		}
	}
	return true;
}