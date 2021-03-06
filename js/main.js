// fired up when phonegap is ready - this requires a phonegap.js file :|
//document.addEventListener("deviceready", function(){
//$(document).ready(function(){
window.addEventListener('load', function(){
    // jquery mobile stuff
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    $.mobile.pushStateEnabled = false;
    $.mobile.loadingMessageTextVisible = true;
    $.mobile.loadingMessage = "Загружаемся ...";
    $.mobile.page.prototype.options.backBtnText = "Назад";
    $.mobile.fixedtoolbar.prototype.options.tapToggle = false;
    //$.mobile.defaultPageTransition = 'none';
    //$.mobile.defaultDialogTransition = 'none';
    $(document).on(iLepra.config.defaultTapEvent, "a", function(e){
        var link = $(this).attr('href');
        if(link.indexOf('http://') != -1){
            e.preventDefault();
            e.stopImmediatePropagation();
            window.open(link);
        }
    });

    ////////
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

    // bind event listener for initialization
    $(document).bind(iLepra.events.init, function(event){
        $(document).unbind(event);

        if(!iLepra.isAuthenticated){
            // navigate to login page
            $.mobile.changePage("pages/login.html");
        }else{
            // get posts
            getLatestPosts(true);
        }
    });

    $(document).on("pagecreate", "#loginPage", function(){
        if( iLepra.isAuthenticated ){
            $.mobile.changePage("pages/posts.html");
            return;
        }

        // load captcha
        $("#captchaImage").attr('src', iLepra.captchaURL);

        // bind yarr click
        $("#loginButton").bind(iLepra.config.defaultTapEvent, function(){
            $.mobile.showPageLoadingMsg();

            // create auth data structure
            var data = {
                user: $("#username").val(),
                pass: $("#pass").val(),
                captcha: $("#captcha").val().toLowerCase(),
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
    });

    $(document).on('pageshow', '#splashPage', function(){
        if( iLepra.isAuthenticated ){
            $.mobile.changePage("pages/posts.html");
        }
    });

    // Init iLepra class
    iLepra.init();
});