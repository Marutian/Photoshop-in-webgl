$(document).ready(function(){
	InitTopbar();

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