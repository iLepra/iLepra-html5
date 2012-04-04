(function(){
    // comments loading indicator
    var commentsLoading = false,
        autorender = false, // autorender comments
        commentsLimit = iLepra.config.postIncrement, // pagination & display stuff
        type = "all", // all || new
        // current comment
        commentId = null,
        commentUser = null,
        // new comment pos
        newPos = -1,

        // dom
        commentsList = null,
        commentsNav = null,
        commentsNavBtns = null,
        commentsInputBar = null,
        commentsInput = null;

    var renderNewComments = function(){
        // render posts
        var p = "";

        if( type == "all" ){
            var limit = commentsLimit > iLepra.post.comments.length ? iLepra.post.comments.length : commentsLimit;
            for(var i = 0; i < limit; i++){
                p += _.template(commentTemplate, iLepra.post.comments[i]);
            }
        }else if( type == "new" ){
            var limit = commentsLimit > iLepra.post.newComments.length ? iLepra.post.newComments.length : commentsLimit;
            for(var i = 0; i < limit; i++){
                p += _.template(commentTemplate, iLepra.post.newComments[i]);
            }
        }
        commentsList.empty();
        commentsList.append(p);
        try{
            commentsList.listview('refresh');
        }catch(e){}

        if( $(".new").length > 0 ){
            commentsNav.show();
        }else{
            commentsNav.hide();
        }
    }

    var prepareCommentsButtons = function(){
        // more posts click
        $("#moreCommentsButton").bind(iLepra.config.defaultTapEvent, function(e){
            // stops event to prevent random post opening
            e.preventDefault();
            e.stopPropagation();

            commentsLimit += commentsLimit;
            if( commentsLimit >= iLepra.post.comments.length ){
                $("#commentsButtons").hide();
            }

            // clean old data
            commentsList.empty();
            renderNewComments();
            commentsList.listview('refresh');
        });
        $("#allCommentsButton").bind(iLepra.config.defaultTapEvent, function(e){
            // stops event to prevent random post opening
            e.preventDefault();
            e.stopPropagation();

            commentsLimit = iLepra.post.comments.length;
            $("#commentsButtons").hide();

            // clean old data
            renderNewComments();
        });
    }

    // on post comments show
    $(document).on('pagecreate', "#fullPostPage", function(){
        commentsLimit = iLepra.config.postIncrement;

        commentsList = $("#commentsList");
        commentsNav = $("#commentsNavBar");
        commentsNavBtns = $("#commentsNavButtons");
        commentsInputBar = $("#commentsInputBar");
        commentsInput = $("#commentInput");

        // on comments request
        $("#postCommentsButton").bind(iLepra.config.defaultTapEvent, function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            if(commentsLoading) return;

            // show loader
            $.mobile.showPageLoadingMsg();
            commentsLoading = true;

            // on posts data
            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);
                //$.mobile.changePage("post_comments.html");
                $.mobile.hidePageLoadingMsg();
                $("#postCommentsButton").hide();
                $("#postCommentsContent").show();
                $("#replyPost").show();

                // render comments
                renderNewComments();

                // hide button if needed
                if( commentsLimit >= iLepra.post.comments.length ){
                    $("#commentsButtons").hide();
                }else{
                    prepareCommentsButtons();
                }

                commentsLoading = false;
            });

            iLepra.post.getComments();
        });

        $("#allComments").bind(iLepra.config.defaultTapEvent, function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            $(this).addClass("ui-btn-active");
            $("#newComments").removeClass("ui-btn-active");
            type = "all";

            // redraw
            renderNewComments();
        });

        $("#newComments").bind(iLepra.config.defaultTapEvent, function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            $(this).addClass("ui-btn-active");
            $("#allComments").removeClass("ui-btn-active");
            type = "new";

            // redraw
            renderNewComments();
        });

        $("#replyPost").bind(iLepra.config.defaultTapEvent, function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            autorender = true;

            commentId = null;
            commentUser = null;

            showCommentAdd();
        });

        $("#prevnew").bind(iLepra.config.defaultTapEvent, function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            if(--newPos) newPos = 0;
            var com = $($("ul#commentsList li.new")[newPos]);
            if( com != null) $.mobile.silentScroll(com.offset().top);
        });

        $("#nextnew").bind(iLepra.config.defaultTapEvent, function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            var newComs = $("ul#commentsList li.new");
            if( ++newPos > (newComs.length-1) ) newPos = newComs.length-1;
            var com = $(newComs[newPos]);
            if( com != null) $.mobile.silentScroll(com.offset().top);
        });

        $("#postVoteup").bind(iLepra.config.defaultTapEvent, function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            $(this).css('opacity', 1);
            $(this).next().css('opacity', 0.3);
            iLepra.post.votePost("p"+iLepra.post.current.id, "1");
        });
        $("#postVotedown").bind(iLepra.config.defaultTapEvent, function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            $(this).prev().css('opacity', 0.3);
            $(this).css('opacity', 1);
            iLepra.post.votePost("p"+iLepra.post.current.id, "-1");
        });

        // submit comment
        $("#submitComment").bind(iLepra.config.defaultTapEvent, function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            var commentText = commentsInput.val();

            // show loader
            $.mobile.showPageLoadingMsg();

            // on comment error
            $(document).bind(iLepra.events.error, function(event){
                // unbind
                $(document).unbind(event);
                $(document).unbind(iLepra.events.ready);
                // hide
                $.mobile.hidePageLoadingMsg();
                // show error
                iLepra.ui.showError("Ошибка добавлени комментария! Попробуйте еще раз?");
            });

            // on successful comment
            $(document).bind(iLepra.events.ready, function(event){
                // unbind
                $(document).unbind(event);
                $(document).unbind(iLepra.events.error);
                // remove loader
                $.mobile.hidePageLoadingMsg();
                // clear up
                commentsInput.val('');
                commentsNavBtns.show();
                commentsInputBar.hide();
                // redraw comments
                renderNewComments();
            });

            iLepra.post.addComment(commentText, commentId);
        });

        if(iLepra.post.current.vote == 1){
            $("#postVoteup").css("opacity", 1);
        }else if(iLepra.post.current.vote == -1){
            $("#postVotedown").css("opacity", 1);
        }

        if(autorender){
            $("#postCommentsButton").hide();
            $("#postCommentsContent").show();

            // render comments
            renderNewComments();

            // hide button if needed
            if( commentsLimit >= iLepra.post.comments.length ){
                $("#commentsButtons").hide();
            }else{
                prepareCommentsButtons();
            }

            autorender = false;
        }
    });

    // on comment option pick
    $(document).on(iLepra.config.defaultTapEvent, "div.commentsMenu a.reply", function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        autorender = true;
        showCommentAdd();
    });
    $(document).on(iLepra.config.defaultTapEvent, "div.commentsMenu a.voteup", function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        $(this).css('opacity', 1);
        $(this).next().css('opacity', 0.3);
        iLepra.post.voteComment(commentId, "1");
    });
    $(document).on(iLepra.config.defaultTapEvent, "div.commentsMenu a.votedown", function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        $(this).prev().css('opacity', 0.3);
        $(this).css('opacity', 1);
        iLepra.post.voteComment(commentId, "-1");
    });

    // show comment menu
    $(document).on(iLepra.config.defaultTapEvent, "#commentsList li", function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        commentId = $(this).data('id');
        commentUser = $(this).data('user');

        $(".commentsMenu").hide();
        var menu = $("div.commentsMenu", this);
        menu.show();

        var votes = $(menu.find('a')[1]);
        if( iLepra.post.current.type == "inbox" && votes.is(':visible') ){
            votes.hide().next().hide();
        }else if( !votes.is(':visible') ){
            votes.show().next().show();
        }
    });



    // on add comment show
    var showCommentAdd = function(){
        commentsNav.show();
        commentsNavBtns.hide();
        commentsInputBar.show();

        if( commentUser != null ){
            commentsInput.val(commentUser+": ");
        }else{
            commentsInput.val("");
        }
    }
})();