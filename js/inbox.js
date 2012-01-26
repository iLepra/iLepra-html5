(function(){
    var postIncrement = 10;
    var postLimit = 10;
    
    var renderNewPosts = function(){
	    // render posts
	    var limit = postLimit > iLepra.inboxPosts.length ? iLepra.inboxPosts.length : postLimit;
	    var p = "";
	    for(var i = 0; i < limit; i++)
            p += _.template(postTemplate, iLepra.inboxPosts[i]);
		$("#inboxList").append(p);
	}

	// render page on creation
	$("#inboxPage").live('pagecreate', function(){
		renderNewPosts();
	    // hide button if needed
	    if( postLimit >= iLepra.inboxPosts.length ){
            $("#moreInboxButton").hide();
        }else{
            // more posts click
            $("#moreInboxButton").bind(iLepra.config.defaultTapEvent, function(){
                var scroll = $(window).scrollTop();
                
                postLimit += postIncrement;
                if( postLimit >= iLepra.inboxPosts.length ){
                    $("#moreInboxButton").hide();
                }
                    
                // clean old data
                $("#inboxList").empty();
                renderNewPosts();
                $("#inboxList").listview('refresh');
                    
                // set position
                $(window).scrollTop(scroll);
            });
        }
	});
})();