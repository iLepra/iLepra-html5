(function(){
    $(document).on(iLepra.config.defaultTapEvent, "#postsBar", function(){
        $.mobile.changePage("posts.html", {transition: 'none'});
    });

    $(document).on(iLepra.config.defaultTapEvent, "#mystuffBar", function(){
        $.mobile.changePage("mystuff.html", {transition: 'none'});
    });

    $(document).on(iLepra.config.defaultTapEvent, "#inboxBar", function(){
        $.mobile.changePage("inbox.html", {transition: 'none'});
    });

    $(document).on(iLepra.config.defaultTapEvent, "#moreBar", function(){
        $.mobile.changePage("more.html", {transition: 'none'});
    });
})();