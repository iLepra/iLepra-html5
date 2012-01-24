(function(){
	// render page on creation
	$("#favsPage").live('pagecreate', function(){
		// render posts
		var p = "";
	    for(var i = 0; i < iLepra.favouritePosts.length; i++)
            p += _.template(postTemplate, iLepra.favouritePosts[i]);
		$("#favsList").append(p);
	});
})();