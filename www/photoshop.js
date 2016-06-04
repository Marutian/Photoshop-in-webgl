$(document).ready(function(){
	InitTopbar();
	InitTools();
})
function InitTopbar(){
	$('#topbar .menu>li').click(function(){
		var active=$(this);
		var open=$('.open',this);
		$(active).addClass('active');
		$(open).show(1,function(){
			$(document).on('click',function(e){
				$(open).hide();
				$(document).off('click');
				$(active).removeClass('active');
			});
		});
	});
	$('#topbar .top_menu.ink').click(function(){
		topInkInit();
	});
}
function topInkInit(){
	$('#sidebar .item').eq(12).show();
	//$('#sidebar .item').eq(12).addClass('active');
}
function InitTools(){
	$('#tools .tool').click(function(){
		$('#tools .tool.active').removeClass('active');
		var toolname=$(this).attr('data-tool');
		$(this).addClass('active');

		SetCurrentTool(toolname);
	});
}


function toolSelectInit(){

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
		}).show();;
	});
	$(document).mouseup(function(e){
		isMouseDown=false;
		$('#editor #selects #rect').css({
			'top':up_y,
			'left':up_x,
			'width':up_w,
			'height':up_h
		});
	})
	$(document).mousemove(function(e){
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
				});
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
				});
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
				});
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
				});
				up_w=-w;
				up_x=x;
				up_y=y;
				up_h=-h;
			}

			
		//	console.log(e.offsetX);
		}
	});
}
function toolMoveInit(){
	alert("!");
}
function SetCurrentTool(toolname){
	switch(toolname){
		case 'select':
			toolSelectInit();
			break;
		case 'move':
			//~~
			toolMoveInit();
			break;
	}
}