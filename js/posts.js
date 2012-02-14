(function(){
    var postIncrement = 10;
    var postLimit = 10;

    var renderNewPosts = function(){
        // render posts
        var limit = postLimit > iLepra.latestPosts.length ? iLepra.latestPosts.length : postLimit;
        var p = "";
        for(var i = 0; i < limit; i++)
            p += _.template(postTemplate, iLepra.latestPosts[i]);
        $("#postsList").append(p);
    }

    ////// LAYOUT STUFF
    var prepareLayoutReadyEvent = function(){
        // show loader
        $.mobile.showPageLoadingMsg();

        $("#layoutButtons a").each(function(){ $(this).removeClass('ui-btn-active'); });

        // on posts data
        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);
            $.mobile.hidePageLoadingMsg();

            // clean old data & render
            $("#postsList").empty();
            renderNewPosts();
            $("#postsList").listview('refresh');
        });
    }

    // render page on creation
    $(document).on('pagecreate', "#postsPage", function(){
        renderNewPosts();

        // refresh
        $("#refreshPostsButton").bind(iLepra.config.defaultTapEvent, function(){
            // show loader
            $.mobile.showPageLoadingMsg();

            // on posts data
            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);
                $.mobile.hidePageLoadingMsg();

                // clean old data & render
                $("#postsList").empty();
                renderNewPosts();
                $("#postsList").listview('refresh');
            });

            // get posts
            iLepra.getLastPosts();
        });

        // more posts
        $("#morePostsButton").bind(iLepra.config.defaultTapEvent, function(event){
            // stops event to prevent random post opening
            event.preventDefault();
            event.stopPropagation();

            if( postLimit < iLepra.latestPosts.length){
                postLimit += postIncrement;

                // clean old data
                $("#postsList").empty();
                renderNewPosts();
                $("#postsList").listview('refresh');
            }else{ // load new data
                // show loader
                $.mobile.showPageLoadingMsg();

                // on posts data
                $(document).bind(iLepra.events.ready, function(event){
                    $(document).unbind(event);

                    // remove loader
                    $.mobile.hidePageLoadingMsg();

                    // clean old data
                    $("#postsList").empty();
                    renderNewPosts();
                    $("#postsList").listview('refresh');
                });

                // get posts
                iLepra.getMorePosts();
            }
        });

        $("#layoutSelect").change(function(e){
             var val = $("#layoutSelect option:selected").val();
             switch(val){
                case "main":
                    prepareLayoutReadyEvent();
                    iLepra.switchLayout(1);
                    break;
                case "all":
                    prepareLayoutReadyEvent();
                    iLepra.switchLayout(0);
                    break;
                case "sub":
                    prepareLayoutReadyEvent();
                    iLepra.switchLayout(2);
                    break;
             }
        });
    });

    // show full post
    $(document).on(iLepra.config.defaultTapEvent, "a.postListItem", function(){
        currentPostId = $(this).data('id');

        // get selected post
        if( $.mobile.activePage.attr('id') == "postsPage" ){
            for(var i in iLepra.latestPosts){
                if(iLepra.latestPosts[i].id == currentPostId){
                    iLepra.post.current = iLepra.latestPosts[i];
                    break;
                }
            }
        }else if( $.mobile.activePage.attr('id') == "mystuffPage" ){
            for(var i in iLepra.myStuffPosts){
                if(iLepra.myStuffPosts[i].id == currentPostId){
                    iLepra.post.current = iLepra.myStuffPosts[i];
                    break;
                }
            }
        }else if( $.mobile.activePage.attr('id') == "inboxPage" ){
            for(var i in iLepra.inboxPosts){
                if(iLepra.inboxPosts[i].id == currentPostId){
                    iLepra.post.current = iLepra.inboxPosts[i];
                    break;
                }
            }
        }else if( $.mobile.activePage.attr('id') == "favsPage" ){
            for(var i in iLepra.favouritePosts){
                if(iLepra.favouritePosts[i].id == currentPostId){
                    iLepra.post.current = iLepra.favouritePosts[i];
                    break;
                }
            }
        }else if( $.mobile.activePage.attr('id') == "subpostsPage"){
            for(var i in iLepra.sub.posts){
                if(iLepra.sub.posts[i].id == currentPostId){
                    iLepra.post.current = iLepra.sub.posts[i];
                    break;
                }
            }
        }

        $.mobile.changePage("post_full.html");
    });

    // render full post text
    $(document).on('pagecreate', "#fullPostPage", function(){
        // render html
        $("#postContent").html(iLepra.post.current.body);

        // render title
        $("#postTitle").text( iLepra.post.current.body.replace(/(<([^>]+)>)/ig,"").substr(0, 64) );

        // render additional info
        $("#postUser").text(iLepra.post.current.user);
        $("#postComments").text(iLepra.post.current.comments);
        $("#postTime").text(iLepra.post.current.when);
        $("#postRating").text(iLepra.post.current.rating);
    });


})();