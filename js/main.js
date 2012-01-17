$(function(){
    $.mobile.page.prototype.options.backBtnText = "Назад";

	// show loader
	$.mobile.showPageLoadingMsg();

	// bind event listener for initialization
	$(document).bind(iLepra.events.init, function(event){
		// unbind
		$(document).unbind(event);
		
		if(!iLepra.isAuthenticated){
			// navigate to login page
			$.mobile.changePage("pages/login.html");
		}else{
			// get posts
			getLatestPosts(true);
		}
	});
	
	$("#loginPage").live("pagecreate", function(){
		// load captcha
		$("#captchaImage").attr('src', iLepra.captchaURL);
	});
	
	$("#loginButton").live('vclick', function(){
		$.mobile.showPageLoadingMsg();
	
		// create auth data structure
		var data = {
			user: $("#username").val(),
			pass: $("#pass").val(),
			captcha: $("#captcha").val(),
			logincode: iLepra.loginCode,
			save: $("#rememberme").is(":checked") ? 1 : 0
		};
		
		// on login error
		$(document).bind(iLepra.events.error, function(event){
			// unbind
			$(document).unbind(event);
			
			// remove loader
			$.mobile.hidePageLoadingMsg();
			
			// display error message
			iLepra.ui.showError(iLepra.errorMessage);
			
			// refresh captcha
			$("#captchaImage").attr('src', iLepra.captchaURL);
		});
		
		// prepare ready event
		$(document).bind(iLepra.events.ready, function(event){
			// unbind current event
			$(document).unbind(event);
			// unbind error event
			$(document).unbind(iLepra.events.error);
			
			// get posts
			getLatestPosts();
		});
		
		// try logging in
		iLepra.tryLogin(data);
	});
	
	var getLatestPosts = function(fromIndex){
		if( typeof fromIndex == 'undefined' ) fromIndex = false;
		// on posts data
		$(document).bind(iLepra.events.ready, function(event){
			// unbind
			$(document).unbind(event);
			
			var add = fromIndex ? "pages/" : "";
			$.mobile.changePage(add+"posts.html");
		});
		
		// get posts
		iLepra.getLastPosts();
	}
	
	// Init iLepra class
	iLepra.init();
});