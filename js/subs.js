$(function(){
    var subName = null;

	// render page on creation
	$("#subsPage").live('pagecreate', function(){
	    // render posts
		$("#subsTemplate").tmpl(iLepra.sub.list).appendTo("#subsList");
	});
	
	// sub click
	$(".subListItem").live('vclick', function(){
	    // show loader
		$.mobile.showPageLoadingMsg();
	
		// on posts data
		$(document).bind(iLepra.events.ready, function(event){
			$(document).unbind(event);		
			$.mobile.changePage("subposts.html");
		});
		
		subName = $(this).children('h1').text();
		
		// get posts
		var url = $(this).data('link');
		iLepra.sub.getPosts(url);
	});
	
	$("#subpostsPage").live('pagecreate', function(){
	    // render posts
		$("#subpostTemplate").tmpl(iLepra.sub.posts, {
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
		}).appendTo("#subpostsList");
		
		// title 
		$("#subpostsTitle").text(subName);
	});
});