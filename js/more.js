(function(){
    $("#morePage").live('pagecreate', function(){
        $("#favsButton").bind('vclick', function(){
            $.mobile.showPageLoadingMsg();
            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);
                $.mobile.changePage("more_favs.html");
            });
            iLepra.getFavourites();
        });
        
        $("#myProfileButton").bind('vclick', function(){
            $.mobile.showPageLoadingMsg();
            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);
                $.mobile.changePage("more_profile.html");
            });
            iLepra.profile.getProfile(iLepra.username);
        });
        
        $("#mySubsButton").bind('vclick', function(){
            iLepra.sub.list = iLepra.userSubLepras;
            $.mobile.changePage("more_subs.html");
        });
        
        $("#allSubsButton").bind('vclick', function(){
            $.mobile.showPageLoadingMsg();
            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);
                $.mobile.changePage("more_subs.html");
            });
            iLepra.sub.getList();
        });
        
        $("#govButton").bind('vclick', function(){
            $.mobile.showPageLoadingMsg();
            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);
                $.mobile.changePage("more_gov.html");
            });
            iLepra.gov.getCurrent();
        });
        
        $("#chatButton").bind('vclick', function(){
            $.mobile.showPageLoadingMsg();
            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);
                $.mobile.changePage("more_chat.html");
            });
            iLepra.chat.getMessages();
        });
        
        $("#settingsButton").bind('vclick', function(){
            $.mobile.changePage("more_settings.html");
        });
	});
})();