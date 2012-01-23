$(window).load(function(){
	// render page on creation
	$("#mystuffPage").live('pagecreate', function(){
		// render posts
		$("#mystuffTemplate").tmpl(iLepra.myStuffPosts).appendTo("#mystuffList");
	});
});