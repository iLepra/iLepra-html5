(function(){
    // pagination & display stuff 
	var commentsIncrement = 10;
    var commentsLimit = 10;
    var type = "all"; // all || new
    // current comment
	var commentId = null;
	var commentUser = null;
	
	var renderNewComments = function(){
	    // render posts
	    var p = "";
	    
	    if( type == "all" ){
	        var limit = commentsLimit > iLepra.post.comments.length ? iLepra.post.comments.length : commentsLimit;
	        for(var i = 0; i < limit; i++){
	            p += _.template(commentTemplate, iLepra.post.comments[i]);
	        }
	    }else if( type == "new" ){
	        var limit = commentsLimit > iLepra.post.newComments.length ? iLepra.post.newComments.length : commentsLimit;
	        for(var i = 0; i < limit; i++){
	            p += _.template(commentTemplate, iLepra.post.newComments[i]);
	        }
        }
		$("#commentsList").append(p);
	}
	
	// on post comments show
	$("#postCommentsPage").live('pagecreate', function(){
	    $("#allComments").bind(iLepra.config.defaultTapEvent, function(){
	        $(this).addClass("ui-btn-active");
	        $("#newComments").removeClass("ui-btn-active");
	        type = "all";
	        
	        // redraw
            $("#commentsList").empty();
		    renderNewComments();
            $("#commentsList").listview('refresh');
	    });
	    
	    $("#newComments").bind(iLepra.config.defaultTapEvent, function(){
    	    $(this).addClass("ui-btn-active");
	        $("#allComments").removeClass("ui-btn-active");
	        type = "new";
	        
	        // redraw
            $("#commentsList").empty();
		    renderNewComments();
            $("#commentsList").listview('refresh');
	    });
	
	    $("#addCommentButton").bind(iLepra.config.defaultTapEvent, function(){
            commentId = null;
            commentUser = null;
        
            $.mobile.changePage("post_addcomment.html", {
                role: "dialog", 
                transition: "slidedown", 
                inline: "true"
            });
        });
        
        // on comment option pick
        $("#commentMenu").bind("change", function(event, ui) {
            var value = $('#commentMenu').val();
            
            // remove selection
            $( $(".ui-selectmenu-list .ui-btn-active")[0] ).removeClass('ui-btn-active');
            
            switch(value){
                case 'reply':			
                    $.mobile.changePage("post_addcomment.html", {
                        role: "dialog", 
                        transition: "slidedown", 
                        inline: "true"
                    });
                    break;	
                
                case 'plus':
                    iLepra.post.voteComment(commentId, "1");
                    break;
                    
                case 'minus':
                    iLepra.post.voteComment(commentId, "-1");
                    break;
            }
        });
	
		// render title
		$("#postCommentsTitle").text( iLepra.post.current.body.replace(/(<([^>]+)>)/ig,"").substr(0, 64) );
		
		// render comments
		renderNewComments();
		
		// hide button if needed
	    if( commentsLimit >= iLepra.post.comments.length ){
            $("#moreCommentsButton").hide();
        }else{
            // more posts click
            $("#moreCommentsButton").bind(iLepra.config.defaultTapEvent, function(){
                var scroll = $(window).scrollTop();
                
                commentsLimit += commentsIncrement;
                if( commentsLimit >= iLepra.post.comments.length ){
                    $("#moreCommentsButton").hide();
                }
                    
                // clean old data
                $("#commentsList").empty();
		        renderNewComments();
                $("#commentsList").listview('refresh');
                    
                // set position
                $(window).scrollTop(scroll);
            });
        }
	});
	
	// show comment menu
	$(".postCommentItemMenu").live(iLepra.config.defaultTapEvent, function(e){
		e.preventDefault();
		
		var voteMenu = $( $(".ui-selectmenu li")[2] );
		
		if( iLepra.post.current.type == "inbox" && voteMenu.is(':visible') ){
		    voteMenu.hide().next().hide();
		}else if( !voteMenu.is(':visible') ){
    		voteMenu.show().next().show();
		}
		
		commentId = $(this).data('id');
		commentUser = $(this).data('user');
		
		// open menu
		$('#commentMenu').selectmenu('open');
		// position menu near click
		var top = $(this).offset().top + $(".ui-selectmenu").height() / 4;
		if( top < 50 ) top = 50;
		$(".ui-selectmenu").css('left', '').css('right', '50px').css('top', top+'px');
	});
	
	
	
	// on add comment show
	$("#addCommentPage").live('pagecreate', function(){
	    // submit comment
        $("#submitComment").bind(iLepra.config.defaultTapEvent, function(){
            var commentText = $("#commentTextarea").val();
        
            // show loader
            $.mobile.showPageLoadingMsg();
            
            // on comment error
            $(document).bind(iLepra.events.error, function(event){
                // unbind
                $(document).unbind(event);
                $(document).unbind(iLepra.events.ready);
                // hide
                $.mobile.hidePageLoadingMsg();
                // show error
                iLepra.ui.showError("Ошибка добавлени комментария! Попробуйте еще раз?");
            });
        
            // on successful comment
            $(document).bind(iLepra.events.ready, function(event){
                // unbind
                $(document).unbind(event);
                $(document).unbind(iLepra.events.error);
                // change page
                $.mobile.changePage("post_comments.html");
            });
        
            iLepra.post.addComment(commentText, commentId);
        });
	
		if( commentUser != null ){
			$("#commentTextarea").val(commentUser+": ");
		}else{
			$("#commentTextarea").val("");
		}
	});
})();