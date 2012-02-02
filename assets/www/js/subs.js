$(window).load(function(){
    var subName = null;

	// render page on creation
	$(document).on('pagecreate', "#subsPage", function(){
	    // render posts
	    var p = "";
	    for(var i = 0; i < iLepra.sub.list.length; i++)
            p += _.template(subsTemplate, iLepra.sub.list[i]);
		$("#subsList").append(p);
	});
	
	// sub click
	$(document).on(iLepra.config.defaultTapEvent, "a.subListItem", function(){
	    // show loader
		$.mobile.showPageLoadingMsg();
	
		// on posts data
		$(document).bind(iLepra.events.ready, function(event){
			$(document).unbind(event);		
			$.mobile.changePage("more_subposts.html");
		});
		
		subName = $(this).children('h1').text();
		
		// get posts
		var url = $(this).data('link');
		iLepra.sub.getPosts(url);
	});
	
	$(document).on('pagecreate', "#subpostsPage", function(){
	    // render posts
	    var p = "";
	    for(var i = 0; i < iLepra.sub.posts.length; i++)
            p += _.template(postTemplate, iLepra.sub.posts[i]);
		$("#subpostsList").append(p);
		
		// title 
		$("#subpostsTitle").text(subName);
	});
});