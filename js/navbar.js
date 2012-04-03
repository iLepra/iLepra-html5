(function(){
    $(document).on(iLepra.config.defaultTapEvent, "#postsBar", function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        $.mobile.changePage("posts.html", {transition: 'none'});
    });

    $(document).on(iLepra.config.defaultTapEvent, "#mystuffBar", function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        $.mobile.changePage("mystuff.html", {transition: 'none'});
    });

    $(document).on(iLepra.config.defaultTapEvent, "#inboxBar", function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        $.mobile.changePage("inbox.html", {transition: 'none'});
    });

    $(document).on(iLepra.config.defaultTapEvent, "#moreBar", function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        $.mobile.changePage("more.html", {transition: 'none'});
    });
})();