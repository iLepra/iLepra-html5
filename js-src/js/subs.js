$(window).load(function(){
    var subName = null,
        subUrl = null,
        postLimit = iLepra.config.postIncrement,
        loading = false,

        // dom
        subsList = null,
        subpostsList = null,
        moreSubpostsBtn = null;

    var rendreNew = function(){
        // render posts
        var p = "";
        for(var i = 0; i < iLepra.sub.list.length; i++)
            p += _.template(subsTemplate, iLepra.sub.list[i]);

        subsList.append(p);
        try{
            subsList.listview('refresh');
        }catch(e){}
    }

    // render page on creation
    $(document).on('pageshow', "#subsPage", function(){
        if(loading) $.mobile.showPageLoadingMsg();
    })
    $(document).on('pagebeforeshow', "#subsPage", function(){
        subsList = $("#subsList");

        if( iLepra.sub.fetch ){
            loading = true;

            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);

                // hide loading msg
                $.mobile.hidePageLoadingMsg();
                loading = false;

                rendreNew();
            });
            iLepra.sub.getList();
        }else{
            rendreNew();
        }
    });

    // sub click
    $(document).on(iLepra.config.defaultTapEvent, "a.subListItem", function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

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

        subpostsList.empty();
        subpostsList.append(p);
        try{
            subpostsList.listview('refresh');
        }catch(e){}
    }

    $(document).on('pagebeforeshow', "#subpostsPage", function(){
        if(loading) $.mobile.showPageLoadingMsg();
    });
    $(document).on('pagebeforeshow', "#subpostsPage", function(){
        subpostsList = $("#subpostsList");
        moreSubpostsBtn = $("#moreSubpostsButton");

        loading = true;

        // on posts data
        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);

            // hide loading msg
            $.mobile.hidePageLoadingMsg();
            loading = false;

            moreSubpostsBtn.show();

            renderNewPosts();
        });

        // get posts
        iLepra.sub.getPosts(subUrl);

        // title
        $("#subpostsTitle").text(subName);

        // more btn
        moreSubpostsBtn.bind(iLepra.config.defaultTapEvent, function(e){
            // stops event to prevent random post opening
            e.preventDefault();
            e.stopPropagation();

            if( postLimit < iLepra.sub.posts.length){
                postLimit += postLimit;

                // clean old data
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
                    renderNewPosts();
                });

                // get posts
                iLepra.sub.getMorePosts(subUrl);
            }
        });
    });
});