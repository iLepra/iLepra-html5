(function(){
    var postIncrement = 10;
    var postLimit = 10;
    
    var renderNewPosts = function(){
	    // render posts
	    var limit = postLimit > iLepra.myStuffPosts.length ? iLepra.myStuffPosts.length : postLimit;
	    var p = "";
	    for(var i = 0; i < limit; i++)
            p += _.template(postTemplate, iLepra.myStuffPosts[i]);
		$("#mystuffList").append(p);
	}

	// render page on creation
	$("#mystuffPage").live('pagecreate', function(){
	    renderNewPosts();
	    // hide button if needed
	    if( postLimit >= iLepra.myStuffPosts.length ){
            $("#moreMystuffButton").hide();
        }else{
            // more posts click
            $("#moreMystuffButton").bind('vclick', function(){
                var scroll = $(window).scrollTop();
                
                postLimit += postIncrement;
                if( postLimit > iLepra.myStuffPosts.length ){
                    $(this).hide();
                }
                    
                // clean old data
                $("#mystuffList").empty();
                renderNewPosts();
                $("#mystuffList").listview('refresh');
                    
                // set position
                $(window).scrollTop(scroll);
            });
        }
	});
})();