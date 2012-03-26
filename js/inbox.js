(function(){
    var postLimit = iLepra.config.postIncrement;

    var renderNewPosts = function(){
        // render posts
        var limit = postLimit > iLepra.inboxPosts.length ? iLepra.inboxPosts.length : postLimit;
        var p = "";
        for(var i = 0; i < limit; i++)
            p += _.template(postTemplate, iLepra.inboxPosts[i]);
        $("#inboxList").append(p);
    }

    // render page on creation
    $(document).on('pageshow', "#inboxPage", function(){
        $.mobile.showPageLoadingMsg()

        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);

            // hide loading msg
            $.mobile.hidePageLoadingMsg()

            renderNewPosts();
            try{
                $("#inboxList").listview('refresh');
            }catch(e){}

            // hide button if needed
            if( postLimit < iLepra.inboxPosts.length ){
                $("#moreInboxButton").show();
                // more posts click
                $("#moreInboxButton").bind(iLepra.config.defaultTapEvent, function(event){
                    // stops event to prevent random post opening
                    event.preventDefault();
                    event.stopPropagation();

                    postLimit += postLimit;
                    if( postLimit >= iLepra.inboxPosts.length ){
                        $("#moreInboxButton").hide();
                    }

                    // clean old data
                    $("#inboxList").empty();
                    renderNewPosts();
                    $("#inboxList").listview('refresh');
                });
            }
        });
        iLepra.getInbox();

        updateNewsCounts();
    });
})();