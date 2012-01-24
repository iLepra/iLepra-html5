(function(){
	// render page on creation
	$("#mystuffPage").live('pagecreate', function(){
		// render posts
		var p = "";
	    for(var i = 0; i < iLepra.myStuffPosts.length; i++)
            p += _.template(postTemplate, iLepra.myStuffPosts[i]);
		$("#mystuffList").append(p);
	});
})();