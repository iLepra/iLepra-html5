(function(){
    $(document).on('pagecreate', "#morePage", function(){
        updateNewsCounts();

        $("#favsButton").bind(iLepra.config.defaultTapEvent, function(){
            $.mobile.showPageLoadingMsg();
            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);
                $.mobile.changePage("more_favs.html");
            });
            iLepra.getFavourites();
        });

        $("#myProfileButton").bind(iLepra.config.defaultTapEvent, function(){
            //$.mobile.showPageLoadingMsg();
            //$(document).bind(iLepra.events.ready, function(event){
            //    $(document).unbind(event);
            //    $.mobile.changePage("more_profile.html");
            //});
            //iLepra.profile.getProfile(iLepra.username);
            profileName = iLepra.username;
            $.mobile.changePage("more_profile.html");
        });

        $("#mySubsButton").bind(iLepra.config.defaultTapEvent, function(){
            iLepra.sub.list = iLepra.userSubLepras;
            $.mobile.changePage("more_subs.html");
        });

        $("#allSubsButton").bind(iLepra.config.defaultTapEvent, function(){
            $.mobile.showPageLoadingMsg();
            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);
                $.mobile.changePage("more_subs.html");
            });
            iLepra.sub.getList();
        });

        $("#govButton").bind(iLepra.config.defaultTapEvent, function(){
            $.mobile.showPageLoadingMsg();
            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);
                $.mobile.changePage("more_gov.html");
            });
            iLepra.gov.getCurrent();
        });

        $("#chatButton").bind(iLepra.config.defaultTapEvent, function(){
            $.mobile.showPageLoadingMsg();
            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);
                $.mobile.changePage("more_chat.html");
            });
            iLepra.chat.getMessages();
        });

        $("#settingsButton").bind(iLepra.config.defaultTapEvent, function(){
            $.mobile.changePage("more_settings.html");
        });
    });
})();