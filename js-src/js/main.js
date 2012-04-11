// fired up when phonegap is ready - this requires a phonegap.js file :|
document.addEventListener("deviceready", function(){
//$(document).ready(function(){
//window.addEventListener('load', function(){
    // jquery mobile stuff
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    $.mobile.pushStateEnabled = false;
    $.mobile.loadingMessageTextVisible = true;
    $.mobile.loadingMessage = "Загружаемся ...";
    $.mobile.page.prototype.options.backBtnText = "Назад";
    $.mobile.fixedtoolbar.prototype.options.tapToggle = false;

    var transition = '';
    if( window.isOldAndroid() ){
        $.mobile.defaultPageTransition = 'none';
        $.mobile.defaultDialogTransition = 'none';
        transition = 'none';
    }else{
        $.mobile.defaultPageTransition = 'slide';
        //$.mobile.defaultDialogTransition = 'none';
        transition = 'fade';
    }

    $(document).on(iLepra.config.defaultTapEvent, "a", function(e){
        var link = $(this).data('url');
        if(link.indexOf('http://') != -1){
            e.preventDefault();
            e.stopImmediatePropagation();
            window.open(link);
            return;
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
            $.mobile.changePage(add+"posts.html", {transition: transition});
        });

        // get posts
        iLepra.getLastPosts();
    }

    // bind event listener for initialization
    $(document).bind(iLepra.events.init, function(event){
        $(document).unbind(event);

        if(!iLepra.isAuthenticated){
            // navigate to login page
            $.mobile.changePage("pages/login.html", {transition: transition});
        }else{
            // get posts
            getLatestPosts(true);
        }
    });

    $(document).on("pagecreate", "#loginPage", function(){
        if( iLepra.isAuthenticated ){
            $.mobile.changePage("pages/posts.html", {transition: transition});
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

    $(document).on('pagebeforeshow', '#splashPage', function(){
        if( iLepra.isAuthenticated ){
            $.mobile.changePage("pages/posts.html", {transition: transition});
        }
    });

    var tryInit = function(){
        if( !window.isOnline() ){
            navigator.notification.alert(
                'Для работы требуется подключение к интернету! Подключитесь и нажмите OK.',  // message
                tryInit,         // callback
                'Внимание!',            // title
                'ОК'                  // buttonName
            );
        }else{
            // Init iLepra class
            iLepra.init();
        }
    };

    tryInit();
});