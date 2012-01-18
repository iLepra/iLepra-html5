$(function(){
	$("#favsButton").live('vclick', function(){
	    $.mobile.showPageLoadingMsg();
		$(document).bind(iLepra.events.ready, function(event){
			$(document).unbind(event);
			$.mobile.changePage("./pages/more/favs.html", {transition: 'slide'});
		});
		iLepra.getFavourites();
	});
});