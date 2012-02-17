(function(){
    // autorender comments
    var autorender = false;
    // pagination & display stuff
    var commentsLimit = iLepra.config.postIncrement;
    var type = "all"; // all || new
    // current comment
    var commentId = null;
    var commentUser = null;
    // new comment pos
    var newPos = -1;

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
        $("#commentsList").append(p);
    }

    // on post comments show
    $(document).on('pagecreate', "#fullPostPage", function(){
        // on comments request
        $("#postCommentsButton").bind(iLepra.config.defaultTapEvent, function(){
            // show loader
            $.mobile.showPageLoadingMsg();

            // on posts data
            $(document).bind(iLepra.events.ready, function(event){
                $(document).unbind(event);
                //$.mobile.changePage("post_comments.html");
                $.mobile.hidePageLoadingMsg();
                $("#postCommentsButton").hide();
                $("#postCommentsContent").show();

                // render comments
                renderNewComments();
                $("#commentsList").listview('refresh');

                // hide button if needed
                if( commentsLimit >= iLepra.post.comments.length ){
                    $("#moreCommentsButton").hide();
                }else{
                    // more posts click
                    $("#moreCommentsButton").bind(iLepra.config.defaultTapEvent, function(event){
                        // stops event to prevent random post opening
                        event.preventDefault();
                        event.stopPropagation();

                        commentsLimit += commentsLimit;
                        if( commentsLimit >= iLepra.post.comments.length ){
                            $("#moreCommentsButton").hide();
                        }

                        // clean old data
                        $("#commentsList").empty();
                        renderNewComments();
                        $("#commentsList").listview('refresh');
                    });
                }
            });

            iLepra.post.getComments();
        });

        $("#allComments").bind(iLepra.config.defaultTapEvent, function(){
            $(this).addClass("ui-btn-active");
            $("#newComments").removeClass("ui-btn-active");
            type = "all";

            // redraw
            $("#commentsList").empty();
            renderNewComments();
            $("#commentsList").listview('refresh');
        });

        $("#newComments").bind(iLepra.config.defaultTapEvent, function(){
            $(this).addClass("ui-btn-active");
            $("#allComments").removeClass("ui-btn-active");
            type = "new";

            // redraw
            $("#commentsList").empty();
            renderNewComments();
            $("#commentsList").listview('refresh');
        });

        $("#addCommentButton").bind(iLepra.config.defaultTapEvent, function(){
            commentId = null;
            commentUser = null;

            $.mobile.changePage("post_addcomment.html", {
                role: "dialog",
                transition: "slidedown",
                inline: "true"
            });
        });

        $("#prevnew").bind(iLepra.config.defaultTapEvent, function(){
            if(--newPos) newPos = 0;
            var com = $($("ul#commentsList li.new")[newPos]);
            if( com != null) $.mobile.silentScroll(com.offset().top);
        });

        $("#nextnew").bind(iLepra.config.defaultTapEvent, function(){
            var newComs = $("ul#commentsList li.new");
            if( ++newPos > (newComs.length-1) ) newPos = newComs.length-1;
            var com = $(newComs[newPos]);
            if( com != null) $.mobile.silentScroll(com.offset().top);
        });

        if(autorender){
            $("#postCommentsButton").hide();
            $("#postCommentsContent").show();

            // render comments
            renderNewComments();

            // hide button if needed
            if( commentsLimit >= iLepra.post.comments.length ){
                $("#moreCommentsButton").hide();
            }else{
                // more posts click
                $("#moreCommentsButton").bind(iLepra.config.defaultTapEvent, function(event){
                    // stops event to prevent random post opening
                    event.preventDefault();
                    event.stopPropagation();

                    commentsLimit += commentsLimit;
                    if( commentsLimit >= iLepra.post.comments.length ){
                        $("#moreCommentsButton").hide();
                    }

                    // clean old data
                    $("#commentsList").empty();
                    renderNewComments();
                    $("#commentsList").listview('refresh');
                });
            }

            autorender = false;
        }
    });

    // on comment option pick
    $(document).on(iLepra.config.defaultTapEvent, "div.commentsMenu a.reply", function(event) {
        autorender = true;
        $.mobile.changePage("post_addcomment.html", {
            role: "dialog",
            transition: "slidedown",
            inline: "true"
        });
    });
    $(document).on(iLepra.config.defaultTapEvent, "div.commentsMenu a.voteup", function(event) {
        $(this).css('opacity', 1);
        $(this).next().css('opacity', 0.3);
        iLepra.post.voteComment(commentId, "1");
    });
    $(document).on(iLepra.config.defaultTapEvent, "div.commentsMenu a.votedown", function(event) {
        $(this).prev().css('opacity', 0.3);
        $(this).css('opacity', 1);
        iLepra.post.voteComment(commentId, "-1");
    });

    // show comment menu
    $(document).on(iLepra.config.defaultTapEvent, "#commentsList li", function(e){
        e.preventDefault();

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
    $(document).on('pagecreate', "#addCommentPage", function(){
        // submit comment
        $("#submitComment").bind(iLepra.config.defaultTapEvent, function(){
            var commentText = $("#commentTextarea").val();

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
                // change page
                $.mobile.changePage("post_full.html");
            });

            iLepra.post.addComment(commentText, commentId);
        });

        if( commentUser != null ){
            $("#commentTextarea").val(commentUser+": ");
        }else{
            $("#commentTextarea").val("");
        }
    });
})();