var isSelected = false;
var toolSelect=false;
var toolPipet=false;
var toolBrush=false;
var toolEraser=false;
var toolMove=false;
var toolText = false;

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
		console.log(no);
		var jitem=$('#sidebar .item').eq(no);
		$('#sidebar .item').hide();
		jitem.show();

		if(no==100){
			setSelectedFilter(null);
			selectedItem = null;
			texture.destroy();
			canvas.draw(texture).update();
		}
		else if(no==101){
			$('input.upload').click();
		}else if(no==102){
			var snapshotPNG = canvas.toDataURL();
			window.open(snapshotPNG, 'snapshot', 'width=300, height=300');
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
	//html에서 attr속성 (data-no)으로 넣어놓은 값 = sidebar item의 인덱스 순서
	//상단 메뉴 클릭시 sidebar item 연결하기 위함
	$('#tools .tool').click(function(){
		$('#tools .tool.active').removeClass('active');
		var toolname=$(this).attr('data-tool');
		$(this).addClass('active');

		SetCurrentTool(toolname);
	});
}


function toolClear(){
	toolSelect=false;
	toolPipet=false;
	toolBrush=false;
	toolEraser=false;
	toolMove=false;
	toolText = false;
	$('#text').hide();
	isOnText=false;

}
function SetCurrentTool(toolname){
	toolClear();
	switch(toolname){
		case 'select':
			toolSelect=true;
			toolSelectInit();
			break;
		case 'move':
			toolMove=true;
			toolMoveInit();
			break;
		case 'pipet':
			toolPipet=true;
			toolPipetInit();
			break;
		case 'brush':
			toolBrush=true;
			toolBrushInit();
			break;
		case 'eraser':
			toolEraser=true;
			toolEraserInit();
			break;
		case 'text':
			toolText = true;
			toolTextBoxInit();
			break;
	}
}
