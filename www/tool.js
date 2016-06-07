var toolSelectInfo;

function toolMoveInit(){
	var isMouseDown=false;
	canvas2d.getContext('2d').fillStyle = "#f00";
	canvas2d.getContext('2d').fillRect(50,50,100,100);
	canvas.draw(texture).update();
	canvas2d.getContext('2d').clearRect(0, 0, canvas2d.width, canvas2d.height);
	console.log(canvas2d.getContext('2d'));
	console.log(canvas.glasdf);
	
	
	var prevPoint;
	var c_width=$('#editor .contents ').width();
	var c_height=$('#editor .contents ').height();
	var init={
		'x':$('#editor .contents ').offset().left,
		'y':$('#editor .contents ').offset().top
	}
	var color;

	
	var original;							//To keep original image
	//var partImageData = 
	var selectedRect={
		'left':numbercatch($('#editor #selects #rect').css('left')),
		'top':(numbercatch($('#editor #selects #rect').css('top'))/10),	
		'width':numbercatch($('#editor #selects #rect').css('width')),
		'height':numbercatch($('#editor #selects #rect').css('height'))
	}
	var storecontext = canvas2d.getContext('2d');
	console.log(storecontext);
	//var storage = storecontext.createImageData(selectedRect.width,selectedRect.height);							//storage is for store image data

	$('#editor .contents ').mousedown(function(e){
		isMouseDown=true;
		prevPoint={
			'x':e.pageX-init.x,
			'y':e.pageY-init.y
		};
		console.log(prevPoint);

	
		color =canvas.getPixelArray();
		console.log(color);
		//original = canvas.createImageData($('#editor .contents ').width(),$('#editor .contents ').height());
		//original.data.set(canvas.data);
		//setPartImageData(color,storage,selectedRect);
		console.log(storage);
	});

	$('#editor .contents ').mousemove(function(e){
		if(!toolSelect)return;
		if(insideArea(prevPoint.x,prevPoint.y)){
			var x=e.pageX-init.x;
			var y=e.pageY-init.y;
		}
	});
}

function toolSelectInit(){
	//select rect tool
	toolSelect=true;
	var isMouseDown=false;							//It will use if mouse is moving
	var prevPoint;									//The point when you click

	var c_width=$('#editor .contents ').width();	//c is for canvas
	var c_height=$('#editor .contents ').height();

	var up_w;										//To save the data when you 'mouseup'
	var up_h;
	var up_x;
	var up_y;

	var init={										//The position of canvas
		'x':$('#editor .contents ').offset().left,
		'y':$('#editor .contents ').offset().top
	}

	toolSelectInfo={								//To make name simple
		'x':$('#editor .contents #rect').css('top'),
		'y':$('#editor .contents #rect').css('left'),
		'wid':$('#editor .contents #rect').css('width'),
		'hei':$('#editor .contents #rect').css('height')
	}

	$('#editor .contents ').mousedown(function(e){
		if(!toolSelect)return;

		isMouseDown=true;
		prevPoint={
			'x':e.pageX-init.x,
			'y':e.pageY-init.y
		};

		if(!insideArea(prevPoint.x,prevPoint.y)){
			rectClear();
		}
		//console.log(insideArea(prevPoint.x,prevPoint.y));
		//console.log(prevPoint);
		
		$('#editor #selects #rect').css({			//Initializing starting point of rect
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
		if(isMouseDown) {						//Make a rect
			var x = e.pageX - init.x;
			var y = e.pageY - init.y;
			var w = (x - prevPoint.x);
			var h = (y - prevPoint.y);
			if (x > prevPoint.x && y > prevPoint.y) {
				if (x > c_width) {
					w = c_width - prevPoint.x - 2;
				}
				if (y > c_height) {
					h = c_height - prevPoint.y - 2;
				}
				$('#editor #selects #rect').css({
					'width': w,
					'height': h
				}).show();
				up_w = w;
				up_x = prevPoint.x;
				up_y = prevPoint.y;
				up_h = h;
			} else if (x > prevPoint.x && y < prevPoint.y) {
				if (x > c_width) {
					w = c_width - prevPoint.x - 2;
				}
				if (y < 0) {
					h = -prevPoint.y;
					y = 0;
				}
				$('#editor #selects #rect').css({
					'width': w,
					'top': y,
					'height': -h
				}).show();
				up_w = w;
				up_x = prevPoint.x;
				up_y = y;
				up_h = -h;
			} else if (x < prevPoint.x && y > prevPoint.y) {
				if (x < 0) {
					w = -prevPoint.x;
					x = 0;
				}
				if (y > c_height) {
					h = c_height - prevPoint.y - 2;
				}
				$('#editor #selects #rect').css({
					'width': -w,
					'left': x,
					'height': h
				}).show();
				up_w = -w;
				up_x = x;
				up_y = prevPoint.y;
				up_h = h;
			} else if (x < prevPoint.x && y < prevPoint.y) {
				if (x < 0) {
					w = -prevPoint.x;
					x = 0;
				}
				if (y < 0) {
					h = -prevPoint.y;
					y = 0;
				}
				$('#editor #selects #rect').css({
					'width': -w,
					'left': x,
					'top': y,
					'height': -h
				}).show();
				
				up_w = -w;
				up_x = x;
				up_y = y;
				up_h = -h;


			}

			isSelected = up_w > 0 && up_h > 0; //범위가 선택되었는지 확인할 수 있도록..

		}
	});
}


function setPartImageData(color,storage,rect){
	for (var i = 0; i < rect.width; i++) {
		for (var j = 0; j < rect.height; j++) {
			storage.data[i*j*4] = color[i*j*4];
			storage.data[i*j*4+1] = color[i*j*4+1];
			storage.data[i*j*4+2] = color[i*j*4+2];
			storage.data[i*j*4+3] = color[i*j*4+3];
			color[i*j*4+3]=0;
			//canvas.data[(rect.x+i)*(rect.y+j)*4+3]=0;
		}
	}
	//return storage;
}


function rectClear(){
	//toolSelect Clear
	isSelected = false; //범위를 초기화했으니까 당연히 플래그도 false로 바꿔야지
	$('#editor #selects #rect').css({
		'top':0,
		'left':0,
		'width':0,
		'height':0
	}).hide();
}

function insideArea(x,y){
	//To check where your point is to release or grab selected
	var left = numbercatch($('#editor #selects #rect').css('left'));
	var top = numbercatch($('#editor #selects #rect').css('top'));
	top/=10;
	var width = numbercatch($('#editor #selects #rect').css('width'));
	var height = numbercatch($('#editor #selects #rect').css('height'));

	if(x>=left && x<=left+width){
		if(y>=top && y<=top+height){
			return true;
		}
	}
	return false;
}

function numbercatch(str){
	//filter number out
	str = str.replace(/[^0-9]/g,'');
	return str-0;
}