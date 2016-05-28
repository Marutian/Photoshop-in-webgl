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
}
function InitTools(){
	$('#tools .tool').click(function(){
		$('#tools .tool.active').removeClass('active');
		$(this).addClass('active');
	});
}