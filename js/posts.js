$(window).load(function(){
	var renderNewPosts = function(){
		// render posts
		$("#postTemplate").tmpl(iLepra.latestPosts).appendTo("#postsList");
	}

	// render page on creation
	$("#postsPage").live('pagecreate', function(){
		renderNewPosts();
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
		// render html
		$("#postContent").html(iLepra.post.current.body);
		
		// render title
		$("#postTitle").text( iLepra.post.current.body.replace(/(<([^>]+)>)/ig,"").substr(0, 64) );
		
		// render additional info
		// Написал мелом судьбы NotJust в | 46036 games.leprosorium.ru, 12.01.2012 в 23.28 | 96 комментариев / 96 новых | x
		var add; 
		if( typeof iLepra.post.current.comments != 'undefined' ){
			add = iLepra.post.current.wrote + " | " + iLepra.post.current.comments;
		}else{ 
			add = iLepra.post.current.gender == "1" ? "Написал " : "Написала ";
			add += iLepra.post.current.user_rank + " <a href='#' class='username'>" + iLepra.post.current.login + "</a>";
			add += iLepra.post.current.domain_url != "" ? " в "+iLepra.post.current.domain_url : "";
			add += ", "+iLepra.post.current.textdate + " в " + iLepra.post.current.posttime;
			add += " | Комментариев: "+ iLepra.post.current.comm_count + " / " + iLepra.post.current.unread;
		}
		$("#postAdditional").html( add )
	});
	
	// refresh
	$("#refreshPostsButton").live('vclick', function(){
		// show loader
		$.mobile.showPageLoadingMsg();
	
		// on posts data
		$(document).bind(iLepra.events.ready, function(event){
			// unbind
			$(document).unbind(event);
			
			// remove loader
			$.mobile.hidePageLoadingMsg();
			
			// clean old data
			$("#postsList").empty();
			
			// render
			renderNewPosts();
			
			// refresh list
			$("#postsList").listview('refresh');
		});
		
		// get posts
		iLepra.getLastPosts();
	});
	
	// more posts
	$("#morePostsButton").live('vclick', function(){
		// show loader
		$.mobile.showPageLoadingMsg();
		
		var scroll = $(window).scrollTop();
	
		// on posts data
		$(document).bind(iLepra.events.ready, function(event){
			// unbind
			$(document).unbind(event);
			
			// remove loader
			$.mobile.hidePageLoadingMsg();
			
			// clean old data
			$("#postsList").empty();
			
			// render
			renderNewPosts();
			
			// refresh list
			$("#postsList").listview('refresh');
			
			// set position
			$(window).scrollTop(scroll);
		});
		
		// get posts
		iLepra.getMorePosts();
	});
});