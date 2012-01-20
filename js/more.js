$(function(){
	$("#favsButton").live('vclick', function(){
	    $.mobile.showPageLoadingMsg();
		$(document).bind(iLepra.events.ready, function(event){
			$(document).unbind(event);
			$.mobile.changePage("more_favs.html");
		});
		iLepra.getFavourites();
	});
	
	$("#myProfileButton").live('vclick', function(){
	    $.mobile.showPageLoadingMsg();
		$(document).bind(iLepra.events.ready, function(event){
			$(document).unbind(event);
			$.mobile.changePage("more_profile.html");
		});
		iLepra.profile.getProfile(iLepra.username);
	});
	
	$("#mySubsButton").live('vclick', function(){
	    iLepra.sub.list = iLepra.userSubLepras;
	    $.mobile.changePage("more_subs.html");
	});
	
	$("#allSubsButton").live('vclick', function(){
	    $.mobile.showPageLoadingMsg();
		$(document).bind(iLepra.events.ready, function(event){
			$(document).unbind(event);
			$.mobile.changePage("more_subs.html");
		});
		iLepra.sub.getList();
	});
	
	$("#govButton").live('vclick', function(){
	    $.mobile.showPageLoadingMsg();
		$(document).bind(iLepra.events.ready, function(event){
			$(document).unbind(event);
			$.mobile.changePage("more_gov.html");
		});
		iLepra.gov.getCurrent();
	});
});