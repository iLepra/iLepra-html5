$(window).load(function(){
    var subName = null;
    var subUrl = null;
    var postLimit = iLepra.config.postIncrement;

    var rendreNew = function(){
        // render posts
        var p = "";
        for(var i = 0; i < iLepra.sub.list.length; i++)
            p += _.template(subsTemplate, iLepra.sub.list[i]);
        $("#subsList").append(p);
    }

    // render page on creation
    $(document).on('pageshow', "#subsPage", function(){
        if( iLepra.sub.fetch ){
            $.mobile.showPageLoadingMsg();

            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);

                // hide loading msg
                $.mobile.hidePageLoadingMsg();

                rendreNew();
                $("#subsList").listview('refresh');
            });
            iLepra.sub.getList();
        }else{
            rendreNew();
            $("#subsList").listview('refresh');
        }
    });

    // sub click
    $(document).on(iLepra.config.defaultTapEvent, "a.subListItem", function(){
        subName = $(this).children('h1').text();
        subUrl = $(this).data('link');

        $.mobile.changePage("more_subposts.html");
    });

    // render posts
    var renderNewPosts = function(){
        var limit = postLimit > iLepra.sub.posts.length ? iLepra.sub.posts.length : postLimit;
        var p = "";
        for(var i = 0; i < limit; i++)
            p += _.template(postTemplate, iLepra.sub.posts[i]);
        $("#subpostsList").append(p);
        $("#subpostsList").listview('refresh');
    }

    $(document).on('pageshow', "#subpostsPage", function(){
        $.mobile.showPageLoadingMsg();

        // on posts data
        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);

            // hide loading msg
            $.mobile.hidePageLoadingMsg();

            $("#moreSubpostsButton").show();

            renderNewPosts();
        });

        // get posts
        iLepra.sub.getPosts(subUrl);

        // title
        $("#subpostsTitle").text(subName);

        // more btn
        $("#moreSubpostsButton").bind(iLepra.config.defaultTapEvent, function(event){
            // stops event to prevent random post opening
            event.preventDefault();
            event.stopPropagation();

            if( postLimit < iLepra.sub.posts.length){
                postLimit += postLimit;

                // clean old data
                $("#subpostsList").empty();
                renderNewPosts();
            }else{ // load new data
                // show loader
                $.mobile.showPageLoadingMsg();

                // on posts data
                $(document).bind(iLepra.events.ready, function(event){
                    $(document).unbind(event);

                    // remove loader
                    $.mobile.hidePageLoadingMsg();

                    // clean old data
                    $("#subpostsList").empty();
                    renderNewPosts();
                });

                // get posts
                iLepra.sub.getMorePosts(subUrl);
            }
        });
    });
});