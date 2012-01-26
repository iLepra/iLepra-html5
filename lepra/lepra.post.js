iLepra.post = (function() {
	return {
		// current post
		current: null,
		
		// comments array
		comments: null,
		newComments: null,
		
		// get post comments
		getComments: function(id, type){
			if( typeof id == 'undefined' ) id = iLepra.post.current.id;
			if( typeof type == 'undefined' ) type = iLepra.post.current.type;
			
			var url;
			if( type == 'inbox' ){
			    url = "http://leprosorium.ru/my/inbox/"+id
			}else{
    			var server = "leprosorium.ru";
	    		if( iLepra.post.current.domain_url.length > 0 ) server = iLepra.post.current.domain_url;
		    	url = "http://"+server+"/comments/"+id
		    }
		    
			$.get(url, function(data){
			    // replace all img tags to evade image loading while parsing
                data = data.replace(/<img/ig, '<nonimg');
			    //create doc
				var doc = $(data);
				
				iLepra.post.comments = [];
				iLepra.post.newComments = [];
				
				var voteRes = /wtf_vote = '(.+?)'/gi.exec(data);
				
				iLepra.post.current.wtf = { 
					comment: $("#comments-form input[name='wtf']", doc).val(),
					vote: voteRes != null ? voteRes[1] : null
				}
				
				$("#js-commentsHolder .post", doc).each(function(index, item){
					var data = $(item);
					var add = $(".dd .p", data);
					var text = $(".dt", data).html();
					var wrote = add.text().replace(/\s\s+/gi, "").split("|")[0];
					
					// replace images with compressed ones
                    var imgReg = /nonimg src="(.+?)"/g
                    var res = imgReg.exec(text);
                    while(res != null){
                        text = text.replace(res[1], "http://src.sencha.io/"+iLepra.config.screenBiggest+"/"+res[1]);
                        res = imgReg.exec(text);
                    }
                    
					var post = {
						id: data.attr('id'),
						isNew: data.hasClass('new') ? 1 : 0,
						text: text,
						rating: $(".rating", data).text(),
						user: $( $("a", add)[1] ).text(),
						wrote: wrote
					};
					
					iLepra.post.comments.push(post);
					if(post.isNew) iLepra.post.newComments.push(post);
				});
				
				// dispatch event
				$(document).trigger(iLepra.events.ready);
			});
		},
		
		// add comment to post
		addComment: function(comment, inReplyTo){
			var url = "http://";
			if( iLepra.post.current.domain_url != "" && iLepra.post.current.type != "inbox" ){
				url += iLepra.post.current.domain_url;
			}else{
				url += "leprosorium.ru";
			}
			url += "/commctl/";
			
			var data = {
				wtf: iLepra.post.current.wtf.comment,
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
		},
		
		// vote for comment
		voteComment: function(commentId, value){
			var url = "http://";
			if( iLepra.post.current.domain_url != "" ){
				url += iLepra.post.current.domain_url;
			}else{
				url += "leprosorium.ru";
			}
			url += "/rate/";
			
			var data = {
				type: 0,
				wtf: iLepra.post.current.wtf.vote,
				post_id: iLepra.post.current.id,
				id: commentId,
				value: value // 1 || -1
			}
			
			// post
			$.post(url, data, function(data){});
		}
	};
})();
