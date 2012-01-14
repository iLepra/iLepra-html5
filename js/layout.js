$(function(){
	$("#layoutBL").live('vclick', function(){
		prepareReadyEvent();
		iLepra.switchLayout(1);
	});
	
	$("#layoutAll").live('vclick', function(){
		prepareReadyEvent();
		iLepra.switchLayout(0);
	});
	
	$("#layoutSubL").live('vclick', function(){
		prepareReadyEvent();
		iLepra.switchLayout(2);
	});
	
	var prepareReadyEvent = function(){
		// show loader
		$.mobile.showPageLoadingMsg();
		
		// on posts data
		$(document).bind(iLepra.events.ready, function(event){
			// unbind
			$(document).unbind(event);
			
			$.mobile.changePage("../posts.html");
		});
	}
});