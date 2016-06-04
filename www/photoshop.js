var toolSelect=false;
function InitPhotoshop(){
	InitTopbar();
	InitTools();
	InitColor();
 	
}
function InitColor(){
	$('#colorSelector').ColorPicker({
		color: '#ffffff',
		onShow: function (colpkr) {
			$(colpkr).show();
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).hide();
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			$('#colorSelector div').css('background-color', '#' + hex);
			console.log("!");
		}
	});

}
function InitTopbar(){
	$('#topbar .menu>li').click(function(){
		var active=$(this);
		var open=$('.open',this);
		$(active).addClass('active');
		$(open).show(1,function(){
			$(document).click(function(e){
				$(open).hide();
				$(document).unbind('click');
				$(active).removeClass('active');
			});
		});
	});
	   // Change the filter when a sidebar item is clicked
    //      /. Sidebar -> Topbar ( 2016.05.31 Seungjun )
    //          -. 1. 사이드바 탑바로 이동. 
    //          -. 2. 기존 오픈되어 있던 메뉴와 달리, 드롭다운 메뉴 클릭시에 그 아래에 나와야함.
    //			-. 3. 메뉴 클릭만으로 필터 이벤트 준비
    $('#topbar .top_menu').click(function(e) {

    	var no=$(this).attr('data-no');
    	var jitem=$('#sidebar .item').eq(no);
    	var item=jitem[0];
    	$('#sidebar .item').hide();
    	jitem.show();
        if (selectedItem != item) {
            //expandItem(item);
            console.log(item.filter);
            selectedItem = item;
            setSelectedFilter(item.filter);
        } else {
            setSelectedFilter(null);
            selectedItem = null;
        }
    });


     // Update texture with canvas contents when a filter is accepted
    $('.accept').bind('click', function() {
        texture.destroy();
        texture = canvas.contents();
        setSelectedFilter(null);
        selectedItem = null;
        $('#sidebar .item').hide();
    });
    

}

function InitTools(){
	$('#tools .tool').click(function(){
		$('#tools .tool.active').removeClass('active');
		var toolname=$(this).attr('data-tool');
		$(this).addClass('active');

		SetCurrentTool(toolname);
	});
}




function toolClear(){
	toolSelect=false;
	
	//toolSelect Clear
	/*
	toolSelect=false;
	$('#editor #selects #rect').css({
		'top':0,
		'left':0,
		'width':0,
		'height':0
	}).hide();*/
}
function SetCurrentTool(toolname){
	toolClear();
	switch(toolname){
		case 'select':
			var a=canvas.getPixelArray();
			console.log(a);
			toolSelectInit();
			break;
		case 'move':
			//~~

			toolMoveInit();
			break;
		case 'pipet':
			toolPipetInit();
			break;
		case 'brush':
			toolBrushInit();
			break;
		case 'eraser':
			toolEraserInit();
			break;
	}
}