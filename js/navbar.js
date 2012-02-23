(function(){
    $(document).on(iLepra.config.defaultTapEvent, "#postsBar", function(){
        $.mobile.changePage("posts.html");
    });

    $(document).on(iLepra.config.defaultTapEvent, "#mystuffBar", function(){
        $.mobile.changePage("mystuff.html");
    });

    $(document).on(iLepra.config.defaultTapEvent, "#inboxBar", function(){
        $.mobile.changePage("inbox.html");
    });

    $(document).on(iLepra.config.defaultTapEvent, "#moreBar", function(){
        $.mobile.changePage("more.html");
    });
})();