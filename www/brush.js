var brushWidth = 20;
var eraserWidth = 30;

var isDrawing = false;
var isErasing = false;

function toolBrushInit(){

    //이미지의 왼쪽 상단좌표를 영점으로 설정한다
    var init={
        'x':$('#editor .contents ').offset().left,
        'y':$('#editor .contents ').offset().top
    }

    //캔버스 가져오기
    var context = document.getElementById('brush').getContext('2d');

    isDrawing = false; //드래그중인지 확인하는 플래그

    $('#editor .contents ').mousedown(function(e) {
        console.log('??');
        isDrawing = true; //드래그중
        context.beginPath(); //그리기를 시작함을 알림
        context.moveTo(e.pageX - init.x, e.pageY - init.y); //클릭한 지점을 시작점으로 설정
    });

    $('#editor .contents ').mousemove(function(e) {
        if (isDrawing) {
            context.strokeStyle = $('#colorSelector div').css('background-color'); //색상 지정
            context.lineWidth = brushWidth; //두께 지정
            context.lineJoin = context.lineCap = 'round'; //모서리 타입 (기본 : 원형)
            context.lineTo(e.pageX - init.x, e.pageY-init.y); //어디까지 그릴 것인가..?
            context.stroke(); //보여주자 이제
        }
    });

    $('#editor .contents ').mouseup(function() {
        isDrawing = false; //드래그중이 아님
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

    $('#editor .contents ').mousedown(function(e) {
        isErasing = true; //드래그중
        context.beginPath(); //그리기를 시작함을 알림
        context.moveTo(e.pageX - init.x, e.pageY - init.y); //클릭한 지점을 시작점으로 설정
    });

    $('#editor .contents ').mousemove(function(e) {
        if (isErasing) {

            context.strokeStyle = 'rgba(0,0,0,1)'; //색상 지정
            context.lineWidth = eraserWidth; //두께 지정
            context.globalCompositeOperation = 'destination-out';
            context.lineJoin = context.lineCap = 'round'; //모서리 타입 (기본 : 원형)
            context.lineTo(e.pageX - init.x, e.pageY-init.y); //어디까지 그릴 것인가..?
            context.stroke(); //보여주자 이제


        }
    });

    $('#editor .contents ').mouseup(function() {
        isErasing = false; //드래그중이 아님
    });
}