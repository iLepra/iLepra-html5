(function(){
    $(document).on(iLepra.config.defaultTapEvent, "#postsBar", function(){
        $.mobile.showPageLoadingMsg();
        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);
            $.mobile.changePage("posts.html");
        });
        iLepra.getLastPosts();
    });
    
    $(document).on(iLepra.config.defaultTapEvent, "#mystuffBar", function(){
        $.mobile.showPageLoadingMsg();
        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);
            $.mobile.changePage("mystuff.html");
        });
        iLepra.getMyStuff();
    });
    
    $(document).on(iLepra.config.defaultTapEvent, "#inboxBar", function(){
        $.mobile.showPageLoadingMsg();
        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);
            $.mobile.changePage("inbox.html");
        });
        iLepra.getInbox();
    });
    
    $(document).on(iLepra.config.defaultTapEvent, "#moreBar", function(){
        $.mobile.changePage("more.html");
    });
    
    var updateNavText = function(){
        // render navbar
        var barText = "Мои вещи"
        if(iLepra.myNewPosts > 0 || iLepra.myNewComments > 0){
            barText += " ("+iLepra.myNewPosts+"/"+iLepra.myNewComments+")";
        }
        $("#mystuffBar").text(barText);
        
        var barText = "Инбокс"
        if(iLepra.inboxNewPosts > 0 || iLepra.inboxNewComments > 0){
            barText += " ("+iLepra.inboxNewPosts+"/"+iLepra.inboxNewComments+")";
        }
        $("#inboxBar").text(barText);
    }
})();