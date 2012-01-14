$(function(){
	// render page on creation
	$("#postsPage").live('pagecreate', function(){
		// render posts
		$("#postTemplate").tmpl(iLepra.latestPosts, {
			image: function(){ 
				var imgReg = /img src="(.+?)"/g
				var res = imgReg.exec(this.data.body);
				var img = "";
				if( res != null ){ 
					img = res[1];
				}else{
					img = "../css/img/placeholder.png";
				}
				return img;
			},
			text: function(){
				return this.data.body.replace(/(<([^>]+)>)/ig," ").substr(0, 128) + "...";
			}
		}).appendTo("#postsList");
	});

	// show full post
	$(".postListItem").live('vclick', function(){
		currentPostId = $(this).data('id');
		
		// get selected post
		for(var i in iLepra.latestPosts){
			if(iLepra.latestPosts[i].id == currentPostId){
				iLepra.post.current = iLepra.latestPosts[i];
				break;
			}
		}
		
		$.mobile.changePage("post/full.html");
	});
	
	$("#fullPostPage").live('pagecreate', function(){
		// render html
		$("#postContent").html(iLepra.post.current.body);
		
		// render title
		$("#postTitle").text( iLepra.post.current.body.replace(/(<([^>]+)>)/ig,"").substr(0, 64) );
		
		// render additional info
		// Написал мелом судьбы NotJust в | 46036 games.leprosorium.ru, 12.01.2012 в 23.28 | 96 комментариев / 96 новых | x
		var add = iLepra.post.current.gender == "1" ? "Написал " : "Написала ";
		add += iLepra.post.current.user_rank + " " + iLepra.post.current.login;
		add += iLepra.post.current.domain_url != "" ? " в "+iLepra.post.current.domain_url : "";
		add += ", "+iLepra.post.current.textdate + " в " + iLepra.post.current.posttime;
		add += " | Комментариев: "+ iLepra.post.current.comm_count + " / " + iLepra.post.current.unread;
		$("#postAdditional").text( add )
	});
});