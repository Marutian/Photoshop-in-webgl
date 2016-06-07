var textSize = 24;
var textFont = 'Dotum';
var textColor;
var isOnText=false;
var clickPoint
function toolTextBoxInit(){


    var init={
        'x':$('#editor .contents ').offset().left,
        'y':$('#editor .contents ').offset().top
    }
    var canvas = document.getElementById('brush');
    var context = canvas.getContext('2d');
    $('#editor .contents ').unbind('click').click(function(e) {
        if(toolText&&!isOnText){
            $('#text .text').val("");
            isOnText=true;
            clickPoint={
                'x':e.pageX-init.x,
                'y':e.pageY-init.y
            };
            textColor=$('#colorSelector div').css('background-color');
            console.log('clicking');
            //text = prompt("Enter text fill in the box : ", "Enter text");
            $('#text').css({
                'left': clickPoint.x,
                'top': clickPoint.y,
            }).show();
             $('#text .text').css({
                 'color':textColor,
                'font-size':textSize,
                'font-family':textFont
             }).focus();


        }
    });
     $('#editor .contents #text .setting .num').change(function(){
        textSize=$(this).val();
        $('#text .text').css('font-size',textSize+'px');
    });
     $('#editor .contents #text .setting select').change(function(){
        textFont=$(this).val();
        $('#text .text').css('font-family',textFont);
    });
    $('#editor .contents #text .setting .btn.ok').unbind('click').click(function(e) {
        $('#text').hide();
        var text=$('#text .text').val();

        $('#text .text').val("");
        if(text){
            context.font = textSize + 'px ' + textFont;
            context.fillStyle=textColor;
            context.fillText(text, clickPoint.x+2, clickPoint.y + parseInt(textSize)+1);
        }
        setTimeout(function(){isOnText=false;},1);
    });
    $('#editor .contents #text .setting .btn.cancle').unbind('click').click(function(e) {
        $('#text').hide();
        $('#text .text').val("");
        setTimeout(function(){isOnText=false;},1);
    });
}