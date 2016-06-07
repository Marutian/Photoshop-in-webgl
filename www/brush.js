var brushWidth = 20;
var eraserWidth = 30;

var isDrawing = false;
var isErasing = false;

var init;

function toolBrushInit(){
    //이미지의 왼쪽 상단좌표를 영점으로 설정한다
    init={
        'x':$('#editor .contents ').offset().left,
        'y':$('#editor .contents ').offset().top
    }

    //캔버스 가져오기
    var context = document.getElementById('brush').getContext('2d');
    isDrawing = false; //드래그중인지 확인하는 플래그

    $('#editor .contents').unbind('mousedown').mousedown(function(e) {
        if(toolBrush){

            if (cannotDraw(e))
                return;

            var point = getMousePoint(e);
            isDrawing = true; //드래그중
            context.strokeStyle = $('#colorSelector div').css('background-color'); //색상 지정
            context.beginPath(); //그리기를 시작함을 알림
            context.moveTo(e.pageX - init.x, e.pageY - init.y); //클릭한 지점을 시작점으로 설정
        }
    });

    $('#editor .contents ').unbind('mousemove').mousemove(function(e) {
        if(toolBrush){

            if(isDrawing){
                if (cannotDraw(e))
                    return;

                var point = getMousePoint(e);
                context.lineWidth = brushWidth; //두께 지정
                context.lineJoin = context.lineCap = 'round'; //모서리 타입 (기본 : 원형)
                context.lineTo(point.x, point.y); //어디까지 그릴 것인가..?
                context.stroke(); //보여주자 이제

            }
        }
    });

    $('#editor .contents ').mouseup(function() {
        isDrawing = false; //드래그중이 아님
        context.closePath();
    });


}

function toolEraserInit(){

    //이미지의 왼쪽 상단좌표를 영점으로 설정한다
    var init={
        'x':$('#editor .contents ').offset().left,
        'y':$('#editor .contents ').offset().top
    }

    //캔버스 가져오기
    var context = document.getElementById('brush').getContext('2d');
    var isErasing = false; //드래그중인지 확인하는 플래그

    $('#editor .contents').unbind('mousedown').mousedown(function(e) {
        if(toolEraser){

            if (cannotDraw(e))
                return;

            var point = getMousePoint(e);
            isErasing = true; //드래그중
            context.strokeStyle = 'rgba(0,0,0,1)'; //색상 지정
            context.beginPath(); //그리기를 시작함을 알림
            context.moveTo(e.pageX - init.x, e.pageY - init.y); //클릭한 지점을 시작점으로 설정
        }
    });
    $('#editor .contents ').unbind('mousemove').mousemove(function(e) {
        if(toolEraser){
            if (isErasing) {

                if (cannotDraw(e))
                    return;

                var point = getMousePoint(e);
                context.lineWidth = eraserWidth; //두께 지정
                context.globalCompositeOperation = 'destination-out';
                context.lineJoin = context.lineCap = 'round'; //모서리 타입 (기본 : 원형)
                context.lineTo(e.pageX - init.x, e.pageY-init.y); //어디까지 그릴 것인가..?
                context.stroke(); //보여주자 이제
            }

        }
    });
    $('#editor .contents ').unbind('mouseup').mouseup(function() {
        isErasing = false; //드래그중이 아님
        context.globalCompositeOperation = 'source-over';
        context.closePath();
    });
}
//현재 마우스 이벤트를 전달해주면 좌표를 계산해서 구조체에 담아주는 함수
function getMousePoint(e){
    var mousePoint = {
        'x' : e.pageX - init.x,
        'y' : e.pageY - init.y
    }

    return mousePoint;
}

//좌표에 따라 그릴 수 있는지 없는지 판단해주는 함수
function cannotDraw(e){
    var drawPoint = getMousePoint(e);
    return isSelected && !(insideArea(drawPoint.x - brushWidth/2, drawPoint.y - brushWidth/2));
}
