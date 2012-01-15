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
				
				iLepra.post.current.wtf = $("#comments-form input[name='wtf']", doc).val();
				
				$("#js-commentsHolder .post", doc).each(function(index, item){
					var data = $(item);
					var add = $(".dd .p", data);
					
					var wrote = add.text().replace(/\s\s+/gi, "").split("|")[0];
					
					var post = {
						id: data.attr('id'),
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
		
		// add comment to post
		addComment: function(comment, inReplyTo){
			var url = "http://";
			if( iLepra.post.current.domain_url != "" ){
				url += iLepra.post.current.domain_url;
			}else{
				url += "leprosorium.ru";
			}
			url += "/commctl/";
			
			var data = {
				wtf: iLepra.post.current.wtf,
				pid: iLepra.post.current.id,
				comment: comment
			}
			
			if(typeof inReplyTo != 'undefined' && inReplyTo != null) data.replyto = inReplyTo;
			
			$.post(url, data, function(data){
				data = $.parseJSON(data);
				
				if( data.status == "ERR" ){
					$(document).trigger(iLepra.events.error);
				}else{
					iLepra.post.getComments();
				}
			});
		}
	};

	return post;
})();

})( iLepra );
