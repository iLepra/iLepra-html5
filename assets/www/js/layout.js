(function(){
    var prepareReadyEvent = function(){
		// show loader
		$.mobile.showPageLoadingMsg();
		
		// on posts data
		$(document).bind(iLepra.events.ready, function(event){
			$(document).unbind(event);
			$.mobile.changePage("posts.html");
		});
	}
	
    $(document).on('pagecreate', "#layoutSwitchPage", function(){
        $("#layoutBL").bind(iLepra.config.defaultTapEvent, function(){
            prepareReadyEvent();
            iLepra.switchLayout(1);
        });
        
        $("#layoutAll").bind(iLepra.config.defaultTapEvent, function(){
            prepareReadyEvent();
            iLepra.switchLayout(0);
        });
        
        $("#layoutSubL").bind(iLepra.config.defaultTapEvent, function(){
            prepareReadyEvent();
            iLepra.switchLayout(2);
        });
	});
})();