$(function(){
	$("#postCommentsButton").live('vclick', function(){
		// show loader
		$.mobile.showPageLoadingMsg();
	
		// on posts data
		$(document).bind(iLepra.events.ready, function(event){
			// unbind
			$(document).unbind(event);
			
			$.mobile.changePage("comments.html");
		});
	
		iLepra.post.getComments();
	});
	
	$("#postCommentsPage").live('pagecreate', function(){
		// render title
		$("#postTitle").text( iLepra.post.current.body.replace(/(<([^>]+)>)/ig,"").substr(0, 64) );
		
		// render comments
		$("#commentTemplate").tmpl(iLepra.post.comments).appendTo("#commentsList");
	});
})