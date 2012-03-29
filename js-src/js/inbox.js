(function(){
    var postLimit = iLepra.config.postIncrement,
        inboxList = null,
        moreInboxBtn = null;

    var renderNewPosts = function(){
        // render posts
        var limit = postLimit > iLepra.inboxPosts.length ? iLepra.inboxPosts.length : postLimit;
        var p = "";
        for(var i = 0; i < limit; i++)
            p += _.template(postTemplate, iLepra.inboxPosts[i]);

        inboxList.empty();
        inboxList.append(p);
        try{
            inboxList.listview('refresh');
        }catch(e){}
    }

    // render page on creation
    $(document).on('pageshow', "#inboxPage", function(){
        inboxList = $("#inboxList");
        moreInboxBtn = $("#moreInboxButton");

        $.mobile.showPageLoadingMsg();

        $(document).bind(iLepra.events.ready, function(event){
            $(document).unbind(event);

            // hide loading msg
            $.mobile.hidePageLoadingMsg();

            renderNewPosts();

            // hide button if needed
            if( postLimit < iLepra.inboxPosts.length ){
                moreInboxBtn.show();
                // more posts click
                moreInboxBtn.bind(iLepra.config.defaultTapEvent, function(event){
                    // stops event to prevent random post opening
                    event.preventDefault();
                    event.stopPropagation();

                    postLimit += postLimit;
                    if( postLimit >= iLepra.inboxPosts.length ){
                        moreInboxBtn.hide();
                    }

                    // clean old data
                    renderNewPosts();
                });
            }
        });
        iLepra.getInbox();

        updateNewsCounts();
    });
})();