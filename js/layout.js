(function(){
    var prepareReadyEvent = function(){
		// show loader
		$.mobile.showPageLoadingMsg();
		
		// on posts data
		$(document).bind(iLepra.events.ready, function(event){
			// unbind
			$(document).unbind(event);
			
			$.mobile.changePage("posts.html");
		});
	}
	
    $("#layoutSwitchPage").live('pagecreate', function(){
        $("#layoutBL").bind('vclick', function(){
            prepareReadyEvent();
            iLepra.switchLayout(1);
        });
        
        $("#layoutAll").bind('vclick', function(){
            prepareReadyEvent();
            iLepra.switchLayout(0);
        });
        
        $("#layoutSubL").bind('vclick', function(){
            prepareReadyEvent();
            iLepra.switchLayout(2);
        });
	});
})();