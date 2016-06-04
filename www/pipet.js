function toolPipetInit() {

    toolClear();

    var pixels = canvas.getPixelArray();
    var clickPoint;
    var c_width=$('#editor .contents ').width();
    var c_height=$('#editor .contents ').height();

    var init={
        'x':$('#editor .contents ').offset().left,
        'y':$('#editor .contents ').offset().top
    }

    $('#editor .contents ').mousedown(function(e){


        clickPoint={
            'x':e.pageX-init.x,
            'y':e.pageY-init.y
        };

        var index = (Math.floor(clickPoint.y) * canvas.width + Math.floor(clickPoint.x)) * 4;

        var color = {
            'r':pixels[index],
            'g':pixels[index+1],
            'b':pixels[index+2]
        }

        $('#colorSelector').ColorPickerSetColor(color);
    });
}