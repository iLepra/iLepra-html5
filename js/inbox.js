$(window).load(function(){
	// render page on creation
	$("#inboxPage").live('pagecreate', function(){
		// render posts
		$("#inboxTemplate").tmpl(iLepra.inboxPosts).appendTo("#inboxList");
	});
});