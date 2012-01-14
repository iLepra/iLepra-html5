(function( iLepra ) {

iLepra.post = (function() {
	var post;
	
	post = {
		// current post
		current: null,
		
		// comments array
		comments: null,
		
		// get post comments
		getComments: function(id){
			if( typeof id == 'undefined' ) id = iLepra.post.current.id;
			
			var server = "leprosorium.ru";
			if( iLepra.post.current.domain_url.length > 0 ) server = iLepra.post.current.domain_url;
			$.get("http://"+server+"/comments/"+id, function(data){
				var doc = $(data);
				
				iLepra.post.comments = [];
				
				$("#js-commentsHolder .post", doc).each(function(index, item){
					var data = $(item);
					var add = $(".dd .p", data);
					
					var wrote = add.text().replace(/\s\s+/gi, "").split("|")[0];
					
					var post = {
						text: $(".dt", data).html(),
						rating: $(".rating", data).text(),
						user: $( $("a", add)[1] ).text(),
						wrote: wrote
					};
					
					iLepra.post.comments.push(post);
				});
				
				// dispatch event
				$(document).trigger(iLepra.events.ready);
			});
		},
	};

	return post;
})();

})( iLepra );
