(function(){
	$("#postsBar").live(iLepra.config.defaultTapEvent, function(){
		$.mobile.showPageLoadingMsg();
		$(document).bind(iLepra.events.ready, function(event){
			$(document).unbind(event);
			$.mobile.changePage("posts.html");
		});
		iLepra.getLastPosts();
	});
	
	$("#mystuffBar").live(iLepra.config.defaultTapEvent, function(){
		$.mobile.showPageLoadingMsg();
		$(document).bind(iLepra.events.ready, function(event){
			$(document).unbind(event);
			$.mobile.changePage("mystuff.html");
		});
		iLepra.getMyStuff();
	});
	
	$("#inboxBar").live(iLepra.config.defaultTapEvent, function(){
		$.mobile.showPageLoadingMsg();
		$(document).bind(iLepra.events.ready, function(event){
			$(document).unbind(event);
			$.mobile.changePage("inbox.html");
		});
		iLepra.getInbox();
	});
	
	$("#moreBar").live(iLepra.config.defaultTapEvent, function(){
    	$.mobile.changePage("more.html");
	});
	
	var updateNavText = function(){
		// render navbar
		var barText = "Мои вещи"
		if(iLepra.myNewPosts > 0 || iLepra.myNewComments > 0){
			barText += " ("+iLepra.myNewPosts+"/"+iLepra.myNewComments+")";
		}
		$("#mystuffBar").text(barText);
		
		var barText = "Инбокс"
		if(iLepra.inboxNewPosts > 0 || iLepra.inboxNewComments > 0){
			barText += " ("+iLepra.inboxNewPosts+"/"+iLepra.inboxNewComments+")";
		}
		$("#inboxBar").text(barText);
	}
})();