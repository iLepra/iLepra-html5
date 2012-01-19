$(function(){
	$("#favsButton").live('vclick', function(){
	    $.mobile.showPageLoadingMsg();
		$(document).bind(iLepra.events.ready, function(event){
			$(document).unbind(event);
			$.mobile.changePage("more/favs.html");
		});
		iLepra.getFavourites();
	});
	
	$("#myProfileButton").live('vclick', function(){
	    $.mobile.showPageLoadingMsg();
		$(document).bind(iLepra.events.ready, function(event){
			$(document).unbind(event);
			$.mobile.changePage("more/profile.html");
		});
		iLepra.profile.getProfile(iLepra.username);
	});
	
	$("#mySubsButton").live('vclick', function(){
	    iLepra.sub.list = iLepra.userSubLepras;
	    $.mobile.changePage("more/subs.html");
	});
	
	$("#allSubsButton").live('vclick', function(){
	    $.mobile.showPageLoadingMsg();
		$(document).bind(iLepra.events.ready, function(event){
			$(document).unbind(event);
			$.mobile.changePage("more/subs.html");
		});
		iLepra.sub.getList();
	});
	
	$("#govButton").live('vclick', function(){
	    $.mobile.showPageLoadingMsg();
		$(document).bind(iLepra.events.ready, function(event){
			$(document).unbind(event);
			$.mobile.changePage("more/gov.html");
		});
		iLepra.gov.getCurrent();
	});
});