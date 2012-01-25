// jqm presets
var init = function(){
   $.ui.backButtonText="Назад";  
   //$.useViewport(320,480);
   $("#navbar").hide();
};
window.addEventListener("load",init,false);  
	
/* This code prevents users from dragging the page */
var preventDefaultScroll = function(event) {
    event.preventDefault();
    window.scroll(0,0);
    return false;
};
document.addEventListener('touchmove', preventDefaultScroll, false);

window.addEventListener('load', function(){    
    $.ui.showMask();

	// bind event listener for initialization
	$(document).bind(iLepra.events.init, function(event){
		$(document).unbind(iLepra.events.init);
		
		if(!iLepra.isAuthenticated){
			// navigate to login page
			$.ui.loadContent("loginPage");
			$.ui.clearHistory();
			
			// load captcha
	        $("#captchaImage").attr('src', iLepra.captchaURL);
		}else{
			// get posts
			getLatestPosts();
		}
	});
	
	// Init iLepra class
	iLepra.init();
});

// get latest posts function
var getLatestPosts = function(){
    // on posts data
    $(document).bind(iLepra.events.ready, function(event){
        $(document).unbind(iLepra.events.ready);
        
        $.ui.loadContent("postsPage");
        $.ui.clearHistory();
        $("#navbar").show();
    });
    
    // get posts
    iLepra.getLastPosts();
}


 // yarr click function
var tryLogin = function(){
    $.ui.showMask();

    // create auth data structure
    var data = {
        user: $("#username").val(),
        pass: $("#pass").val(),
        captcha: $("#captcha").val(),
        logincode: iLepra.loginCode,
        save: $("#rememberme")[0].checked ? 1 : 0
    };
    
    // on login error
    $(document).bind(iLepra.events.error, function(event){
        $(document).unbind(iLepra.events.error);
        // remove loader
        $.ui.hideMask();
        // display error message
        iLepra.ui.showError(iLepra.errorMessage);
        
        // refresh captcha
        $("#captchaImage").attr('src', iLepra.captchaURL);
    });
    
    // prepare ready event
    $(document).bind(iLepra.events.ready, function(event){
        $(document).unbind(iLepra.events.ready);
        $(document).unbind(iLepra.events.error);
        // get posts
        getLatestPosts();
    });
    
    // try logging in
    iLepra.tryLogin(data);
};