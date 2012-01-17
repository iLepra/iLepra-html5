$(function(){
	var commentId = null;
	var commentUser = null;

	// on comments request
	$("#postCommentsButton").live('vclick', function(){
		// show loader
		$.mobile.showPageLoadingMsg();
	
		// on posts data
		$(document).bind(iLepra.events.ready, function(event){
			// unbind
			$(document).unbind(event);
			
			$.mobile.changePage("comments.html");
		});
	
		iLepra.post.getComments();
	});
	
	// on post comments show
	$("#postCommentsPage").live('pagecreate', function(){
		// render title
		$("#postCommentsTitle").text( iLepra.post.current.body.replace(/(<([^>]+)>)/ig,"").substr(0, 64) );
		
		// render comments
		$("#commentsList").empty();
		$("#commentTemplate").tmpl(iLepra.post.comments).appendTo("#commentsList");
	});
	
	$("#addCommentButton").live('vclick', function(){
		commentId = null;
		commentUser = null;
	
		$.mobile.changePage("addcomment.html", {
			role: "dialog", 
			transition: "slidedown", 
			inline: "true"
		});
	});
	
	// show comment menu
	$(".postCommentItemMenu").live('vclick', function(e){
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
	
	// on comment option pick
	$("#commentMenu").live("change", function(event, ui) {
		var value = $('#commentMenu').val();
		
		// remove selection
		$( $(".ui-selectmenu-list .ui-btn-active")[0] ).removeClass('ui-btn-active');
		
		switch(value){
			case 'reply':			
				$.mobile.changePage("addcomment.html", {
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
	
	// on add comment show
	$("#addCommentPage").live('pagecreate', function(){
		if( commentUser != null ){
			$("#commentTextarea").val(commentUser+": ");
		}else{
			$("#commentTextarea").val("");
		}
	});
	
	// submit comment
	$("#submitComment").live('vclick', function(){
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
			$.mobile.changePage("comments.html");
		});
	
		iLepra.post.addComment(commentText, commentId);
	});
})