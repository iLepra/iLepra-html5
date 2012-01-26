
    var postIncrement = 10;
    var postLimit = 10;

	var renderNewPosts = function(){
	    // render posts
	    var limit = postLimit > iLepra.latestPosts.length ? iLepra.latestPosts.length : postLimit;
	    var p = "";
	    for(var i = 0; i < limit; i++)
            p += $.template(postTemplate, iLepra.latestPosts[i]);
		$("#postsList").html(p);
	}
	
/*(function(){
	// render page on creation
	$("#postsPage").live('pagecreate', function(){
		renderNewPosts();
		
		// refresh
        $("#refreshPostsButton").bind('vclick', function(){
            // show loader
            $.mobile.showPageLoadingMsg();
        
            // on posts data
            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);
                $.mobile.hidePageLoadingMsg();
                
                // clean old data & render
                $("#postsList").empty();
                renderNewPosts();
                $("#postsList").listview('refresh');
            });
            
            // get posts
            iLepra.getLastPosts();
        });
        
        // more posts
        $("#morePostsButton").bind('vclick', function(){
            var scroll = $(window).scrollTop();
            
            if( postLimit < iLepra.latestPosts.length){
                postLimit += postIncrement;
                
                // clean old data
                $("#postsList").empty();
                renderNewPosts();
                $("#postsList").listview('refresh');
                
                // set position
                $(window).scrollTop(scroll);
            }else{ // load new data
                // show loader
                $.mobile.showPageLoadingMsg();
                
                // on posts data
                $(document).bind(iLepra.events.ready, function(event){
                    $(document).unbind(event);
                    
                    // remove loader
                    $.mobile.hidePageLoadingMsg();
                    
                    // clean old data
                    $("#postsList").empty();
                    renderNewPosts();
                    $("#postsList").listview('refresh');
                    
                    // set position
                    $(window).scrollTop(scroll);
                });
                
                // get posts
                iLepra.getMorePosts();
            }
        });
	});

	// show full post
	$(".postListItem").live('vclick', function(){
		currentPostId = $(this).data('id');
		
		// get selected post
		if( $.mobile.activePage.attr('id') == "postsPage" ){
			for(var i in iLepra.latestPosts){
				if(iLepra.latestPosts[i].id == currentPostId){
					iLepra.post.current = iLepra.latestPosts[i];
					break;
				}
			}
		}else if( $.mobile.activePage.attr('id') == "mystuffPage" ){
			for(var i in iLepra.myStuffPosts){
				if(iLepra.myStuffPosts[i].id == currentPostId){
					iLepra.post.current = iLepra.myStuffPosts[i];
					break;
				}
			}
		}else if( $.mobile.activePage.attr('id') == "inboxPage" ){
			for(var i in iLepra.inboxPosts){
				if(iLepra.inboxPosts[i].id == currentPostId){
					iLepra.post.current = iLepra.inboxPosts[i];
					break;
				}
			}
		}else if( $.mobile.activePage.attr('id') == "favsPage" ){
			for(var i in iLepra.favouritePosts){
				if(iLepra.favouritePosts[i].id == currentPostId){
					iLepra.post.current = iLepra.favouritePosts[i];
					break;
				}
			}
		}else if( $.mobile.activePage.attr('id') == "subpostsPage"){
		    for(var i in iLepra.sub.posts){
				if(iLepra.sub.posts[i].id == currentPostId){
					iLepra.post.current = iLepra.sub.posts[i];
					break;
				}
			}
		}
		
		$.mobile.changePage("post_full.html");
	});
	
	// render full post text
	$("#fullPostPage").live('pagecreate', function(){
	    // on comments request
        $("#postCommentsButton").bind('vclick', function(){
            // show loader
            $.mobile.showPageLoadingMsg();
        
            // on posts data
            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);
                $.mobile.changePage("post_comments.html");
            });
        
            iLepra.post.getComments();
        });
	
		// render html
		$("#postContent").html(iLepra.post.current.body);
		
		// render title
		$("#postTitle").text( iLepra.post.current.body.replace(/(<([^>]+)>)/ig,"").substr(0, 64) );
		
		// render additional info
		// Написал мелом судьбы NotJust в | 46036 games.leprosorium.ru, 12.01.2012 в 23.28 | 96 комментариев / 96 новых | x
		var add = iLepra.post.current.wrote + ", " + iLepra.post.current.when + " | " + iLepra.post.current.comments;
		$("#postAdditional").html( add )
	});
	
	
})();*/