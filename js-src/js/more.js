(function(){
    var menu = null;
    var menuStatus = false;

    var clearActiveMenu = function(){
        //hideMenu();
        $('li.active').each(function(){
            $(this).removeClass('active');
        })
    };
    window.clearActiveMenu = clearActiveMenu;

    var resetState = function(event, item){
        event.preventDefault();
        event.stopImmediatePropagation();

        clearActiveMenu();
        $(item).parent().addClass('active');
    };

    var hideMenu = function(){
        menuStatus = false;
        menu.hide();
    };
    var showMenu = function(){
        menuStatus = true;
    };

    var animateToPage = function(url){
        if(window.isOldAndroid()){
            $(".ui-page-active").css('marginLeft', '0px');
            hideMenu();
            $.mobile.changePage(url, {transition: 'none'});
        }else{
            $(".ui-page-active").transition({marginLeft: "0px"}, 150, function(){
                hideMenu();
                $.mobile.changePage(url, {transition: 'none'});
            });
        }
    }

    //
    $(document).on('pagecreate', "#splashPage", function(){
        menu = $("#menu");

        // Show menu
        $(document).on(iLepra.config.defaultTapEvent, "a.showMenu", function(){
            if(menuStatus != true){
                menu.show();
                menu.css('top', $(window).scrollTop() +'px');
                if(window.isOldAndroid()){
                    $(".ui-page-active").css('marginLeft', '165px');
                    showMenu();
                }else{
                    $(".ui-page-active").transition({marginLeft: "165px"}, 300, showMenu);
                }
                return false;
            } else {
                if(window.isOldAndroid()){
                    $(".ui-page-active").css('marginLeft', '0px');
                    hideMenu();
                }else{
                    $(".ui-page-active").transition({marginLeft: "0px"}, 300, hideMenu);
                }
                return false;
            }
        });

        // buttons
        $("#postsButton").bind(iLepra.config.defaultTapEvent, function(e){
            resetState(e, this);


            animateToPage("posts.html");
        });

        $("#mystuffButton").bind(iLepra.config.defaultTapEvent, function(e){
            resetState(e, this);

            animateToPage("mystuff.html");
        });

        $("#inboxButton").bind(iLepra.config.defaultTapEvent, function(e){
            resetState(e, this);

            animateToPage("inbox.html");
        });

        $("#favsButton").bind(iLepra.config.defaultTapEvent, function(e){
            resetState(e, this);

            animateToPage("more_favs.html");
        });

        $("#myProfileButton").bind(iLepra.config.defaultTapEvent, function(e){
            resetState(e, this);

            profileName = iLepra.username;
            animateToPage("more_profile.html");
        });

        $("#mySubsButton").bind(iLepra.config.defaultTapEvent, function(e){
            resetState(e, this);

            iLepra.sub.list = iLepra.userSubLepras;
            iLepra.sub.fetch = false;
            animateToPage("more_subs.html");
        });

        $("#allSubsButton").bind(iLepra.config.defaultTapEvent, function(e){
            resetState(e, this);

            iLepra.sub.fetch = true;
            animateToPage("more_subs.html");
        });

        $("#govButton").bind(iLepra.config.defaultTapEvent, function(e){
            resetState(e, this);

            animateToPage("more_gov.html");
        });

        $("#chatButton").bind(iLepra.config.defaultTapEvent, function(e){
            resetState(e, this);

            animateToPage("more_chat.html");
        });

        $("#settingsButton").bind(iLepra.config.defaultTapEvent, function(e){
            resetState(e, this);

            animateToPage("more_settings.html");
        });

        $("#logoutButton").bind(iLepra.config.defaultTapEvent, function(e){
            resetState(e, this);

            $(".ui-page-active").animate({marginLeft: "0px"}, 300, hideMenu);
            $.mobile.showPageLoadingMsg();
            $(document).bind(iLepra.events.ready, function(){
               $.mobile.changePage("login.html");
            });
            iLepra.doLogout();
        })
    });
})();