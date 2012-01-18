$(function(){
	$("#favsButton").live('vclick', function(){
	    $.mobile.showPageLoadingMsg();
		$(document).bind(iLepra.events.ready, function(event){
			$(document).unbind(event);
			$.mobile.changePage("more/favs.html", {transition: 'slide'});
		});
		iLepra.getFavourites();
	});
	
	$("#myProfileButton").live('vclick', function(){
	    $.mobile.showPageLoadingMsg();
		$(document).bind(iLepra.events.ready, function(event){
			$(document).unbind(event);
			$.mobile.changePage("more/profile.html", {transition: 'slide'});
		});
		iLepra.profile.getProfile(iLepra.username);
	});
});