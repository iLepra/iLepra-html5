(function(){
    $(document).on('pagecreate', "#morePage", function(){
        updateNewsCounts();

        $("#favsButton").bind(iLepra.config.defaultTapEvent, function(){
            $.mobile.changePage("more_favs.html");
        });

        $("#myProfileButton").bind(iLepra.config.defaultTapEvent, function(){
            profileName = iLepra.username;
            $.mobile.changePage("more_profile.html");
        });

        $("#mySubsButton").bind(iLepra.config.defaultTapEvent, function(e){
            e.preventDefault();
            e.stopPropagation();

            iLepra.sub.list = iLepra.userSubLepras;
            iLepra.sub.fetch = false;
            $.mobile.changePage("more_subs.html");
        });

        $("#allSubsButton").bind(iLepra.config.defaultTapEvent, function(){
            iLepra.sub.fetch = true;
            $.mobile.changePage("more_subs.html");
        });

        $("#govButton").bind(iLepra.config.defaultTapEvent, function(){
            $.mobile.changePage("more_gov.html");
        });

        $("#chatButton").bind(iLepra.config.defaultTapEvent, function(){
            $.mobile.changePage("more_chat.html");
        });

        $("#settingsButton").bind(iLepra.config.defaultTapEvent, function(){
            $.mobile.changePage("more_settings.html");
        });
    });
})();