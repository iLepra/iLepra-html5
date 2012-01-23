$(window).load(function(){
	// render page on creation
	$("#favsPage").live('pagecreate', function(){
		// render posts
		$("#favsTemplate").tmpl(iLepra.favouritePosts).appendTo("#favsList");
	});
});