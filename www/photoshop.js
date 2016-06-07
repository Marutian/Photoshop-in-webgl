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
    	console.log(jitem);
    	var item=jitem[0];
    	console.log(item);
    	console.log(selectedItem);
    	$('#sidebar .item').hide();
    	jitem.show();

    	//		New,Load,Save 2016.06.07 Seunghwa
    	//	1. 같은 필터를 두번 선택하면 초기화되던 것을 재선택할 때마다 초기화하는 것으로 수정
    	//	2. New : 원본의 깨끗한 상태로 되돌림
    	//	3.
    	if(no==100){
			setSelectedFilter(null);
            selectedItem = null;
    	}
    	else if(no==101){
    //	 document.getElementById("inputFile").onchange=function(){
    //    var fileList=this.files;
    //    var fileListSize=fileList.length;
        
     //   document.getElementById("fileListLength").setAttribute("value", fileListSize);
        
    //    var strOption='';
    //    for(var i=0; i<fileListSize; i++){
    //        var file=fileList[i];
    //        var fileName=file.name;
    //        var fileLastModifiedDate=file.lastModifiedDate;
    //        var fileSize=file.fileSize;
            
    //        strOption+='<option>'+fileName+'('+fileSize+' byte) - '+fileLastModifiedDate+'</option>';
   //     }
   //     document.getElementById("fileList").innerHTML=strOption;
  //  };

  		var fso;
  fso = new ActiveXObject("scripting.FileSystemObject"); 
  var srt = fso.GetFolder("c:\\");
  var fc = new Enumerator(srt.files);
  for (; !fc.atEnd(); fc.moveNext())
    document.write(fc.item().name + "<br>\n");
    	}


    	else if(no==102){

    	}
        else if (selectedItem != item) {
            //expandItem(item);
            console.log(item.filter);
            selectedItem = item;
            setSelectedFilter(item.filter);
        } else {
            setSelectedFilter(item.filter);
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