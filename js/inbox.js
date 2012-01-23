$(window).load(function(){
	// render page on creation
	$("#inboxPage").live('pagecreate', function(){
		// render posts
		var p = "";
	    for(var i = 0; i < iLepra.inboxPosts.length; i++)
            p += _.template(inboxTemplate, iLepra.inboxPosts[i]);
		$("#inboxList").append(p);
	});
});